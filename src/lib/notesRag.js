// notesRag — grounded answers from the NOTES themselves (client-side RAG).
// The notes are rendered to page images at build time (Step 2) together with
// a per-page text index (public/generated/<dir>/search.json) and a compact
// keyword index (public/generated/keywords.json: term -> [{f, p}]) built by
// scripts/build-keywords.mjs. This module searches that index, fetches only
// the matching pages' text, and quotes it verbatim with a source + page.
// It NEVER invents content: if the index has no good match, the caller is
// told so and must say that honestly instead of guessing.
//
// FREE (no-LLM) upgrade, 2026-11-23 — what changed and why:
//  - The keyword index DROPS terms appearing on >30 pages (build-keywords.mjs:
//    "too common to discriminate"). That drops exactly the words students ask
//    about — 'cycle', 'normal', 'form', 'database', 'operating', 'system',
//    'compiler'. So index-only retrieval fails Hinglish/common-word questions.
//    Fix: a fallback page-scan — title candidates (searchAll) -> fetch those
//    docs' search.json -> score EVERY page on the raw text. Same grounding,
//    much better recall.
//  - Query normalisation: Hinglish + English stopwords/question words are
//    stripped, plurals are stemmed, acronyms expand to full terms
//    (dbms -> database management systems), and misspelled terms are corrected
//    with Levenshtein <=2 against the index itself.
//  - Ranking is a composite score: concept-term coverage (a page must contain
//    the question's concept words — this kills false positives like answering
//    "quantum entanglement" with quantum-computing pages), capped term
//    frequency, title match, term proximity on the page, and a boost for the
//    semester the student is currently viewing (read from the URL hash).
//  - Question-type detection (definition / steps / example / difference /
//    formula / list) picks the lead sentence and excerpt window per type,
//    so answers are structured instead of a flat excerpt list.
import { searchAll } from './searchIndex';
import { extractEntities } from './botBrain';
import { semestersData } from '../data/notesData';

// Must match the tokenizer in scripts/build-keywords.mjs (same stopwords,
// same min length) — otherwise terms will not line up with the index.
const STOP = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'what', 'when',
  'where', 'which', 'there', 'their', 'about', 'into', 'your', 'have',
  'been', 'were', 'will', 'would', 'should', 'could', 'also', 'such',
  'than', 'then', 'them', 'they', 'them', 'unit', 'notes', 'note', 'page',
  'chapter', 'semester', 'subject', 'explain', 'define', 'meaning', 'tell',
  'about', 'does', 'does', 'difference', 'between', 'example', 'examples',
]);

// Hinglish / Roman-Hindi filler + question words (length >= 4 — shorter ones
// are already dropped by tokenize's length filter).
const HI_STOP = new Set([
  'hain', 'hota', 'hoti', 'hote', 'kaise', 'kyun', 'kahan', 'batao',
  'bataiye', 'bataye', 'samjhao', 'samjhaiye', 'samjha', 'matlab', 'arth',
  'antar', 'udaharan', 'udahaaran', 'wala', 'wali', 'wale', 'karo', 'karna',
  'chahiye', 'liye', 'baare', 'mein', 'kaisa', 'kaisi', 'kiske', 'kiski',
  'kaunsa', 'kaunsi', 'hoga', 'hogi', 'honge', 'raha', 'rahi', 'rahe',
  'jata', 'jati', 'karke', 'bhi', 'toh', 'kuch', 'koi', 'sab', 'yeh',
]);

// Small curated acronym/concept map — derived from the real subject list in
// notesData.js + standard CS expansions. Acronyms expand to FULL terms so
// "OS kya hai" and "DBMS me normal form" can match page text (the index
// itself drops 'operating'/'system'/'database' as too common).
const SYNONYMS = {
  dbms: ['database', 'management', 'systems'],
  rdbms: ['database', 'management', 'systems'],
  os: ['operating', 'systems'],
  cn: ['computer', 'networks'],
  coa: ['computer', 'organisation', 'architecture'],
  toc: ['theory', 'computation'],
  daa: ['design', 'analysis', 'algorithms'],
  dsa: ['data', 'structures', 'algorithms'],
  oop: ['object', 'oriented', 'programming'],
  de: ['digital', 'electronics'],
  se: ['software', 'engineering'],
  aem: ['advanced', 'engineering', 'mathematics'],
  dm: ['discrete', 'mathematics'],
  ml: ['machine', 'learning'],
  ai: ['artificial', 'intelligence'],
  db: ['database'],
  sql: ['structured', 'query', 'language'],
  cpu: ['central', 'processing', 'unit'],
  ram: ['random', 'access', 'memory'],
  rom: ['read', 'only', 'memory'],
  api: ['application', 'programming', 'interface'],
  url: ['uniform', 'resource', 'locator'],
  http: ['hypertext', 'transfer', 'protocol'],
  tcp: ['transmission', 'control', 'protocol'],
  udp: ['user', 'datagram', 'protocol'],
  ip: ['internet', 'protocol'],
  normalisation: ['normalization'],
  normalization: ['normalisation'],
  organisation: ['organization'],
  organization: ['organisation'],
};

