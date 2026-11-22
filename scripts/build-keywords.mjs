// Keyword index for the in-site chatbot (src/lib/notesRag.js): term ->
// [{f: fileKey, p: page}]. Built from ALL on-disk search.json files in
// public/generated/ so a killed or partial render still leaves a correct
// index. Terms are lowercase words >=4 chars; stopwords and terms appearing
// on >30 pages (too common to discriminate) are dropped; postings capped at
// 10 per term to bound the file size. The tokenizer MUST match notesRag.js.
// Used two ways: (a) render-notes.mjs calls buildKeywordIndex() at the end
// of every run (so Vercel's prebuild produces it), (b) run directly to
// rebuild it by hand: node scripts/build-keywords.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'generated');

const KW_STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'what', 'when',
  'where', 'which', 'there', 'their', 'about', 'into', 'your', 'have',
  'been', 'were', 'will', 'would', 'should', 'could', 'also', 'such',
  'than', 'then', 'them', 'they', 'unit', 'notes', 'note', 'page',
  'chapter', 'semester', 'subject', 'explain', 'define', 'meaning', 'tell',
  'does', 'difference', 'between', 'example', 'examples',
]);

export function buildKeywordIndex(outDir = OUT) {
  const t0 = Date.now();
  let manifest = { docs: {} };
  try { manifest = JSON.parse(fs.readFileSync(path.join(outDir, 'manifest.json'), 'utf8')); } catch { /* none yet */ }
  const dirToFile = {};
  for (const [file, d] of Object.entries(manifest.docs || {})) {
    if (d && d.dir) dirToFile[d.dir] = file;
  }
  // Null-prototype map: words like "constructor"/"toString" exist on
  // Object.prototype and would otherwise collide with real terms.
  const terms = Object.create(null);
  if (!fs.existsSync(outDir)) {
    console.log('keywords.json: no generated/ dir yet — skipped');
    return;
  }
  for (const dir of fs.readdirSync(outDir)) {
    const sjPath = path.join(outDir, dir, 'search.json');
    if (!fs.existsSync(sjPath)) continue;
    const file = dirToFile[dir];
    if (!file) continue;
    let sj;
    try { sj = JSON.parse(fs.readFileSync(sjPath, 'utf8')); } catch { continue; }
    (sj.pages || []).forEach((text, i) => {
      const words = new Set(
        String(text || '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !KW_STOP.has(w)),
      );
      for (const w of words) {
        if (!terms[w]) terms[w] = new Map();
        terms[w].set(`${file}|${i + 1}`, { f: file, p: i + 1 });
      }
    });
  }
  const out = {};
  let kept = 0;
  for (const [term, map] of Object.entries(terms)) {
    if (map.size > 30) continue;
    out[term] = [...map.values()].slice(0, 10);
    kept += 1;
  }
  fs.writeFileSync(path.join(outDir, 'keywords.json'), JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), terms: out }));
  const bytes = fs.statSync(path.join(outDir, 'keywords.json')).size;
  console.log(`keywords.json: ${kept} terms, ${(bytes / 1024).toFixed(0)} KB (built in ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildKeywordIndex();
}
