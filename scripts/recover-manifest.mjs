// One-off recovery: rebuild public/generated/manifest.json from the page
// images + search.json files already on disk (e.g. after a killed render
// run that never wrote its manifest). Docs with complete on-disk output
// are recorded as done; the rest are left for the next render run.
// Usage: node scripts/recover-manifest.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'notes-source');
const OUT = path.join(ROOT, 'public', 'generated');
const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
const SUSPICIOUS_BYTES = 12 * 1024;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.toLowerCase().endsWith('.pdf')) out.push(p);
  }
  return out;
}

const docs = {};
let recovered = 0;
for (const f of walk(SRC)) {
  const rel = path.relative(SRC, f).split(path.sep).join('/');
  const dir = sha1(rel).slice(0, 12);
  const outDir = path.join(OUT, dir);
  const searchPath = path.join(outDir, 'search.json');
  if (!fs.existsSync(searchPath)) continue;
  const pages = fs.readdirSync(outDir).filter((n) => /^page-\d+\.jpg$/.test(n)).sort();
  if (pages.length === 0) continue;
  // All pages present? (page count must be contiguous 1..N)
  const nums = pages.map((n) => parseInt(n.slice(5, 8), 10));
  if (nums[nums.length - 1] !== nums.length) continue; // gaps — incomplete
  let bytes = 0;
  const suspicious = [];
  pages.forEach((n, i) => {
    const sz = fs.statSync(path.join(outDir, n)).size;
    bytes += sz;
    if (sz < SUSPICIOUS_BYTES) suspicious.push(i + 1);
  });
  const search = JSON.parse(fs.readFileSync(searchPath, 'utf8'));
  const textPages = (search.pages || []).filter((t) => (t || '').length >= 20).length;
  docs[`/${rel}`] = {
    dir, pages: pages.length, bytes,
    sha1: sha1(fs.readFileSync(f)), scale: 1.5, quality: 80,
    suspicious, textPages,
  };
  recovered += 1;
}
const prev = (() => { try { return JSON.parse(fs.readFileSync(path.join(OUT, 'manifest.json'), 'utf8')); } catch { return { docs: {} }; } })();
const merged = { ...prev.docs, ...docs };
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({
  version: 1, scale: 1.5, quality: 80, generatedAt: new Date().toISOString(), docs: merged,
}, null, 1));
console.log(`recovered ${recovered} docs into manifest (total entries: ${Object.keys(merged).length})`);
