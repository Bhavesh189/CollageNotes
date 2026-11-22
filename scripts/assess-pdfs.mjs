// Assessment for the image-viewer plan: count every PDF under public/,
// its pages, its bytes, and whether page 1 has extractable text
// (scanned/handwritten pages have ~no text -> search index will be thin).
// Read-only. Usage: node scripts/assess-pdfs.mjs
import './polyfill.mjs'; // Node 22+ API safety net (see polyfill.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pdfjs from './vendor/pdfjs-dist-6.5.438/legacy/build/pdf.mjs'; // vendored 6.5.438 — npm 4.8.69 segfaults in Node render (see vendor README)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'public');

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.toLowerCase().endsWith('.pdf')) out.push(p);
  }
  return out;
}

const files = walk(ROOT, []).sort();
const rows = [];
let totalPages = 0, totalBytes = 0, noTextDocs = 0;
const t0 = Date.now();
for (const f of files) {
  const data = new Uint8Array(fs.readFileSync(f));
  const size = data.length;
  let pages = 0, textChars = 0, err = '';
  try {
    const doc = await pdfjs.getDocument({ data, useSystemFonts: false, disableFontFace: true }).promise;
    pages = doc.numPages;
    const pg = await doc.getPage(1);
    const tc = await pg.getTextContent();
    textChars = tc.items.map((i) => i.str).join(' ').length;
    // no destroy in pdfjs 4.x — process exits, GC handles it
  } catch (e) { err = String(e.message || e).slice(0, 80); }
  const rel = path.relative(ROOT, f);
  const group = rel.split(path.sep)[0];
  totalPages += pages; totalBytes += size;
  if (textChars < 20) noTextDocs += 1;
  rows.push({ rel, group, pages, size, textChars, err });
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`files=${files.length} totalPages=${totalPages} totalBytes=${(totalBytes / 1048576).toFixed(1)}MB noTextDocs(<20 chars p1)=${noTextDocs} assessSecs=${secs}`);
const byGroup = {};
for (const r of rows) {
  byGroup[r.group] = byGroup[r.group] || { files: 0, pages: 0, bytes: 0, noText: 0 };
  byGroup[r.group].files += 1; byGroup[r.group].pages += r.pages;
  byGroup[r.group].bytes += r.size; if (r.textChars < 20) byGroup[r.group].noText += 1;
}
for (const [g, v] of Object.entries(byGroup)) {
  console.log(`  ${g}: files=${v.files} pages=${v.pages} bytes=${(v.bytes / 1048576).toFixed(1)}MB noTextDocs=${v.noText}`);
}
const big = [...rows].sort((a, b) => b.pages - a.pages).slice(0, 8);
console.log('largest by pages:');
for (const r of big) console.log(`  ${r.pages}p ${r.rel} (${(r.size / 1048576).toFixed(1)}MB, p1text=${r.textChars})`);
const errs = rows.filter((r) => r.err);
console.log(`errors: ${errs.length}`);
for (const r of errs) console.log(`  ERR ${r.rel}: ${r.err}`);
fs.writeFileSync(path.join(__dirname, 'assess-pdfs.json'), JSON.stringify(rows, null, 1));
console.log('wrote scripts/assess-pdfs.json');
