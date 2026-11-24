// Universal search index — built at runtime from notesData.js + pyqData.js
// One flat list of every searchable item: notes, subnotes, and PYQ papers.
import { semestersData } from '../data/notesData';
import { pyqPapers } from '../data/pyqData';
import { fileSizes, formatSize } from '../data/fileSizes';

const norm = (s) => String(s || '').toLowerCase();

// Stopwords skipped when building subject acronyms (dsa, dbms, oop…)
const ACRONYM_STOP = new Set(['and', 'of', 'the', '&', 'using', 'in', 'for', 'with', '-']);

function subjectAcronym(name) {
  return norm(name)
    .split(/[\s&/()-]+/)
    .filter((w) => w && !ACRONYM_STOP.has(w))
    .map((w) => w[0])
    .join('');
}

// Map free-text semester mentions ("sem4", "semester3") to sem ids.
// NOTE: the "sem"/"semester" prefix is REQUIRED — a bare "1" must not map
// to sem1, or queries like "unit 1" get wrongly filtered to Semester 1.
function semesterIdFromToken(tok) {
  const m = tok.match(/^(?:sem|semester)\s*0*([1-8])$/);
  return m ? `sem${m[1]}` : null;
}

// Pull "sem 4" / "sem4" / "semester 3" out of a token list into a semester
// constraint, returning the remaining tokens. Handles both "sem4" (one token)
// and "sem" "4" (two adjacent tokens) forms.
function extractSemester(tokens) {
  const rest = [];
  let semId = null;
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    let m = tok.match(/^(?:sem|semester)\s*0*([1-8])$/);
    if (m) { semId = `sem${m[1]}`; continue; }
    if (/^(?:sem|semester)$/.test(tok) && i + 1 < tokens.length) {
      const m2 = tokens[i + 1].match(/^0*([1-8])$/);
      if (m2) { semId = `sem${m2[1]}`; i++; continue; }
    }
    rest.push(tok);
  }
  return { semId, rest };
}

let cachedIndex = null;

export function buildSearchIndex() {
  if (cachedIndex) return cachedIndex;
  const items = [];
  let n = 0;

  // 1) Every note in every subject (flatten subnote folders too)
  Object.values(semestersData).forEach((sem) => {
    (sem.subjects || []).forEach((sub) => {
      const acronym = subjectAcronym(sub.name);
      const countNotes = (note) => {
        if (note.subnotes) {
          note.subnotes.forEach((sn) => {
            items.push({
              id: `note-${n++}`,
              type: 'note',
              title: `${note.title} — ${sn.title}`,
              subject: sub.name,
              subjectId: sub.id,
              acronym,
              semester: sem.id,
              semesterName: sem.name,
              file: sn.file,
              isExternal: !!sn.isExternal,
              year: null,
              session: null,
              size: fileSizes[sn.file] ?? null,
            });
          });
        } else if (!note.isPlaceholder) {
          items.push({
            id: `note-${n++}`,
            type: 'note',
            title: note.title,
            subject: sub.name,
            subjectId: sub.id,
            acronym,
            semester: sem.id,
            semesterName: sem.name,
            file: note.file,
            isExternal: !!note.isExternal,
            year: null,
            session: null,
            size: fileSizes[note.file] ?? null,
          });
        }
      };
      (sub.notes || []).forEach(countNotes);
    });
  });

  // 2) Every PYQ paper
  pyqPapers.forEach((p) => {
    items.push({
      id: `pyq-${p.id}`,
      type: 'pyq',
      title: `${p.subject} — ${p.session}`,
      subject: p.subject,
      subjectId: null,
      acronym: subjectAcronym(p.subject),
      subjectCode: p.subjectCode,
      semester: 'sem3',
      semesterName: 'Semester 3',
      file: p.file,
      isExternal: false,
      year: p.year,
      session: p.session,
      size: fileSizes[p.file] ?? null,
    });
  });

  cachedIndex = items;
  return items;
}

export function getSemesterOptions() {
  return Object.values(semestersData).map((s) => ({ id: s.id, name: s.name }));
}

// Subjects available for a semester filter (notes subjects + PYQ subjects)
export function getSubjectOptions(semesterId) {
  const names = new Set();
  buildSearchIndex().forEach((it) => {
    if (semesterId === 'all' || it.semester === semesterId) names.add(it.subject);
  });
  return [...names].sort();
}

// Tokenize: split on whitespace, keep things like "3cs4-05" intact.
// "chapter"/"chapters" are treated as "unit" (notes are organized by unit).
function tokenize(query) {
  return norm(query)
    .replace(/\bchapters?\b/g, 'unit')
    .split(/[\s,]+/)
    .filter(Boolean);
}

// Irregular abbreviations that acronyms can't derive ("dbms" ← "Database…")
const ABBR_ALIASES = {
  dbms: 'database management systems',
  rdbms: 'database management systems',
  toc: 'theory of computation',
};

