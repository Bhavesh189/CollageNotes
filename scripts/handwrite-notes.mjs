// Standalone handwriting pass:  node scripts/handwrite-notes.mjs [--only <sub>] [--limit N] [--force]
// Converts typed Sem 2-3 notes to handwriting (see handwrite.mjs) and
// records hwPages in public/generated/manifest.json. Idempotent — docs
// whose hwSha matches and whose hw images exist are skipped.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runHandwritePass } from './handwrite.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'generated');
const manifestPath = path.join(OUT, 'manifest.json');

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const force = args.includes('--force');
const limit = args.includes('--limit') ? Math.max(1, parseInt(args[args.indexOf('--limit') + 1], 10) || 0) : 0;

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const writeManifest = () => {
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
};

// Write the manifest after every doc by patching the shared docs object
// through a Proxy-free trick: runHandwritePass mutates manifest.docs in
// place, so we write after each doc via the log callback wrapper.
const origLog = console.log;
let lastWrite = 0;
const result = await runHandwritePass(manifest.docs, {
  only,
  limit,
  force,
  log: (msg) => {
    origLog(msg);
    const now = Date.now();
    if (now - lastWrite > 5000) {
      writeManifest();
      lastWrite = now;
    }
  },
});
writeManifest();
console.log(`handwrite: ${result.convertedDocs} docs converted, ${result.convertedPages} pages handwritten (of ${result.targets} targets)`);
