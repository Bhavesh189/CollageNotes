// Build-time renderer: every NOTES PDF under notes-source/notes/ becomes
// page images + a per-page text search index under public/generated/.
//
// PERF (2026-11-24): every page ALSO gets a small thumbnail
// (thumb-NNN.jpg, 128px wide, JPEG q60) for the viewer's Pages filmstrip.
// The strip used to load the full-size page-*.jpg (~170 KB each) for a
// 64px-wide thumb — up to ~5-10 MB in one burst on phones. Thumbs are
// build output (public/generated/ is gitignored) and cost ~8-12 KB each.
// Reading pages are UNCHANGED (same 892x1263 q80 files).
//
// PYQ EXEMPTION (2026-11-22): only NOTES are rendered. PYQs and syllabus
// stay as PDFs under public/ (view + download allowed), so this script
// never touches them — notes-source/pyq/ and notes-source/syllabus/ are
// not even walked. Notes scope: 168 PDFs, 5,894 pages, 752 MB source;
// at scale 1.5 / JPEG q80 (~105 KB/page) that's ~600 MB of images.
//
//   node scripts/render-notes.mjs [--only <substring>] [--force] [--jobs N] [--limit N]
//   --limit N: render at most N docs this run (batching). The manifest is
//   written after EVERY doc, so a killed or limited run loses nothing and
//   the next run resumes from the next doc. Small batches (20-30) are the
//   safe way to run this on the 2-core VM: a full 168-doc run at jobs>1
//   was SIGKILLed (exit 137) twice when other jobs ran concurrently.
//
// - Output per doc: public/generated/<dir12>/page-001.jpg ... + search.json
//   ({ pages: ["text of page 1", ...] }), plus public/generated/manifest.json
//   mapping the app's file key ('/notes/sem2/.../em2-unit-5.pdf') to its entry.
// - Scale 1.5, JPEG quality 80: ~105 KB/page (verified readable on phone,
//   incl. CamScanner notes; deterministic bytes, so Vercel's content-hash
//   dedupe makes re-deploys cheap).
// - Incremental: a doc is skipped when its source SHA-1 + render settings
//   match the manifest AND its images exist on disk. Locally this makes
//   re-runs fast; on Vercel (no generated/ dir in the repo) the first build
//   renders everything (~8-15 min with 4 workers, under the 45-min cap).
// - Runs automatically before `vite build` via the `prebuild` npm script,
//   so a new note dropped into notes-source/ renders with no manual work.
// - Renders with pdfjs-dist + @napi-rs/canvas (pure Node, no system deps).
//   pdf.js quirk: pass a FRESH Uint8Array per document — reusing a buffer
//   across getDocument calls throws DataCloneError (the buffer is detached
//   on transfer).
// - Pages whose JPEG is suspiciously small (<12 KB) are flagged in the
//   manifest — usually a blank page or a JBIG2 image pdf.js skipped.
//   Corrupt PDFs (e.g. em2-unit-3.pdf, "Invalid PDF structure") are logged
//   and recorded with an error instead of failing the whole run.
import './polyfill.mjs'; // Node 22+ API safety net (see polyfill.mjs)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { buildKeywordIndex } from './build-keywords.mjs';
import { runHandwritePass } from './handwrite.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'notes-source');
const OUT = path.join(ROOT, 'public', 'generated');
const SCALE = 1.5;
const QUALITY = 80;
const THUMB_W = 128; // filmstrip thumbs display at 64px (52px on phones) — 128px = 2x
const THUMB_QUALITY = 60;
const SUSPICIOUS_BYTES = 12 * 1024;
const MAX_TEXT_CHARS = 6000;

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