// Filler verbs that add no meaning to a question ("give an example of ...").
// Stripped query-side only — the index tokenizer is untouched.
const QUERY_FILLER = new Set([
  'give', 'gives', 'show', 'shows', 'find', 'gets', 'getting', 'want',
  'wants', 'need', 'needs', 'please', 'kindly', 'help', 'tell', 'say',
]);

// Famous concept -> subject routing hints. ONLY used to pick which notes to
// search when the question names no subject ("give an example of normal
// form" -> DBMS notes). The answer still comes from the notes themselves;
// a wrong hint can only narrow the search, never invent content.
const CONCEPT_SUBJECT = [
  ['normal form', 'database management systems'],
  ['normalisation', 'database management systems'],
  ['normalization', 'database management systems'],
  ['carnot', 'mechanical engineering'],
  ['compiler', 'compiler design'],
  ['deadlock', 'operating systems'],
  ['binary search', 'data structures and algorithms'],
  ['linked list', 'data structures and algorithms'],
  ['demorgan', 'digital electronics'],
  ['boolean', 'digital electronics'],
  ['fourier', 'advanced engineering mathematics'],
  ['laplace', 'advanced engineering mathematics'],
];

export function tokenize(q) {
  return String(q || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !STOP.has(w))
    .slice(0, 8);
}

/** Very small stemmer: plurals only. Guards keep 'analysis'/'physics'/
// 'class' intact (their trailing 's' is not a plural). */
function stem(w) {
  if (!w || w.length < 5) return w;
  if (/(sis|us|is)$/.test(w)) return w;
  if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (/(ches|shes|sses|xes|zes)$/.test(w)) return w.slice(0, -2);
  if (w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

/** Edit distance, early-exit when the length gap already exceeds 1. */
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 1) return 99;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/** Damerau-Levenshtein (optimal string alignment): a transposition counts
 * as ONE edit, so "cycel" -> "cycle" is distance 1 while "cycle" ->
 * "circle" is 2. Used for spelling correction with max distance 1. */
function damerau(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 1) return 99;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[m][n];
}

// Frequent concept words the keyword index DROPS (build-keywords.mjs drops
// terms appearing on >30 pages). Derived from the corpus itself: words that
// appear 40+ times in the notes' page text but are absent from
// keywords.json. Used ONLY as a spelling-correction vocabulary — a
// misspelled query term within Damerau distance 1 of one of these words
// (e.g. "cycel" -> "cycle") corrects to it. The corrected word must still
// be found on a real notes page by the coverage rule, so this can only
// route the search, never invent an answer.
const COMMON_WORDS = new Set([
  'cycle', 'cycles', 'system', 'systems', 'form', 'forms', 'normal',
  'normalization', 'database', 'databases', 'operating', 'compiler',
  'engine', 'process', 'processes', 'data', 'management', 'algorithm',
  'algorithms', 'network', 'networks', 'memory', 'language', 'program',
  'programs', 'function', 'functions', 'method', 'methods', 'class',
  'object', 'objects', 'value', 'values', 'design', 'analysis', 'structure',
  'structures', 'table', 'tables', 'types', 'theory', 'diagram', 'diagrams',
  'figure', 'figures', 'application', 'applications', 'software', 'hardware',
  'device', 'devices', 'control', 'power', 'energy', 'circuit', 'circuits',
  'signal', 'signals', 'relational', 'binary', 'boolean', 'stack',
  'central', 'random', 'access', 'transmission', 'protocol', 'protocols',
  'user', 'datagram', 'internet', 'uniform', 'resource', 'locator',
  'hypertext', 'transfer', 'structured', 'query', 'artificial',
  'intelligence', 'machine', 'learning', 'discrete', 'mathematics',
  'digital', 'electronics', 'computer', 'computers', 'architecture',
  'organisation', 'organization', 'computation', 'formula', 'formal',
  'example', 'examples', 'definition', 'concept', 'concepts', 'problem',
  'problems', 'solution', 'solutions', 'development', 'implementation',
]);

const fuzzyCache = new Map();
/** Closest index term at Damerau distance <= 1 (only for words >= 5 chars).
 * The index contains OCR fragments ('ycle', 'ditabase', 'gmanagement'),
 * so a plain distance-2 search "corrects" real words into junk. Guards:
 * distance must be 1, the correction must have >= 2 postings (junk
 * fragments almost always have exactly 1), and among ties the most-posted
 * term wins (a real word is more common than a fragment). If the index has
 * no candidate, fall back to COMMON_WORDS (frequent words the index drops
 * as "too common" — 'cycle', 'system', 'form'). Returns null when the word
 * is already in the index or nothing qualifies. */
