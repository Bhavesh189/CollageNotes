// handwrite.mjs — re-typeset typed notes as genuine-looking handwriting.
// Node port of the verified Python pilot (~/workspace/collagenotes-work/
// handwrite/handwrite-pilot.py, verdict GOOD 2026-11-22): ruled notebook
// paper, blue ball-pen ink (Kalam), red headings, per-line rotation +
// jitter. Same style constants as the pilot; only the layout engine is
// reimplemented for @napi-rs/canvas.
//
// FIDELITY CONTRACT (non-negotiable):
// - One original page -> exactly ONE handwritten page (the viewer maps
//   page N -> page N). A page that does not fit at a readable size is NOT
//   converted — it keeps its original image.
// - Same text, same order, same meaning. Running headers/footers and
//   "Notes By" chrome are dropped (document chrome, not content).
// - Diagram/equation pages are NOT converted: a page with <120 chars of
//   text, or >25% math-fragment tokens, keeps its original rendering.
// - Handwriting must look COMPLETELY REAL: adaptive font sizes (33 -> 29
//   -> 26px) so most pages fit at the pilot's verified 33px size.
//
// Runs at build time from render-notes.mjs (prebuild) for typed Sem 2-3
// notes, and standalone:  node scripts/handwrite-notes.mjs [--only <sub>] [--limit N]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'notes-source');
const OUT = path.join(ROOT, 'public', 'generated');
export const HW_VERSION = 'hw-v1';

const FONTS = path.join(__dirname, 'fonts');
const INK = '#1c3078';
const RED = '#b22222';
const GREY = '#6e6e6e';
const RULE = '#a8c8e0';
const MARGIN_RED = '#e08282';
const PAPER = '#fdfdf7';
const pad = (n) => String(n).padStart(3, '0');
const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');

// Font sizes: pilot's verified 33px first, then smaller fallbacks. Real
// handwritten notes flow continuously — paragraphs are marked by a
// first-line indent, NOT a blank rule — so no gap lines after blocks.
const SIZES = [
  { body: 33, sub: 37, title: 46, small: 27, step: 46 },
  { body: 29, sub: 33, title: 42, small: 24, step: 42 },
  { body: 26, sub: 30, title: 38, small: 22, step: 38 },
  { body: 24, sub: 28, title: 36, small: 20, step: 36 },
  { body: 22, sub: 26, title: 34, small: 19, step: 34 },
];

let canvasLib = null;
async function getCanvas() {
  if (!canvasLib) {
    canvasLib = await import('@napi-rs/canvas');
    canvasLib.GlobalFonts.registerFromPath(path.join(FONTS, 'Kalam-Regular.ttf'), 'Kalam');
    canvasLib.GlobalFonts.registerFromPath(path.join(FONTS, 'Kalam-Bold.ttf'), 'Kalam Bold');
  }
  return canvasLib;
}

function clean(s) {
  return String(s || '')
    .replace(/[-]/g, '') // private-use glyphs (bullet artefacts etc.)
    .replace(/\s+/g, ' ')
    .trim();
}

function isBulletLine(ln) {
  const s = ln.trimStart();
  if (!s) return false;
  const c = s[0];
  return c === '•' || c === '❖' || c === '▪' || c === '-' || c === '*' || c === '·';
}

function isCaps(p) {
  const letters = [...p].filter((c) => /[A-Za-z]/.test(c));
  if (!letters.length) return false;
  return letters.filter((c) => c === c.toUpperCase()).length / letters.length > 0.85;
}

function dropChromeLine(s) {
  if (/B\.?\s*Tech.*Sem\./i.test(s) && /Unit/i.test(s)) return true;
  if (/^Unit\s*[-–]\s*\d+\s*\(.*\)\s*$/.test(s)) return true;
  if (/^\d+$/.test(s)) return true;
  if (/Notes By/i.test(s)) return true;
  return false;
}

/** Group pdf.js text items into layout lines (like pdftotext -layout):
 * items sorted by y (top first), grouped within 3pt, items within a line
 * sorted by x. Returns lines: [{ text, indent, gapAbove }] where gapAbove
 * is the vertical gap from the previous line (paragraph breaks). */
function linesFromItems(items) {
  const rows = [];
  for (const it of items) {
    const str = (it.str || '').trim();
    if (!str) continue;
    const [,,, , x, y] = it.transform || [0, 0, 0, 0, 0, 0];
    rows.push({ str, x, y, h: it.height || 12 });
  }
  rows.sort((a, b) => b.y - a.y || a.x - b.x);
  const lines = [];
  for (const r of rows) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - r.y) <= 3) {
      last.items.push(r);
    } else {
      lines.push({ y: r.y, items: [r] });
    }
  }
  const out = [];
  let prevY = null;
  for (const ln of lines) {
    ln.items.sort((a, b) => a.x - b.x);
    const text = ln.items.map((i) => i.str).join(' ');
    const indent = Math.round(Math.min(...ln.items.map((i) => i.x)));
    const gapAbove = prevY === null ? 0 : prevY - ln.y;
    out.push({ text: clean(text), indent, gapAbove });
    prevY = ln.y;
  }
  return out;
}

