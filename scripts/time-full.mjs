import './polyfill.mjs'; // Node 22+ API safety net (see polyfill.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as pdfjs from './vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs'; // vendored 6.5.438 — npm 4.8.69 segfaults in Node render (see vendor README)
import { createCanvas } from '@napi-rs/canvas';
const STD = pathToFileURL(path.join(__dirname, 'vendor', 'pdfjs-dist-6.5.438', 'standard_fonts')).href + '/';
const rel = 'notes/sem2/engineering-mathematics-2/em2-unit-5.pdf';
const data = new Uint8Array(fs.readFileSync('/home/hatch/workspace/collagenotes-work/CollageNotes/public/' + rel));
const t0 = Date.now();
const doc = await pdfjs.getDocument({ data, useSystemFonts: false, standardFontDataUrl: STD }).promise;
let totalBytes = 0, totalMs = 0;
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const vp = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
  const t1 = Date.now();
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  totalMs += Date.now() - t1;
  totalBytes += canvas.encodeSync('jpeg', 80).length;
  // extract text too (search index cost)
  const tc = await page.getTextContent();
  void tc.items.length;
}
console.log(`FULL ${rel}: pages=${doc.numPages} wallMs=${Date.now()-t0} renderMs=${totalMs} totalJpeg=${(totalBytes/1024).toFixed(0)}KB avgPerPage=${(totalBytes/doc.numPages/1024).toFixed(0)}KB avgRenderMs=${(totalMs/doc.numPages).toFixed(0)}`);