function fuzzyCorrect(term, index) {
  if (!term || term.length < 5 || !index) return null;
  if (index[term]) return null; // already exact
  if (fuzzyCache.has(term)) return fuzzyCache.get(term);
  let best = null;
  let bestPostings = -1;
  for (const key of Object.keys(index)) {
    if (Math.abs(key.length - term.length) > 1) continue;
    if (damerau(term, key) !== 1) continue;
    const postings = (index[key] || []).length;
    if (postings < 2) continue;
    if (postings > bestPostings) { bestPostings = postings; best = key; }
  }
  if (!best) {
    for (const w of COMMON_WORDS) {
      if (Math.abs(w.length - term.length) > 1) continue;
      if (damerau(term, w) === 1) { best = w; break; }
    }
  }
  fuzzyCache.set(term, best);
  return best;
}

/** Question type from keywords (English + Hinglish). Default: definition. */
export function detectQuestionType(q) {
  const t = String(q || '').toLowerCase();
  if (/\b(difference|antar|versus|compare)\b/.test(t) || /\bvs\.?\b/.test(t) || /\bbetween\b.*\band\b/.test(t)) return 'difference';
  if (/\b(formula|sutra|derive|derivation|equation)\b/.test(t)) return 'formula';
  if (/\b(example|udaharan|udahaaran|illustrat)\b/.test(t)) return 'example';
  if (/\b(how|kaise|steps?|process|procedure|method|working|kaam karta|kaise kare)\b/.test(t)) return 'steps';
  if (/\b(types?|kinds?|list|classif|kitne prakar)\b/.test(t)) return 'list';
  return 'definition';
}

/** "difference between X and Y" / "X vs Y" / "X aur Y me antar" -> sides. */
export function parseDifference(q) {
  const raw = String(q || '').trim();
  let m = raw.match(/difference\s+between\s+(.+?)\s+and\s+(.+)/i)
    || raw.match(/(.+?)\s+vs\.?\s+(.+)/i)
    || raw.match(/(.+?)\s+aur\s+(.+?)\s+mein?\s+antar/i)
    || raw.match(/(.+?)\s+and\s+(.+?)\s+mein?\s+(difference|antar)/i);
  if (!m) return null;
  const clean = (s) => s.replace(/\?+$/, '').replace(/^(what is|what are|explain|tell me about|kya hai)\s+/i, '').trim();
  const a = clean(m[1]);
  const b = clean(m[2]);
  if (!a || !b) return null;
  return [{ label: a, text: a }, { label: b, text: b }];
}

/**
 * Normalise a question into retrieval terms.
 *  conceptTerms: content words that a good page MUST contain (coverage rule)
 *  subjectTerms: acronym/subject expansions — boost only, never required
 *  indexTerms: union, for the keyword-index lookup
 *  subject: subject-name fragment from entity extraction, if any
 */