/** Pilot's paragraph parse, adapted to y-gap paragraph breaks. */
function parsePage(lines) {
  const kept = [];
  for (const ln of lines) {
    const s = ln.text;
    if (!s) continue;
    if (/^[.\-•·,;:]+$/.test(s)) continue; // lone punctuation artefact
    if (dropChromeLine(s)) continue;
    kept.push(ln);
  }
  while (kept.length && !kept[0].text) kept.shift();
  while (kept.length && !kept[kept.length - 1].text) kept.pop();

  const paras = [];
  let curKind = null;
  let cur = [];
  const flush = () => {
    if (cur.length) {
      // A run of ≥2 consecutive SHORT lines (none ending a sentence) is a
      // LIST, not prose — each line stays on its own rule, like the original.
      const shortRun = cur.length >= 2 && cur.every((p) => {
        const t = clean(p);
        if (t.length === 0 || t.length > 45) return false;
        // A line ending in . ! ? ends a sentence — except abbreviations.
        if (/[.!?]$/.test(t) && !/\b(etc|e\.g|i\.e)\.$/.test(t)) return false;
        return true;
      });
      if (shortRun && curKind === 'para') {
        for (const p of cur) paras.push(['list', clean(p)]);
      } else {
        paras.push([curKind, cur.map((p) => clean(p)).filter(Boolean).join(' ')]);
      }
      curKind = null;
      cur = [];
    }
  };
  for (const ln of kept) {
    if (ln.gapAbove > 22 && cur.length) flush(); // paragraph break
    if (isBulletLine(ln.text)) {
      flush();
      curKind = 'bullet';
      cur = [ln.text.trimStart().replace(/^[•❖▪\-*·]\s*/, '')];
    } else if (curKind === 'bullet' && ln.indent >= 90) {
      cur.push(ln.text); // wrapped continuation under the bullet text
    } else if (curKind === 'bullet') {
      flush();
      curKind = 'para';
      cur = [ln.text];
    } else {
      if (curKind === null) curKind = 'para';
      cur.push(ln.text);
    }
  }
  flush();
  const cleanParas = paras.map(([k, t]) => [k, clean(t)]).filter(([, t]) => t);

  const title = [];
  const blocks = [];
  cleanParas.forEach(([kind, p], idx) => {
    if (kind === 'bullet') { blocks.push(['bullet', p]); return; }
    if (kind === 'list') { blocks.push(['list', p]); return; }
    if (idx < 2 && isCaps(p) && p.length <= 70) { title.push(p); return; }
    if (isCaps(p) && p.length <= 70) { blocks.push(['sub', p]); return; }
    if (p.length <= 48 && !p.endsWith('.') && !p.endsWith(',')) { blocks.push(['sub', p]); return; }
    blocks.push(['para', p]);
  });
  return { title, blocks };
}

