// Backfill tool: extract per-page word boxes (words.json) for docs that were
// rendered BEFORE render-notes.mjs started emitting words.json.
//
// Text extraction ONLY — no image rendering, so it is far lighter than a
// render pass and safe in small batches on this VM. Idempotent: a doc is
// skipped when words.json exists AND the source SHA matches the manifest
// entry (same skip logic as the renderer's imagesExist check, minus the
// image requirement). On Vercel / GitHub Pages this tool never runs — the
// prebuild (render-notes.mjs) writes words.json for every doc it renders,
// and a fresh CI build renders everything.
//
//   node scripts/extract-words.mjs [--only <substring>] [--limit N] [--jobs N]
//   --limit N: extract at most N docs this run; re-run to resume.
//
// words.json shape: { v: 1, pages: [[[x, y, w, h, str], ...], ...] } — one
// array per page, boxes in % of page size (x/y = top-left). Items are pdf.js
// getTextContent line fragments (not single words); the viewer's text layer
// renders them as transparent selectable spans. Boxes are computed through
// the viewport transform (PDF pt -> image px), so they line up with the
// page-*.jpg rendered at the same scale. Kept in sync with the words block
// in render-notes.mjs — change both together.
import './polyfill.mjs';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'notes-source');
const OUT = path.join(ROOT, 'public', 'generated');
const SCALE = 1.5;

const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex');
const dirFor = (rel) => sha1(rel).slice(0, 12);
const pad = (n) => String(n).padStart(3, '0');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.toLowerCase().endsWith('.pdf')) out.push(p);
  }
  return out;
}

// Same box math as render-notes.mjs — PDF-space item transform through the
// viewport transform to image pixels, then to % of the page.
function wordsForPage(page, vp) {
  const m = vp.transform;
  const out = [];
  return page.getTextContent().then((tc) => {
    for (const it of tc.items) {
      const s = it.str || '';
      if (!s.trim()) continue;
      const t = it.transform;
      const e = t[4];
      const f = t[5];
      const vx = m[0] * e + m[2] * f + m[4];
      const vy = m[1] * e + m[3] * f + m[5];
      const wx = m[0] * (it.width || 0);
      const wy = m[1] * (it.width || 0);
      const hx = m[2] * (it.height || 0);
      const hy = m[3] * (it.height || 0);
      const xs = [vx, vx + wx, vx + hx, vx + wx + hx];
      const ys = [vy, vy + wy, vy + hy, vy + wy + hy];
      const x0 = Math.min(...xs);
      const x1 = Math.max(...xs);
      const y0 = Math.min(...ys);
      const y1 = Math.max(...ys);
      out.push([
        +(x0 / vp.width * 100).toFixed(2),
        +(y0 / vp.height * 100).toFixed(2),
        +((x1 - x0) / vp.width * 100).toFixed(2),
        +((y1 - y0) / vp.height * 100).toFixed(2),
        s,
      ]);
      if (out.length >= 2000) break;
    }
    return out;
  });
}

async function extractDoc({ srcPath, outDir }) {
  const pdfjs = await import('./vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs');
  const { pathToFileURL } = await import('node:url');
  const stdFonts =
    pathToFileURL(path.join(ROOT, 'scripts', 'vendor', 'pdfjs-dist-6.5.438', 'standard_fonts')).href + '/';
  const data = new Uint8Array(fs.readFileSync(srcPath));
  const doc = await pdfjs
    .getDocument({ data, useSystemFonts: false, standardFontDataUrl: stdFonts })
    .promise;
  fs.mkdirSync(outDir, { recursive: true });
  const pages = [];
  let withWords = 0;
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: SCALE });
    const w = await wordsForPage(page, vp);
    pages.push(w);
    if (w.length > 0) withWords += 1;
  }
  fs.writeFileSync(path.join(outDir, 'words.json'), JSON.stringify({ v: 1, pages }));
  return { pages: doc.numPages, withWords };
}

if (!isMainThread) {
  extractDoc(workerData)
    .then((meta) => parentPort.postMessage({ ok: true, ...meta }))
    .catch((err) => parentPort.postMessage({ ok: false, error: String(err?.message || err).slice(0, 200) }));
} else {
  const args = process.argv.slice(2);
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
  const jobs = args.includes('--jobs')
    ? Math.max(1, parseInt(args[args.indexOf('--jobs') + 1], 10) || 2)
    : 2;
  const limit = args.includes('--limit')
    ? Math.max(1, parseInt(args[args.indexOf('--limit') + 1], 10) || 0)
    : 0;

  const manifestPath = path.join(OUT, 'manifest.json');
  let prev = { docs: {} };
  try { prev = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch { /* no manifest */ }

  const files = walk(SRC)
    .sort()
    .filter((f) => path.relative(SRC, f).split(path.sep).join('/').startsWith('notes/'));
  const todoAll = [];
  let skipped = 0;
  for (const f of files) {
    const rel = path.relative(SRC, f).split(path.sep).join('/');
    if (only && !rel.includes(only)) continue;
    const key = `/${rel}`;
    const dir = dirFor(rel);
    const outDir = path.join(OUT, dir);
    const prevEntry = prev.docs[key];
    const hash = sha1(fs.readFileSync(f));
    const upToDate =
      prevEntry && prevEntry.sha1 === hash && fs.existsSync(path.join(outDir, 'words.json'));
    if (upToDate) {
      skipped += 1;
      continue;
    }
    todoAll.push({ rel, srcPath: f, outDir });
  }
  const todo = limit > 0 ? todoAll.slice(0, limit) : todoAll;
  console.log(`extract-words: ${files.length} PDFs, ${skipped} up-to-date, ${todoAll.length} to extract (${jobs} workers)${limit > 0 ? ` — this batch: ${todo.length}` : ''}`);

  let done = 0;
  const t0 = Date.now();
  async function runOne(job) {
    return new Promise((resolve) => {
      const w = new Worker(fileURLToPath(import.meta.url), { workerData: job });
      w.on('message', (m) => {
        done += 1;
        console.log(
          m.ok
            ? `[${done}/${todo.length}] ${job.rel} ${m.pages}p, ${m.withWords} pages with words`
            : `[${done}/${todo.length}] ${job.rel} ERROR: ${m.error}`,
        );
        w.terminate();
        resolve();
      });
      w.on('error', (err) => {
        done += 1;
        console.log(`[${done}/${todo.length}] ${job.rel} WORKER ERROR: ${err?.message}`);
        w.terminate();
        resolve();
      });
    });
  }
  const queue = [...todo];
  const workers = Array.from({ length: Math.min(jobs, queue.length || 1) }, async () => {
    while (queue.length) {
      const job = queue.shift();
      await runOne(job);
    }
  });
  await Promise.all(workers);
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)}s: ${done} docs`);
}
