import fs from 'node:fs';
import crypto from 'node:crypto';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
const FILE='/home/hatch/workspace/collagenotes-work/CollageNotes/public/notes/sem2/engineering-mathematics-2/em2-unit-5.pdf';
async function once() {
  const data = new Uint8Array(fs.readFileSync(FILE));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: false }).promise;
  const page = await doc.getPage(1);
  const vp = page.getViewport({ scale: 1.5 });
  const c = createCanvas(Math.floor(vp.width), Math.floor(vp.height));
  await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
  return crypto.createHash('sha256').update(c.encodeSync('jpeg', 80)).digest('hex');
}
console.log('run1:', await once());
console.log('run2:', await once());