/** Is this page convertible? Needs enough real prose, not equations. */
export function convertible(text) {
  if (!text || text.length < 120) return false;
  const tokens = text.split(/\s+/).filter(Boolean);
  const words = tokens.filter((t) => /[A-Za-z]{3,}/.test(t));
  if (words.length < 30) return false;
  const mathy = tokens.filter((t) => /^[+\-*/=<>±×÷∫∑√πθαβγλΔ∞≤≥≠()[\]{}^_0-9.,;:'"\\|/]+$/.test(t) && t.length <= 3);
  if (tokens.length > 0 && mathy.length / tokens.length > 0.25) return false;
  return true;
}

function wrapText(ctx, text, maxW) {
  const lines = [];
  let cur = '';
  for (const w of text.split(/\s+/)) {
    const trial = (cur + ' ' + w).trim();
    if (ctx.measureText(trial).width <= maxW) cur = trial;
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function fitFont(ctx, text, family, size, maxW, floor) {
  while (size > floor) {
    ctx.font = `${size}px "${family}"`;
    if (ctx.measureText(text).width <= maxW) return size;
    size -= 2;
  }
  return floor;
}

/** Lay out the blocks at a given size set — returns the wrapped lines and
 * the total line count, without drawing. */
function layoutBlocks(ctx, title, blocks, sz, left, maxW) {
  const lines = []; // { text, kind, x0, font, size, color, bullet }
  for (const t of title) {
    const fs = fitFont(ctx, t, 'Kalam Bold', sz.title, maxW, 30);
    lines.push({ text: t, kind: 'title', font: 'Kalam Bold', size: fs, color: RED, underline: true });
    lines.push({ kind: 'gap', n: 1 });
  }
  if (title.length) lines.push({ kind: 'gap', n: 1 });
  for (const [kind, text] of blocks) {
    if (kind === 'sub') {
      ctx.font = `${sz.sub}px "Kalam Bold"`;
      for (const sln of wrapText(ctx, text, maxW)) {
        lines.push({ text: sln, kind: 'sub', font: 'Kalam Bold', size: sz.sub, color: RED });
      }
      continue;
    }
    if (kind === 'list') {
      // One source line per rule, with a hand-drawn dot on the first line.
      ctx.font = `${sz.body}px Kalam`;
      wrapText(ctx, text, maxW).forEach((lln, li) => {
        lines.push({ text: lln, kind: 'list', font: 'Kalam', size: sz.body, color: INK, bullet: li === 0 });
      });
      continue;
    }
    ctx.font = `${sz.body}px Kalam`;
    const wrapped = wrapText(ctx, text, maxW);
    wrapped.forEach((ln, j) => {
      lines.push({
        text: ln, kind, font: 'Kalam', size: sz.body, color: INK,
        bullet: kind === 'bullet' && j === 0,
        indent: kind === 'para' && j === 0 ? 36 : 0,
      });
    });
  }
  return lines;
}

function renderHandwrittenPage(canvasLib, W, H, pageNum, title, blocks) {
  const left = 112;
  const right = W - 64;
  const maxW = right - left;
  const canvas = canvasLib.createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Pick the largest size set that fits 1:1.
  let chosen = null;
  let chosenLines = null;
  for (const sz of SIZES) {
    const lines = layoutBlocks(ctx, title, blocks, sz, left, maxW);
    let need = 0;
    for (const l of lines) need += l.kind === 'gap' ? l.n : (l.kind === 'title' ? 2 : 1);
    const avail = Math.floor((H - 92 - 62) / sz.step);
    if (need <= avail) { chosen = sz; chosenLines = lines; break; }
  }
  if (!chosen) return null; // does not fit at a readable size — keep original

  const sz = chosen;
  // Paper + rules + red margin.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1;
  for (let y = 64; y < H - 40; y += sz.step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.strokeStyle = MARGIN_RED;
  ctx.beginPath();
  ctx.moveTo(88, 0);
  ctx.lineTo(88, H);
  ctx.stroke();

  let y = 92; // baseline of the first rule
  const rnd = mulberry32(7 + pageNum * 13);
  for (const l of chosenLines) {
    if (l.kind === 'gap') { y += l.n * sz.step; continue; }
    const rot = (rnd() - 0.5) * 0.012; // ±0.35°
    const jit = Math.round((rnd() - 0.5) * 4);
    ctx.font = `${l.size}px "${l.font}"`;
    const x = l.kind === 'title'
      ? Math.max(left, Math.round((W - ctx.measureText(l.text).width) / 2))
      : left + (l.indent || 0);
    ctx.save();
    ctx.translate(x + jit, y);
    ctx.rotate(rot);
    ctx.fillStyle = l.color;
    ctx.textBaseline = 'alphabetic';
    if (l.bullet) {
      // Hand-drawn dot instead of a glyph (Kalam has no ❖/•).
      ctx.beginPath();
      ctx.arc(-16, -9, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillText(l.text, 0, 0);
    ctx.restore();
    if (l.underline) {
      const w = ctx.measureText(l.text).width;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 5);
      ctx.lineTo(x + w, y + 5);
      ctx.stroke();
    }
    y += (l.kind === 'title' ? 2 : 1) * sz.step;
  }

  // Page number, bottom centre.
  ctx.font = `${sz.small}px Kalam`;
  ctx.fillStyle = GREY;
  const num = String(pageNum);
  ctx.fillText(num, (W - ctx.measureText(num).width) / 2, H - 50);
  return { canvas, fontSize: sz.body };
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Convert one doc. Returns { hwPages, kept, skipped } — hwPages are the
 * 1-based original page numbers that got a handwritten image. */
export async function convertDoc({ rel, srcPath, outDir, manifestEntry }) {
  const canvasLib = await getCanvas();
  const pdfjs = await import('./vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs');
  const { pathToFileURL } = await import('node:url');
  const stdFonts =
    pathToFileURL(path.join(ROOT, 'scripts', 'vendor', 'pdfjs-dist-6.5.438', 'standard_fonts')).href + '/';
  const data = new Uint8Array(fs.readFileSync(srcPath));
  const doc = await pdfjs
    .getDocument({ data, useSystemFonts: false, standardFontDataUrl: stdFonts })
    .promise;

  const sjPath = path.join(outDir, 'search.json');
  let searchTexts = [];
  try { searchTexts = JSON.parse(fs.readFileSync(sjPath, 'utf8')).pages || []; } catch { /* no index */ }

  // Original page image size (all pages share it at scale 1.5).
  const first = await doc.getPage(1);
  const vp = first.getViewport({ scale: 1.5 });
  const W = Math.floor(vp.width);
  const H = Math.floor(vp.height);

  const hwDir = path.join(outDir, 'hw');
  fs.mkdirSync(hwDir, { recursive: true });
  const hwPages = [];
  const kept = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const text = searchTexts[i - 1] || '';
    if (!convertible(text)) { kept.push(i); continue; }
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    const { title, blocks } = parsePage(linesFromItems(tc.items || []));
    if (blocks.length === 0) { kept.push(i); continue; }
    const rendered = renderHandwrittenPage(canvasLib, W, H, i, title, blocks);
    if (!rendered) { kept.push(i); continue; } // too dense — keep original
    const jpg = rendered.canvas.encodeSync('jpeg', 88);
    fs.writeFileSync(path.join(hwDir, `page-${pad(i)}.jpg`), jpg);
    // PERF (2026-11-24): filmstrip thumbnail for the handwritten page —
    // 128px wide (2x the 64px display), JPEG q60. Same canvas, one draw.
    const thumbW = 128;
    const thumbH = Math.max(1, Math.round((thumbW * rendered.canvas.height) / rendered.canvas.width));
    const thumbCanvas = canvasLib.createCanvas(thumbW, thumbH);
    thumbCanvas.getContext('2d').drawImage(rendered.canvas, 0, 0, thumbW, thumbH);
    fs.writeFileSync(path.join(hwDir, `thumb-${pad(i)}.jpg`), thumbCanvas.encodeSync('jpeg', 60));
    hwPages.push(i);
  }
  return { hwPages, kept, pages: doc.numPages };
}

export function hwShaFor(sourceSha) {
  return sha1(`${HW_VERSION}:${sourceSha}`);
}

/** The typed Sem 2-3 docs the handwriting conversion covers (PYQ excluded,
 * Sem 4+ out of scope). */
export function handwriteTargets(docs) {
  return Object.entries(docs)
    .filter(([key, e]) =>
      (key.startsWith('/notes/sem2/') || key.startsWith('/notes/sem3/')) &&
      !key.endsWith('-Handwritten-Notes-Full.pdf') &&
      e && e.pages > 0 && !e.error && e.textPages && e.pages &&
      e.textPages / e.pages > 0.5)
    .map(([key, e]) => ({ key, entry: e, rel: key.slice(1) }));
}

/** Run the conversion for every target doc that is not up to date.
 * Up-to-date = entry.hwSha matches the source SHA and every hw image
 * exists on disk. Updates `docs` in place; the caller writes the manifest. */
export async function runHandwritePass(docs, { only = null, limit = 0, force = false, log = console.log } = {}) {
  const targets = handwriteTargets(docs).filter((t) => !only || t.rel.includes(only));
  const queue = limit > 0 ? targets.slice(0, limit) : targets;
  let convertedDocs = 0;
  let convertedPages = 0;
  for (const t of queue) {
    const outDir = path.join(OUT, t.entry.dir);
    const wantSha = hwShaFor(t.entry.sha1 || '');
    const hwDir = path.join(outDir, 'hw');
    const upToDate =
      !force &&
      t.entry.hwSha === wantSha &&
      Array.isArray(t.entry.hwPages) &&
      t.entry.hwPages.every((p) => fs.existsSync(path.join(hwDir, `page-${pad(p)}.jpg`)));
    if (upToDate) {
      log(`hw: skip ${t.rel} (${t.entry.hwPages.length}p already handwritten)`);
      continue;
    }
    const srcPath = path.join(SRC, t.rel);
    if (!fs.existsSync(srcPath)) {
      log(`hw: skip ${t.rel} (source missing)`);
      continue;
    }
    try {
      const { hwPages, kept } = await convertDoc({ rel: t.rel, srcPath, outDir, manifestEntry: t.entry });
      t.entry.hwPages = hwPages;
      t.entry.hwSha = wantSha;
      convertedDocs += 1;
      convertedPages += hwPages.length;
      log(`hw: ${t.rel} — ${hwPages.length}p handwritten, ${kept.length}p kept original (${kept.slice(0, 8).join(',')}${kept.length > 8 ? '…' : ''})`);
    } catch (err) {
      log(`hw: ${t.rel} ERROR: ${String(err?.message || err).slice(0, 200)}`);
    }
  }
  return { convertedDocs, convertedPages, targets: queue.length };
}
