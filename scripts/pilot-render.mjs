// PILOT: render a few representative pages at two scales, measure
// JPEG bytes + ms/page, save images for a readability check.
// Usage: node scripts/pilot-render.mjs
import './polyfill.mjs'; // Node 22+ API safety net (see polyfill.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as pdfjs from './vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs'; // vendored 6.5.438 — npm 4.8.69 segfaults in Node render (see vendor README)
import { createCanvas } from '@napi-rs/canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', '..', 'pilot');
fs.mkdirSync(OUT, { recursive: true });
const STD_FONTS = pathToFileURL(path.join(__dirname, 'vendor', 'pdfjs-dist-6.5.438', 'standard_fonts')).href + '/';

const SAMPLES = [
  ['notes/sem2/engineering-mathematics-2/em2-unit-5.pdf', 1, 'em2-p1-text'],
  ['notes/sem2/engineering-mathematics-2/em2-unit-5.pdf', 40, 'em2-p40-text'],
  ['notes/sem3/adv-engineering-mathematics/aem-unit-2.pdf', 1, 'aem-p1-scan'],
  ['notes/sem5/cloud-computing-devops/cc-dev-unit-2.pdf', 1, 'ccdev-p1-big'],
];

async function renderOne(rel, pageNo, scale, tag) {
  const data = new Uint8Array(fs.readFileSync(path.join(__dirname, '..', 'public', rel)));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: false, standardFontDataUrl: STD_FONTS }).promise;
  const page = await doc.getPage(pageNo);
  const vp = page.getViewport({ scale });
  const canvas = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
  const ctx = canvas.getContext('2d');
  const t0 = Date.now();
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const ms = Date.now() - t0;
  const buf = canvas.encodeSync('jpeg', 80);
  const name = `${tag}-s${scale}.jpg`;
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(`${tag} scale=${scale} ${Math.floor(vp.width)}x${Math.floor(vp.height)} jpeg=${(buf.length / 1024).toFixed(0)}KB renderMs=${ms}`);
  return buf.length;
}

for (const [rel, pageNo, tag] of SAMPLES) {
  for (const scale of [1.5, 2.0]) {
    try { await renderOne(rel, pageNo, scale, tag); }
    catch (e) { console.log(`${tag} scale=${scale} FAILED: ${String(e.message || e).slice(0, 120)}`); }
  }
}
// One scanned PYQ page
const assess = JSON.parse(fs.readFileSync(path.join(__dirname, 'assess-pdfs.json'), 'utf8'));
const pyq = assess.find((r) => r.group === 'pyq' && r.pages >= 3);
if (pyq) {
  for (const scale of [1.5, 2.0]) {
    try { await renderOne(pyq.rel, 1, scale, 'pyq-p1-scan'); }
    catch (e) { console.log(`pyq scale=${scale} FAILED: ${String(e.message || e).slice(0, 120)}`); }
  }
  console.log('pyq sample:', pyq.rel);
}
console.log('saved to', OUT);