// Score contribution of one token, or -1 when it matches nothing (AND semantics)
function matchToken(item, tok) {
  const semHit = semesterIdFromToken(tok);
  if (semHit) return item.semester === semHit ? 4 : -1;

  const title = norm(item.title);
  const subject = norm(item.subject);
  const semName = norm(item.semesterName);
  const code = norm(item.subjectCode || '');
  const session = norm(item.session || '');
  const year = String(item.year || '');

  // Irregular abbreviation aliases ("dbms") and acronyms ("dsa", "os")
  const alias = ABBR_ALIASES[tok];
  if (alias && subject.includes(alias)) return 3;
  if (item.acronym === tok) return 3;

  if (tok.length >= 3) {
    if (title.includes(tok)) return 3;
    if (subject.includes(tok)) return 2;
    if (semName.includes(tok)) return 1;
    if (code.includes(tok)) return 2;
    if (session.includes(tok)) return 2;
    if (year.includes(tok)) return 2;
    return -1;
  }
  // Short tokens (1–2 chars): strict matching only — no bare substrings
  if (item.acronym === tok) return 3;
  if (code.includes(tok)) return 2;
  if (year === tok) return 2;
  const titleWords = title.split(/[^a-z0-9]+/);
  const subjectWords = subject.split(/[^a-z0-9]+/);
  if (titleWords.includes(tok) || subjectWords.includes(tok)) return 2;
  return -1;
}

function scoreItem(item, tokens, fullQuery) {
  const title = norm(item.title);
  const subject = norm(item.subject);
  const code = norm(item.subjectCode || '');
  const session = norm(item.session || '');
  let score = 0;

  // Full-query substring boosts
  if (fullQuery && title.includes(fullQuery)) score += 12;
  if (fullQuery && subject.includes(fullQuery)) score += 8;
  if (fullQuery && code && code.includes(fullQuery)) score += 8;
  if (fullQuery && session.includes(fullQuery)) score += 6;

  for (const tok of tokens) {
    const s = matchToken(item, tok);
    if (s < 0) return -1; // AND semantics: every token must match somewhere
    score += s;
  }
  // Prefer real titles over tiny matches
  if (item.type === 'pyq' && tokens.some((t) => String(item.year) === t)) score += 3;
  return score;
}

export function searchAll({ query, semester = 'all', subject = 'all', type = 'all', sort = 'relevance' }) {
  const index = buildSearchIndex();
  const q = norm(query).trim();
  let tokens = tokenize(q);

  // Operators: sem:3 · sub:dbms · type:pyq|note · year:2024 — pulled out
  // of the tokens and applied as hard filters (shown as hint chips).
  let opSemester = null;
  let opSubject = null;
  let opType = null;
  let opYear = null;
  tokens = tokens.filter((t) => {
    const m = t.match(/^(sem|sub|type|year):(.+)$/);
    if (!m) return true;
    if (m[1] === 'sem') { const s = semesterIdFromToken(`sem${m[2]}`); if (s) opSemester = s; }
    else if (m[1] === 'sub') opSubject = m[2];
    else if (m[1] === 'type' && (m[2] === 'pyq' || m[2] === 'note')) opType = m[2];
    else if (m[1] === 'year' && /^\d{4}$/.test(m[2])) opYear = m[2];
    return false;
  });

  // "sem 4" typed in the query becomes a semester constraint (explicit
  // dropdown filter wins if both are set).
  const ex = extractSemester(tokens);
  tokens = ex.rest;
  const effSemester = semester !== 'all' ? semester : (opSemester || ex.semId || 'all');
  const effSubject = subject !== 'all' ? subject : opSubject;
  const effType = type !== 'all' ? type : (opType || 'all');

  // PERF (2026-11-24): scoreItem used to run TWICE per item — once in the
  // filter, once again to sort by relevance. Cache the score from the
  // filter pass and reuse it; results are identical, ~2x less work.
  const scoreCache = tokens.length > 0 ? new Map() : null;
  let results = index.filter((item) => {
    if (effSemester !== 'all' && item.semester !== effSemester) return false;
    if (effSubject && effSubject !== 'all' && norm(item.subject) !== effSubject && item.acronym !== effSubject) return false;
    if (effType !== 'all' && item.type !== effType) return false;
    if (opYear && String(item.year || '') !== opYear) return false;
    if (tokens.length === 0) return true;
    const s = scoreItem(item, tokens, q);
    if (scoreCache) scoreCache.set(item.id, s);
    return s >= 0;
  });

  if (tokens.length > 0 && sort === 'relevance') {
    results = results
      .map((item) => ({ item, score: scoreCache.get(item.id) ?? 0 }))
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .map((r) => r.item);
  } else if (sort === 'az') {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'newest') {
    results = [...results].sort((a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title));
  }
  return results;
}

export { formatSize };

// "Did you mean" — closest subject / note title by edit distance, for
// zero-result searches. Returns { suggestion, kind } or null.
function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return 99;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

export function didYouMean(query) {
  const q = norm(query).trim();
  if (q.length < 3) return null;
  const index = buildSearchIndex();
  const words = new Set();
  index.forEach((it) => {
    norm(it.subject).split(/[^a-z0-9]+/).filter((w) => w.length >= 3).forEach((w) => words.add(w));
    norm(it.title).split(/[^a-z0-9]+/).filter((w) => w.length >= 4).forEach((w) => words.add(w));
  });
  let best = null;
  let bestD = 99;
  for (const w of words) {
    const d = editDistance(q.split(/\s+/)[0], w);
    if (d < bestD) {
      bestD = d;
      best = w;
    }
  }
  if (best && bestD <= 2 && best !== q) return { suggestion: best, kind: 'word' };
  return null;
}

// One context line under a result: the matched unit/topic + subject.
export function snippetFor(item, query) {
  const tokens = tokenize(norm(query)).filter((t) => !/^(sem|sub|type|year):/.test(t));
  let title = item.title;
  for (const t of tokens) {
    if (t.length < 3) continue;
    const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    title = title.replace(re, '**$1**');
  }
  return { title, meta: `${item.semesterName} · ${item.subject}${item.session ? ` · ${item.session}` : ''}` };
}