// ---------------- worker: renders ONE document ----------------
async function renderDoc({ rel, srcPath, outDir }) {
  // pdf.js 6.5.438, VENDORED (scripts/vendor/pdfjs-dist-6.5.438/): the
  // npm-installed pdfjs-dist 4.8.69 (pinned for react-pdf 9.2.1) SEGFAULTS
  // inside page.render() in Node — see the vendor README. Do not point
  // this import back at 'pdfjs-dist'.
  const pdfjs = await import('./vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs');
  const { createCanvas } = await import('@napi-rs/canvas');
  const { pathToFileURL } = await import('node:url');
  const stdFonts =
    pathToFileURL(path.join(ROOT, 'scripts', 'vendor', 'pdfjs-dist-6.5.438', 'standard_fonts')).href + '/';
  const data = new Uint8Array(fs.readFileSync(srcPath));
  const doc = await pdfjs
    .getDocument({ data, useSystemFonts: false, standardFontDataUrl: stdFonts })
    .promise;
  fs.mkdirSync(outDir, { recursive: true });
  const texts = [];
  const words = []; // per-page word boxes for the viewer text layer
  const suspicious = [];
  let bytes = 0;
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    const jpg = canvas.encodeSync('jpeg', QUALITY);
    fs.writeFileSync(path.join(outDir, `page-${pad(i)}.jpg`), jpg);
    bytes += jpg.length;
    // PERF (2026-11-24): filmstrip thumbnail from the same canvas —
    // 128px wide (2x the 64px display), JPEG q60, ~8-12 KB. Drawn from
    // the already-rendered canvas, so it costs one draw + one encode.
    const thumbW = THUMB_W;
    const thumbH = Math.max(1, Math.round((thumbW * canvas.height) / canvas.width));
    const thumbCanvas = createCanvas(thumbW, thumbH);
    thumbCanvas.getContext('2d').drawImage(canvas, 0, 0, thumbW, thumbH);
    fs.writeFileSync(path.join(outDir, `thumb-${pad(i)}.jpg`), thumbCanvas.encodeSync('jpeg', THUMB_QUALITY));
    if (jpg.length < SUSPICIOUS_BYTES) suspicious.push(i);
    const tc = await page.getTextContent();
    const text = tc.items
      .map((it) => it.str || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_TEXT_CHARS);
    texts.push(text);
    // Word boxes for the viewer text layer (2026-11-23): each
    // getTextContent item carries its PDF-space transform + width/height.
    // Map through the viewport transform to image pixels, then to % of the
    // page, so the viewer can overlay a transparent selectable text layer
    // on the page image. Items are line fragments, not single words — the
    // browser's native selection works across them, and highlight rects
    // come from the spans' boxes. Written as words.json next to
    // search.json; the viewer fetches it lazily (select mode only).
    // NOTE: kept in sync with scripts/extract-words.mjs (backfill tool).
    const m = vp.transform; // PDF pt -> image px
    const pageWords = [];
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
      pageWords.push([
        +(x0 / vp.width * 100).toFixed(2),
        +(y0 / vp.height * 100).toFixed(2),
        +((x1 - x0) / vp.width * 100).toFixed(2),
        +((y1 - y0) / vp.height * 100).toFixed(2),
        s,
      ]);
      if (pageWords.length >= 2000) break;
    }
    words.push(pageWords);
  }
  fs.writeFileSync(path.join(outDir, 'search.json'), JSON.stringify({ pages: texts }));
  fs.writeFileSync(path.join(outDir, 'words.json'), JSON.stringify({ v: 1, pages: words }));
  return {
    pages: doc.numPages,
    bytes,
    suspicious,
    textPages: texts.filter((t) => t.length >= 20).length,
  };
}

