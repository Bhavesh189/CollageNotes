// notesRag — grounded answers from the NOTES themselves (client-side RAG).
// The notes are rendered to page images at build time (Step 2) together with
// a per-page text index (public/generated/<dir>/search.json) and a compact
// keyword index (public/generated/keywords.json: term -> [{f, p}]) built by
// scripts/render-notes.mjs. This module searches that index, fetches only
// the matching pages' text, and quotes it verbatim with a source + page.
// It NEVER invents content: if the index has no match, the caller is told
// so and must say that honestly instead of guessing.
//
// The keyword index is fetched lazily (only when a content question is
// asked) and cached in memory. If it is absent (e.g. before the Step 2
// render lands), the module falls back to title-based candidates only.
import { searchAll } from './searchIndex';
import { extractEntities } from './botBrain';
import { semestersData } from '../data/notesData';

// Must match the tokenizer in scripts/render-notes.mjs (same stopwords,
// same min length) — otherwise terms will not line up with the index.
const STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'what', 'when',
  'where', 'which', 'there', 'their', 'about', 'into', 'your', 'have',
  'been', 'were', 'will', 'would', 'should', 'could', 'also', 'such',
  'than', 'then', 'them', 'they', 'them', 'unit', 'notes', 'note', 'page',
  'chapter', 'semester', 'subject', 'explain', 'define', 'meaning', 'tell',
  'about', 'does', 'does', 'difference', 'between', 'example', 'examples',
]);

export function tokenize(q) {
  return String(q || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !STOP.has(w))
    .slice(0, 8);
}

let manifestCache = null;
let keywordCache = null;

async function fetchJson(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function getManifest() {
  if (manifestCache) return manifestCache;
  manifestCache = await fetchJson('/generated/manifest.json');
  return manifestCache;
}

async function getKeywordIndex() {
  if (keywordCache) return keywordCache;
  keywordCache = await fetchJson('/generated/keywords.json');
  return keywordCache;
}

function dirForFile(manifest, file) {
  const entry = manifest && manifest.docs && manifest.docs[file];
  return entry ? entry.dir : null;
}

function scoreText(text, terms) {
  const lower = String(text || '').toLowerCase();
  let score = 0;
  for (const t of terms) {
    let i = lower.indexOf(t);
    while (i !== -1) {
      score += 1;
      i = lower.indexOf(t, i + t.length);
    }
  }
  return score;
}

function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

/** Drop the repeated lecture header (B.TECH / DEPARTMENT / SUBJECT lines)
// that sits at the top of most typed notes — it is not the answer. */
function stripHeader(text) {
  let t = cleanText(text);
  // Remove up to 2 leading sentences that look like a header block.
  for (let i = 0; i < 2; i++) {
    const m = t.match(/^[^.!?]{0,160}[.!?]\s*/);
    if (!m) break;
    const head = m[0];
    if (/B\.?\s*TECH|DEPARTMENT|SUBJECT|SEMESTER|SESSION|BRANCH|FACULTY/i.test(head) && head.length < 170) {
      t = t.slice(m[0].length);
    } else break;
  }
  return t;
}

/** Best ~360-char window around the first matched term. */
function excerptFor(text, terms) {
  const clean = stripHeader(text);
  const lower = clean.toLowerCase();
  let best = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (best === -1 || i < best)) best = i;
  }
  if (best === -1) return clean.slice(0, 360);
  const start = Math.max(0, best - 140);
  let excerpt = clean.slice(start, start + 380);
  // Trim to word boundaries.
  if (start > 0) excerpt = excerpt.replace(/^\S+\s/, '');
  excerpt = excerpt.replace(/\s+\S*$/, '');
  // Bold the matched terms (the chat renders **bold**).
  for (const t of terms) {
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    excerpt = excerpt.replace(re, '**$1**');
  }
  return excerpt;
}

/** Real note title from the data (not the file name) for source labels. */
function titleFromData(file) {
  for (const sem of Object.values(semestersData || {})) {
    for (const sub of sem.subjects || []) {
      for (const n of sub.notes || []) {
        if (n.file === file) return n.title;
        for (const sn of n.subnotes || []) {
          if (sn.file === file) return sn.title;
        }
      }
    }
  }
  return null;
}

function titleFor(file, searchResults) {
  const hit = (searchResults || []).find((r) => r.file === file);
  if (hit) return hit.title;
  return titleFromData(file) || file.split('/').pop().replace(/\.pdf$/i, '');
}

/**
 * Answer a content question from the notes. Returns:
 *  { status: 'ok', hits: [{file,title,subject,semesterName,page,excerpt,score}] }
 *  { status: 'no-index' }   — the keyword index is not deployed yet
 *  { status: 'no-match', candidates: [...] } — searched, nothing in the notes
 */
export async function answerFromNotes(question) {
  const terms = tokenize(question);
  if (terms.length === 0) return { status: 'no-match', candidates: [] };

  const entities = extractEntities(question);
  const titleResults = searchAll({
    query: entities.subject || terms.join(' '),
    semester: entities.semester || 'all',
    subject: 'all',
    type: 'note',
    sort: 'relevance',
  });
  const candidates = titleResults.slice(0, 5);

  const manifest = await getManifest();
  const kw = await getKeywordIndex();
  if (!manifest || !kw || !kw.terms) {
    return { status: 'no-index', candidates };
  }

  // Candidate (file, page) pairs from the keyword index, ranked by how
  // many distinct query terms hit that page.
  const pairScore = new Map(); // "file|page" -> { file, page, terms: Set }
  for (const t of terms) {
    const postings = kw.terms[t] || [];
    for (const post of postings) {
      const key = `${post.f}|${post.p}`;
      if (!pairScore.has(key)) pairScore.set(key, { file: post.f, page: post.p, terms: new Set() });
      pairScore.get(key).terms.add(t);
    }
  }
  const ranked = [...pairScore.values()]
    .sort((a, b) => b.terms.size - a.terms.size || a.file.localeCompare(b.file))
    .slice(0, 6);
  if (ranked.length === 0) return { status: 'no-match', candidates };

  // Fetch the matching docs' search.json (grouped by file) and score pages.
  const byFile = {};
  for (const r of ranked) (byFile[r.file] = byFile[r.file] || []).push(r.page);
  const hits = [];
  for (const [file, pages] of Object.entries(byFile)) {
    const dir = dirForFile(manifest, file);
    if (!dir) continue;
    const sj = await fetchJson(`/generated/${dir}/search.json`);
    if (!sj || !Array.isArray(sj.pages)) continue;
    for (const p of pages) {
      const text = sj.pages[p - 1];
      if (!text) continue;
      const score = scoreText(text, terms);
      if (score <= 0) continue;
      const meta = candidates.find((c) => c.file === file) || {};
      hits.push({
        file,
        title: meta.title || titleFor(file, candidates),
        subject: meta.subject || '',
        semesterName: meta.semesterName || '',
        type: 'note',
        page: p,
        score,
        excerpt: excerptFor(text, terms),
      });
    }
  }
  hits.sort((a, b) => b.score - a.score);
  if (hits.length === 0) return { status: 'no-match', candidates };
  return { status: 'ok', hits: hits.slice(0, 3), candidates };
}

/** Is this a "teach me" question (needs content) vs a lookup (needs a file)? */
export function isTopicQuestion(q) {
  return /\b(what is|what are|what does|explain|define|meaning of|how does|how do|why|difference between|derive|prove|formula for|tell me about)\b/i.test(q || '');
}