export function normaliseQuery(q) {
  const raw = String(q || '');
  const lower = raw.toLowerCase();
  const type = detectQuestionType(raw);
  const entities = extractEntities(raw);
  let subject = entities.subject || null;

  const words = lower.split(/[^a-z0-9]+/).filter(Boolean);
  const subjectTerms = [];
  for (const w of words) {
    if (SYNONYMS[w]) subjectTerms.push(...SYNONYMS[w]);
  }
  if (subject) {
    subjectTerms.push(...subject.split(/[^a-z0-9]+/).filter((w) => w.length >= 4));
  }
  // Concept routing: a famous concept phrase names its subject even when
  // the question doesn't ("give an example of normal form" -> DBMS).
  if (!subject) {
    for (const [phrase, subj] of CONCEPT_SUBJECT) {
      if (lower.includes(phrase)) { subject = subj; break; }
    }
    if (subject) {
      subjectTerms.push(...subject.split(/[^a-z0-9]+/).filter((w) => w.length >= 4));
    }
  }

  // Concept terms: tokenize, drop Hinglish fillers + filler verbs, drop
  // SHORT acronyms (they already expanded into subjectTerms — 'dbms', 'os'),
  // stem, dedupe. Long SYNONYMS keys are real concept words ('normalisation'
  // <-> 'normalization') and stay concept terms.
  const conceptTerms = [
    ...new Set(
      tokenize(raw)
        .filter((w) => !HI_STOP.has(w) && !(SYNONYMS[w] && w.length <= 5) && !QUERY_FILLER.has(w))
        .map(stem),
    ),
  ];
  const subjectTermsStemmed = [...new Set(subjectTerms.map(stem))];
  const indexTerms = [...new Set([...conceptTerms, ...subjectTermsStemmed])];
  return {
    type,
    subject,
    conceptTerms,
    subjectTerms: subjectTermsStemmed,
    indexTerms,
    scanTerms: indexTerms,
    raw,
  };
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

/** Word-boundary regex for a term (matches the term or its plural). */
function termRegex(t) {
  const base = stem(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${base}(?:s|es)?\\b`, 'i');
}

/** Capped per-term occurrence count on a page. Concept terms count up to 5
 * each; subject terms only up to 2 each — they are context, not the
 * question, and must not let a page that merely mentions "database" a lot
 * outrank the page that actually defines normal forms. Exception: for a
 * subject-only question ("OS kya hai") the subject terms ARE the question,
 * so they count up to 5 there. */
function countMatches(text, conceptTerms, subjectTerms) {
  let total = 0;
  for (const t of conceptTerms || []) {
    const all = String(text || '').match(new RegExp(termRegex(t).source, 'gi'));
    total += Math.min(all ? all.length : 0, 5);
  }
  const subCap = (conceptTerms || []).length === 0 ? 5 : 2;
  for (const t of subjectTerms || []) {
    const all = String(text || '').match(new RegExp(termRegex(t).source, 'gi'));
    total += Math.min(all ? all.length : 0, subCap);
  }
  return total;
}

/** How many of the concept terms appear on this page (word-boundary). */
function conceptCoverage(text, conceptTerms) {
  let n = 0;
  for (const t of conceptTerms) {
    if (termRegex(t).test(text || '')) n += 1;
  }
  return n;
}

/** Terms a good page must contain: all of them when there are 1–2, at
 * least two-thirds when there are more (a 5-word question should not fail
 * because one filler word is missing). Zero concept terms (subject-only
 * question like "OS kya hai") -> 0, the subject terms decide instead. */
function requiredCoverage(nq) {
  const n = nq.conceptTerms.length;
  if (n === 0) return 0;
  if (n <= 2) return n;
  return Math.ceil((n * 2) / 3);
}

/** Smallest char span covering one occurrence of each present term — a
 * tight cluster means the page is ABOUT the topic, not just mentioning it. */
function proximitySpan(text, terms) {
  const positions = [];
  for (const t of terms) {
    const m = termRegex(t).exec(text || '');
    if (m) positions.push(m.index);
  }
  if (positions.length < 2) return null;
  return Math.max(...positions) - Math.min(...positions);
}

function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

/** A sentence that belongs to the notes' running header, not the answer. */
function isHeaderSentence(s) {
  return /B\.?\s*TECH|DEPARTMENT|SUBJECT|SEMESTER|SESSION|BRANCH|FACULTY|SYLLABUS|LECTURE|UNIT\s*-?\s*\d|B\.?TECH/i.test(s || '');
}

/** Drop the repeated lecture header (B.TECH / DEPARTMENT / SUBJECT lines)
 * that sits at the top of most typed notes — it is not the answer. Drops
 * leading sentences while they look like header fragments or are tiny
 * (the "B." / "TECH." / "I SEM." fragments split on periods). */
function stripHeader(text) {
  let t = cleanText(text);
  for (let i = 0; i < 6; i++) {
    const m = t.match(/^[^.!?]{0,200}[.!?]\s*/);
    if (!m) break;
    const head = m[0];
    if (isHeaderSentence(head) || head.trim().length < 25) {
      const rest = t.slice(m[0].length);
      // Split decimal: a head ending in digit+period whose remainder starts
      // with "digit + space + letter" split a number ("…Cycle 2." + "1
      // CARNOT…" is really "2.1"). For a real header, drop the head AND the
      // orphaned digit; for a short figure label ("Figure 2.") keep it whole
      // instead so the excerpt reads "Figure 2.1 shows…".
      if (/\d\.\s*$/.test(head) && /^\d+\s+[A-Za-z]/.test(rest)) {
        if (isHeaderSentence(head)) {
          t = rest.replace(/^\d+\s+/, '');
        } else break;
      } else {
        t = rest;
      }
    } else break;
  }
  return t;
}

/** Type-aware excerpt: a ~700-char main window around the best anchor on
 * the page + a second ~500-char window from a later occurrence (the "show
 * more" expand). Anchor: for 'example' the word "example", for 'formula'
 * an '=' line, for 'steps' a step word — else the first matched term AFTER
 * the header. Returns { main, more }. */
function excerptFor(text, terms, type, conceptTerms) {
  const clean = stripHeader(text);
  const lower = clean.toLowerCase();
  // Word-boundary matching throughout: a substring search would anchor on
  // "form" inside "information" and bold it as "in**form**ation".
  const wordRe = (t) => {
    const base = stem(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${base}(?:s|es)?\\b`, 'gi');
  };
  const firstPos = (from, termList) => {
    let best = -1;
    for (const t of termList) {
      const re = wordRe(t);
      re.lastIndex = from;
      const m = re.exec(lower);
      if (m && (best === -1 || m.index < best)) best = m.index;
    }
    return best;
  };
  // Anchor on a CONCEPT term first ('normal'/'form'), not a subject word
  // ('database' occurs pages before the Normal Form table and would pull
  // the window onto the anomaly examples instead of the definition).
  const anchorTerms = (conceptTerms && conceptTerms.length > 0) ? conceptTerms : terms;
  const bold = (s) => {
    let out = s;
    for (const t of terms) {
      const base = stem(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      out = out.replace(new RegExp(`(\\b${base}(?:s|es)?\\b)`, 'gi'), '**$1**');
    }
    return out;
  };
  const windowAt = (start, len) => {
    // Back up to the previous sentence boundary so excerpts start with a
    // whole sentence ("Figure 2.1 shows..." not "1 shows...").
    if (start > 0) {
      const winStart = Math.max(0, start - 240);
      const before = clean.slice(winStart, start);
      // A sentence ends at ". " + capital letter — NOT at a decimal point
      // ("Figure 2.1 shows..." must not be cut after "Figure 2.").
      const ends = [...before.matchAll(/[.!?]\s+(?=[A-Z])/g)];
      if (ends.length > 0) {
        const last = ends[ends.length - 1];
        start = winStart + last.index + last[0].length;
      }
    }
    let excerpt = clean.slice(start, start + len);
    if (start > 0) excerpt = excerpt.replace(/^\S+\s/, '');
    excerpt = excerpt.replace(/\s+\S*$/, '');
    return bold(excerpt);
  };
  // Type-specific anchor first.
  let anchor = -1;
  if (type === 'example') {
    const i = lower.search(/\b(example|e\.g\.|for example|udaharan)\b/);
    if (i !== -1) anchor = i;
  } else if (type === 'formula') {
    const i = lower.search(/formula|=|where\b.{0,40}=/);
    if (i !== -1) anchor = i;
  } else if (type === 'steps') {
    const i = lower.search(/\bstep\s*\d|first(ly)?\b|then\b|procedure\b/);
    if (i !== -1) anchor = i;
  }
  if (anchor === -1) {
    anchor = firstPos(0, anchorTerms);
    if (anchor === -1) anchor = firstPos(0, terms);
  }
  if (anchor === -1) return { main: bold(clean.slice(0, 700)), more: null };
  const main = windowAt(Math.max(0, anchor - 160), 720);
  // Second window: the next matched occurrence at least 720 chars past the
  // first window's start, so "show more" adds genuinely new text.
  const second = firstPos(anchor + 720, terms);
  const more = second !== -1 ? windowAt(Math.max(0, second - 120), 520) : null;
  return { main, more };
}

/** Lead sentence for the answer, per question type — the first sentence
 * that contains a query term AND is not a header line. Definition questions
 * prefer an "X is/are ..." sentence. Falls back to the first full sentence. */
function synthesisFor(excerpt, terms, type) {
  const plain = String(excerpt || '')
    .replace(/\*\*/g, '')
    // Don't split sentences on decimal points ("2.1" is not a sentence end).
    .replace(/(\d)\.(\d)/g, '$1<DECIMAL>$2');
  const sentences = (plain.match(/[^.!?]{20,220}[.!?]/g) || [])
    .map((s) => s.trim().replace(/<DECIMAL>/g, '.'))
    // Skip header lines AND cut-off fragments ("1 shows ..." — the tail of
    // a "Figure 2.1 ..." heading split by the excerpt window — and sentences
    // starting lowercase, which are continuations, not sentence starts).
    .filter((s) => !isHeaderSentence(s) && !/^\d+\s/.test(s) && !/^[A-Z]?\d{1,2}\b/.test(s) && !/^[a-z]/.test(s));
  const lower = (s) => s.toLowerCase();
  // Word-boundary term test (not substring: 'form' must not match
  // 'information' when picking the lead sentence).
  const hasTerm = (s, t) => {
    const base = stem(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${base}(?:s|es)?\\b`, 'i').test(s || '');
  };
  const withTerm = (list) => list.find((s) => (terms || []).some((t) => hasTerm(s, t)));
  if (type === 'definition') {
    const def = sentences.find(
      (s) => /\b(is|are|refers to|is defined as|means)\b/i.test(s) && (terms || []).some((t) => hasTerm(s, t)),
    );
    if (def) return def;
  }
  if (type === 'example') {
    const ex = sentences.find((s) => /\bexample\b/i.test(s) && (terms || []).some((t) => hasTerm(s, t)));
    if (ex) return ex;
  }
  const hit = withTerm(sentences);
  if (hit) return hit;
  return sentences[0] ? sentences[0] : plain.slice(0, 200).trim();
}

// Full note meta (title + subject + semester) from the data, cached.
let metaCache = null;
function metaFor(file) {
  if (!metaCache) {
    metaCache = new Map();
    for (const sem of Object.values(semestersData || {})) {
      for (const sub of sem.subjects || []) {
        for (const n of sub.notes || []) {
          const put = (f, title) => {
            if (f) metaCache.set(f, { title, subject: sub.name, semesterName: sem.name });
          };
          put(n.file, n.title);
          for (const sn of n.subnotes || []) put(sn.file, sn.title);
        }
      }
    }
  }
  return metaCache.get(file) || null;
}

function titleFor(file, searchResults) {
  const hit = (searchResults || []).find((r) => r.file === file);
  if (hit) return hit.title;
  return (metaFor(file) || {}).title || file.split('/').pop().replace(/\.pdf$/i, '');
}

/**
 * Composite page score. Returns null when the page fails the coverage gate
 * (it does not contain the question's concept words — answering from it
 * would be a loosely-related false positive). Otherwise:
 *   coverage x10 + capped term frequency + title boost + context boost
 *   + proximity bonus (tight cluster = page is ABOUT the topic).
 */
function scorePage(text, meta, nq, ctx) {
  const cov = conceptCoverage(text, nq.conceptTerms);
  const required = requiredCoverage(nq);
  if (cov < required) return null;
  // Subject-only question (no concept terms): the page must mention the
  // subject at least once, otherwise it is the wrong note entirely.
  if (nq.conceptTerms.length === 0 && countMatches(text, [], nq.subjectTerms) === 0) return null;
  let score = cov * 10;
  score += countMatches(text, nq.conceptTerms, nq.subjectTerms);
  const titleLower = String(meta.title || '').toLowerCase();
  if (nq.scanTerms.some((t) => titleLower.includes(t))) score += 5;
  // Context boost: the semester the student is viewing, and the subject.
  if (ctx.semester && meta.semesterName && meta.semesterName.toLowerCase().includes(ctx.semester.replace('sem', 'semester '))) score += 3;
  if (ctx.subject && meta.subject && meta.subject.toLowerCase().includes(ctx.subject)) score += 3;
  const span = proximitySpan(text, nq.scanTerms);
  if (span != null) score += Math.max(0, Math.min(5, (4000 - span) / 800));
  return { score: Math.round(score * 10) / 10, cov };
}

/** Fetch one doc's search.json and score the given pages (or all pages
 * when `pages` is null — the fallback scan). Returns scored hit objects. */
async function scoreDocPages(manifest, file, pages, nq, ctx, candidates) {
  const dir = dirForFile(manifest, file);
  if (!dir) return [];
  const meta = metaFor(file) || {};
  // Subject grounding: when the question names a subject, only that
  // subject's notes may answer it — a "management" mention in a Software
  // Engineering note is not a DBMS answer.
  if (ctx.subject && meta.subject && !meta.subject.toLowerCase().includes(ctx.subject.toLowerCase())) return [];
  const sj = await fetchJson(`/generated/${dir}/search.json`);
  if (!sj || !Array.isArray(sj.pages)) return [];
  const out = [];
  const pageList = pages || sj.pages.map((_, i) => i + 1);
  for (const p of pageList) {
    if (ctx.exclude && ctx.exclude.has(`${file}|${p}`)) continue;
    const text = sj.pages[p - 1];
    if (!text) continue;
    const scored = scorePage(text, meta, nq, ctx);
    if (!scored) continue;
    const ex = excerptFor(text, nq.scanTerms, nq.type, nq.conceptTerms);
    // Definition questions: a page that literally defines the term
    // ("Normalization is a database design technique ...") outranks a page
    // that merely mentions it a lot (a SQL listing full of "form").
    let boost = 0;
    if (nq.type === 'definition') {
      const plainEx = ex.main.replace(/\*\*/g, '');
      if (/\b(is|are|refers to|is defined as|means)\b/i.test(plainEx)
        && nq.scanTerms.some((t) => plainEx.toLowerCase().includes(t))) {
        boost = 3;
      }
    }
    const cand = (candidates || []).find((c) => c.file === file) || {};
    out.push({
      file,
      title: cand.title || meta.title || titleFor(file, candidates),
      subject: meta.subject || cand.subject || '',
      semesterName: meta.semesterName || cand.semesterName || '',
      type: 'note',
      page: p,
      score: scored.score + boost,
      coverage: scored.cov,
      excerpt: ex.main,
      excerptMore: ex.more,
    });
  }
  return out;
}

/** Fallback scan: title candidates for the subject/topic -> fetch those
 * docs' search.json -> score EVERY page on the raw text. This is what
 * rescues questions whose words the keyword index dropped as "too common"
 * ('cycle', 'normal', 'form', 'database', 'operating', 'system', ...).
 * Capped at 4 docs so a question never fetches half the library. */
async function fallbackScan(manifest, nq, ctx, candidates) {
  const titleQ = nq.subject || nq.indexTerms.join(' ');
  const titleCands = searchAll({
    query: titleQ,
    // Semester is a RANKING boost (scorePage), never a hard filter here:
    // a "sem4" student asking about Carnot (a sem2 topic) must still get
    // the sem2 answer. Filtering candidates by semester silently drops it.
    semester: 'all',
    subject: 'all',
    type: 'note',
    sort: 'relevance',
  }).slice(0, 8);
  // Subject-matching docs first — a subject-filtered search can still
  // return other subjects' notes first on tie scores (all titles are
  // generic "Unit N"); the subject's own notes must be scanned first.
  const subFrag = (nq.subject || '').toLowerCase();
  if (subFrag) {
    titleCands.sort((a, b) => {
      const am = String(a.subject || '').toLowerCase().includes(subFrag) ? 1 : 0;
      const bm = String(b.subject || '').toLowerCase().includes(subFrag) ? 1 : 0;
      return bm - am;
    });
  }
  const seen = new Set();
  const files = [];
  for (const c of [...titleCands.slice(0, 4), ...(candidates || [])]) {
    if (c && c.file && !seen.has(c.file)) { seen.add(c.file); files.push(c.file); }
    if (files.length >= 4) break;
  }
  let hits = [];
  for (const file of files) {
    const scored = await scoreDocPages(manifest, file, null, nq, ctx, candidates);
    hits = hits.concat(scored);
  }
  hits.sort(byRank);
  return hits.slice(0, 4);
}

/** Rank order: composite score first; ties break toward earlier pages
 * (intro/definition pages come first in a note) then file name. */
function byRank(a, b) {
  return b.score - a.score || a.page - b.page || String(a.file).localeCompare(String(b.file));
}

/**
 * One retrieval pass for a normalised query. Index path first (fast),
 * fallback page-scan when it returns too little. `env` carries the
 * already-loaded manifest + keyword index + title candidates.
 */
async function retrieveOnce(nq, ctx, env) {
  const { manifest, kw, candidates } = env;
  let hits = [];
  if (manifest && kw && kw.terms) {
    // Candidate (file, page) pairs from the keyword index, ranked by how
    // many distinct query terms hit that page.
    const pairScore = new Map(); // "file|page" -> { file, page, terms: Set }
    for (const t of nq.indexTerms) {
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
    const byFile = {};
    for (const r of ranked) (byFile[r.file] = byFile[r.file] || []).push(r.page);
    for (const [file, pages] of Object.entries(byFile)) {
      const scored = await scoreDocPages(manifest, file, pages, nq, ctx, candidates);
      hits = hits.concat(scored);
    }
    hits.sort(byRank);
  }

  // Fallback when the index path found too little (its dropped terms are
  // exactly the common words students ask about).
  if (hits.length < 3 && manifest) {
    const extra = await fallbackScan(manifest, nq, ctx, candidates);
    const seen = new Set(hits.map((h) => `${h.file}|${h.page}`));
    for (const h of extra) {
      if (!seen.has(`${h.file}|${h.page}`)) { hits.push(h); seen.add(`${h.file}|${h.page}`); }
    }
    hits.sort(byRank);
  }
  return hits.slice(0, 4);
}

/**
 * Retrieve the best pages for one normalised query. Spelling correction is
 * a LAST RESORT only: the first pass runs uncorrected, because the index
 * contains OCR fragments and a distance-2 "correction" turns real words
 * into junk ('cycle' -> 'ycle', 'normal' -> 'noromal'). Only when the
 * uncorrected pass finds nothing do we retry with corrected terms — and
 * then the correction also applies to scoring, so "carnot cycel" covers
 * 'cycle', not the misspelled 'cycel'.
 */
async function retrieveFor(nq, ctx) {
  const manifest = await getManifest();
  const kw = await getKeywordIndex();
  const candidates = searchAll({
    query: nq.subject || nq.indexTerms.join(' '),
    // Semester is a RANKING boost only (see fallbackScan) — never filter
    // candidates by it, or cross-semester questions silently no-match.
    semester: 'all',
    subject: 'all',
    type: 'note',
    sort: 'relevance',
  }).slice(0, 5);
  const env = { manifest, kw, candidates };

  const hits = await retrieveOnce(nq, ctx, env);
  if (hits.length > 0) return { hits, candidates, corrected: [] };

  const corrected = [];
  if (kw && kw.terms) {
    for (const t of nq.indexTerms) {
      if (kw.terms[t]) continue;
      const fix = fuzzyCorrect(t, kw.terms);
      if (fix) corrected.push({ from: t, to: fix });
    }
  }
  if (corrected.length === 0) return { hits, candidates, corrected: [] };
  const fixedSet = new Map(corrected.map((c) => [c.from, c.to]));
  const nqEff = {
    ...nq,
    conceptTerms: nq.conceptTerms.map((t) => fixedSet.get(t) || t),
    scanTerms: nq.scanTerms.map((t) => fixedSet.get(t) || t),
    indexTerms: nq.indexTerms.map((t) => fixedSet.get(t) || t),
  };
  const hits2 = await retrieveOnce(nqEff, ctx, env);
  return { hits: hits2, candidates, corrected };
}

/**
 * Answer a content question from the notes. Returns:
 *  { status: 'ok', hits: [{file,title,subject,semesterName,page,excerpt,score}], synthesis, followUps, questionType, topic, corrected }
 *  { status: 'no-index' }   — the keyword index is not deployed yet
 *  { status: 'no-match', candidates: [...] } — searched, nothing in the notes
 * opts: { semester, exclude: Set<"file|page"> } — exclude pages already
 * shown (follow-ups ask for the NEXT best pages, not the same ones).
 */
export async function answerFromNotes(question, opts = {}) {
  const ctx = {
    semester: opts.semester || null,
    subject: null,
    exclude: opts.exclude || null,
  };
  const sides = parseDifference(question);
  if (sides) {
    // Two-sided comparison: retrieve each side separately, one hit each
    // (two max) so the answer is genuinely A vs B, not one mixed list.
    // A side's concept terms are its own words expanded (an acronym side
    // expands: DBMS -> database/management/systems). RDBMS adds the word
    // that distinguishes it — 'relational' — because the notes never write
    // the literal string "rdbms" (0 pages contain it).
    const SIDE_DISTINGUISH = { rdbms: ['relational'] };
    const perSide = [];
    for (const side of sides) {
      const nq = normaliseQuery(side.text);
      const sideWords = side.text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      const extra = [];
      for (const w of sideWords) {
        if (SYNONYMS[w]) extra.push(...SYNONYMS[w]);
        if (SIDE_DISTINGUISH[w]) extra.push(...SIDE_DISTINGUISH[w]);
      }
      const sideNq = extra.length > 0
        ? {
          ...nq,
          conceptTerms: [...new Set([...nq.conceptTerms, ...extra.map(stem)])],
          scanTerms: [...new Set([...nq.scanTerms, ...extra.map(stem)])],
        }
        : nq;
      const sideCtx = { ...ctx, subject: nq.subject };
      const res = await retrieveFor(sideNq, sideCtx);
      perSide.push({ label: side.label, hits: res.hits.slice(0, 2), nq: sideNq });
    }
    if (perSide[0].hits.length === 0 || perSide[1].hits.length === 0) {
      return { status: 'no-match', candidates: [], questionType: 'difference' };
    }
    const hits = [];
    const seenPages = new Set();
    for (const [i, s] of perSide.entries()) {
      for (const h of s.hits) {
        const key = `${h.file}|${h.page}`;
        if (seenPages.has(key)) continue;
        seenPages.add(key);
        hits.push({ ...h, side: s.label, sideIndex: i });
      }
    }
    const topic = `${sides[0].label} vs ${sides[1].label}`;
    const synthTerms0 = perSide[0].nq.conceptTerms.length > 0 ? perSide[0].nq.conceptTerms : perSide[0].nq.scanTerms;
    const synthesis = synthesisFor(perSide[0].hits[0].excerpt, synthTerms0, 'definition');
    return {
      status: 'ok',
      hits: hits.slice(0, 4),
      candidates: [],
      synthesis,
      followUps: [`Tell me more about ${sides[0].label}`, `Tell me more about ${sides[1].label}`],
      questionType: 'difference',
      topic,
      difference: perSide.map((s) => ({ label: s.label, excerpt: s.hits[0].excerpt })),
    };
  }

  const nq = normaliseQuery(question);
  ctx.subject = nq.subject;
  if (nq.conceptTerms.length === 0 && nq.subjectTerms.length === 0) {
    return { status: 'no-match', candidates: [], questionType: nq.type };
  }
  const { hits, candidates, corrected } = await retrieveFor(nq, ctx);
  if (hits.length === 0) return { status: 'no-match', candidates, questionType: nq.type, corrected };
  const top = hits.slice(0, 4);
  // Follow-ups: distinct next topics (never the same "Unit 2" three times),
  // plus type variants for the same topic when there is only one.
  const seenTopics = new Set();
  const followUps = [];
  for (const h of top) {
    const key = `${h.subject} ${h.title}`;
    if (seenTopics.has(key)) continue;
    seenTopics.add(key);
    followUps.push(`${h.subject ? `${h.subject} — ` : ''}Tell me more about ${h.title}`);
    if (followUps.length >= 2) break;
  }
  if (followUps.length === 0) followUps.push('Show an example');
  if (followUps.length < 2) followUps.push(nq.type === 'example' ? 'Show the steps' : 'Show an example');
  // The follow-up topic is the CONCEPT ('carnot cycle'), not the subject
  // ('mechanical engineering') — "aur batao" must re-ask the concept.
  const topic = nq.conceptTerms.join(' ') || nq.subject || '';
  // Synthesis matches CONCEPT terms, not subject terms — a subject word
  // like 'data' inside a SQL listing must not pick a code fragment as the
  // lead sentence. Subject-only questions fall back to the subject terms.
  const synthTerms = nq.conceptTerms.length > 0 ? nq.conceptTerms : nq.scanTerms;
  return {
    status: 'ok',
    hits: top,
    candidates,
    synthesis: synthesisFor(top[0].excerpt, synthTerms, nq.type),
    followUps: followUps.slice(0, 3),
    questionType: nq.type,
    topic,
    corrected,
  };
}

/** Is this a "teach me" question (needs content) vs a lookup (needs a file)? */
export function isTopicQuestion(q) {
  return /\b(what is|what are|what does|explain|define|meaning of|how does|how do|why|difference between|derive|prove|formula for|tell me about|kya hai|kya hota|kaise|samjhao|matlab|antar|kyu|kyun|batao)\b/i.test(q || '');
}

/** Follow-up phrasing ("aur batao", "iska example do", ...) — resolved
 * against the previous topic instead of searched from scratch. */
export function isFollowUp(q) {
  return /^\s*(aur\s+(batao|batao na|detail|kuch|bhi)|iska\s+example|example\s+do|uske\s+baad|aur\s+kya|more|tell\s+me\s+more|detail\s+me|iske\s+baare\s+me\s+aur|aur\s+batao|short\s+me|steps\s+batao)\b/i.test(q || '');
}

/** Which kind of follow-up: 'example' | 'steps' | 'more' (default). */
export function followUpKind(q) {
  const t = String(q || '').toLowerCase();
  if (/\bexample\b/.test(t)) return 'example';
  if (/\bsteps?\b/.test(t)) return 'steps';
  return 'more';
}