if (!isMainThread) {
  renderDoc(workerData)
    .then((meta) => parentPort.postMessage({ ok: true, ...meta }))
    .catch((err) => parentPort.postMessage({ ok: false, error: String(err?.message || err).slice(0, 200) }));
} else {
  // ---------------- main thread: plan + pool ----------------
  const args = process.argv.slice(2);
  const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
  const force = args.includes('--force');
  const jobs = args.includes('--jobs')
    ? Math.max(1, parseInt(args[args.indexOf('--jobs') + 1], 10) || 4)
    : Math.min(4, os.availableParallelism ? os.availableParallelism() : 4);
  const limit = args.includes('--limit')
    ? Math.max(1, parseInt(args[args.indexOf('--limit') + 1], 10) || 0)
    : 0;

  const manifestPath = path.join(OUT, 'manifest.json');
  let prev = { version: 0, docs: {} };
  try { prev = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch { /* first run */ }

  const files = walk(SRC)
    .sort()
    // NOTES + PYQ SOLUTIONS — PYQ/syllabus PDFs are served as files, never
    // rendered. Solutions live under notes-source/pyq-solutions/ and render
    // to page images like notes (protected viewer, no download).
    .filter((f) => {
      const rel = path.relative(SRC, f).split(path.sep).join('/');
      return rel.startsWith('notes/') || rel.startsWith('pyq-solutions/');
    });
  const plan = [];
  for (const f of files) {
    const rel = path.relative(SRC, f).split(path.sep).join('/');
    if (only && !rel.includes(only)) continue;
    const buf = fs.readFileSync(f);
    const hash = sha1(buf);
    const key = `/${rel}`;
    const dir = dirFor(rel);
    const outDir = path.join(OUT, dir);
    const prevEntry = prev.docs[key];
    const settingsMatch =
      prevEntry && prevEntry.sha1 === hash && prevEntry.scale === SCALE && prevEntry.quality === QUALITY;
    const imagesExist =
      settingsMatch &&
      prevEntry.pages > 0 &&
      Array.from({ length: prevEntry.pages }, (_, i) => path.join(outDir, `page-${pad(i + 1)}.jpg`)).every((p) => fs.existsSync(p)) &&
      // PERF (2026-11-24): thumbs must exist too — docs rendered before
      // thumbnails get them on the next prebuild instead of being skipped.
      Array.from({ length: prevEntry.pages }, (_, i) => path.join(outDir, `thumb-${pad(i + 1)}.jpg`)).every((p) => fs.existsSync(p)) &&
      fs.existsSync(path.join(outDir, 'search.json'));
    if (!force && imagesExist) {
      plan.push({ rel, key, dir, outDir, skip: true, entry: prevEntry });
    } else {
      plan.push({ rel, key, dir, outDir, skip: false, hash, srcPath: f });
    }
  }
  const todoAll = plan.filter((p) => !p.skip);
  const todo = limit > 0 ? todoAll.slice(0, limit) : todoAll;
  console.log(`render-notes: ${files.length} PDFs, ${plan.filter((p) => p.skip).length} up-to-date, ${todoAll.length} to render (${jobs} workers)${limit > 0 ? ` — this batch: ${todo.length}` : ''}`);

  // Carry over EVERY previous entry, not just the skipped ones: a run that
  // is killed (or run with --only) must never drop manifest entries for
  // docs it did not render. The old code started from skipped-only, so a
  // --only test run rewrote the manifest with just its 1 doc (33 entries
  // lost on 2026-11-22) and every killed run lost the entries of docs it
  // had queued but not finished. Newly rendered docs overwrite their key.
  const docs = { ...prev.docs };

  // Write the manifest after EVERY doc, not just at the end — if this
  // process is killed (OOM, VM restart), completed docs stay done and a
  // re-run resumes from the next one instead of redoing everything.
  const writeManifest = () => {
    fs.mkdirSync(OUT, { recursive: true });
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(
        { version: 1, scale: SCALE, quality: QUALITY, generatedAt: new Date().toISOString(), docs },
        null, 1,
      ),
    );
  };

  let done = 0;
  const t0 = Date.now();
  async function runOne(job) {
    return new Promise((resolve) => {
      const w = new Worker(fileURLToPath(import.meta.url), {
        workerData: { rel: job.rel, srcPath: job.srcPath, outDir: job.outDir },
      });
      w.on('message', (m) => {
        done += 1;
        if (m.ok) {
          docs[job.key] = {
            dir: job.dir, pages: m.pages, bytes: m.bytes, sha1: job.hash,
            scale: SCALE, quality: QUALITY, suspicious: m.suspicious, textPages: m.textPages,
          };
          const flag = m.suspicious.length ? ` SUSPICIOUS p.${m.suspicious.join(',')}` : '';
          const noText = m.textPages === 0 ? ' NO-TEXT' : '';
          console.log(`[${done}/${todo.length}] ${job.rel} ${m.pages}p ${(m.bytes / 1024).toFixed(0)}KB${flag}${noText}`);
        } else {
          docs[job.key] = { dir: job.dir, pages: 0, sha1: job.hash, scale: SCALE, quality: QUALITY, error: m.error };
          console.log(`[${done}/${todo.length}] ${job.rel} ERROR: ${m.error}`);
        }
        writeManifest();
        // Free the worker thread NOW: pdf.js + @napi-rs/canvas hold large
        // native (off-heap) buffers that are NOT covered by the Node heap
        // cap and are not reliably released when the thread idles. Without
        // this, RSS grows with every doc rendered and the cell OOM-killer
        // SIGKILLs the run after a handful of docs (exit 137, 3x).
        // The worker has already written all files + posted its result.
        w.terminate();
        resolve();
      });
      w.on('error', (err) => {
        done += 1;
        docs[job.key] = { dir: job.dir, pages: 0, sha1: job.hash, scale: SCALE, quality: QUALITY, error: String(err?.message || err).slice(0, 200) };
        console.log(`[${done}/${todo.length}] ${job.rel} WORKER ERROR: ${err?.message}`);
        writeManifest();
        w.terminate();
        resolve();
      });
    });
  }

  // Bounded pool over whole documents.
  const queue = [...todo];
  const workers = Array.from({ length: Math.min(jobs, queue.length || 1) }, async () => {
    while (queue.length) {
      const job = queue.shift();
      await runOne(job);
    }
  });
  await Promise.all(workers);

  const manifest = {
    version: 1,
    scale: SCALE,
    quality: QUALITY,
    generatedAt: new Date().toISOString(),
    docs,
  };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  const rendered = Object.values(docs).filter((d) => d.pages > 0);
  const totalPages = rendered.reduce((s, d) => s + d.pages, 0);
  const totalBytes = rendered.reduce((s, d) => s + (d.bytes || 0), 0);
  const errors = Object.entries(docs).filter(([, d]) => d.error);
  const suspiciousDocs = Object.entries(docs).filter(([, d]) => (d.suspicious || []).length);
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)}s: ${rendered.length} docs, ${totalPages} pages, ${(totalBytes / 1048576).toFixed(0)}MB images`);
  if (errors.length) console.log(`errors (${errors.length}): ${errors.map(([k, d]) => `${k} — ${d.error}`).join(' | ')}`);
  if (suspiciousDocs.length) console.log(`suspicious pages in ${suspiciousDocs.length} docs (JPEG <12KB — check for blank/JBIG2 pages)`);

  // Handwriting conversion — typed Sem 2-3 notes re-set in Kalam on ruled
  // paper (scripts/handwrite.mjs). Idempotent: docs whose hwSha matches
  // and whose hw images exist are skipped, so re-runs are a no-op.
  const hw = await runHandwritePass(docs, { log: (m) => console.log(m) });
  if (hw.convertedDocs) console.log(`handwrite: ${hw.convertedDocs} docs, ${hw.convertedPages} pages handwritten`);

  // Keyword index for the in-site chatbot (src/lib/notesRag.js) — see
  // scripts/build-keywords.mjs. Rebuilt from all on-disk search.json files
  // so a killed or partial run still leaves a correct index.
  buildKeywordIndex();

  // MANIFEST REWRITE (2026-11-23 fix): runHandwritePass() mutates the
  // in-memory docs above (entry.hwPages / hwSha) AFTER the manifest was
  // last written at the end of the render phase. Without this second
  // write, a FRESH build (Vercel / GitHub Pages — no previous manifest)
  // deploys a manifest with 0 docs carrying hwPages, so the viewer never
  // serves handwritten pages even though the hw images were generated.
  // Same JSON shape + fresh generatedAt as every other write; idempotent.
  writeManifest();
}
