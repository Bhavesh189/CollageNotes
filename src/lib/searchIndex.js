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

// Map free-text semester mentions ("sem 4", "sem4", "semester 4") to sem ids
function semesterIdFromToken(tok) {
  const m = tok.match(/^(?:sem|semester)?\s*0*([1-8])$/);
  return m ? `sem${m[1]}` : null;
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

// Tokenize: split on whitespace, keep things like "3cs4-05" intact
function tokenize(query) {
  return norm(query).split(/[\s,]+/).filter(Boolean);
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
  const tokens = tokenize(q);

  let results = index.filter((item) => {
    if (semester !== 'all' && item.semester !== semester) return false;
    if (subject !== 'all' && item.subject !== subject) return false;
    if (type !== 'all' && item.type !== type) return false;
    if (tokens.length === 0) return true;
    return scoreItem(item, tokens, q) >= 0;
  });

  if (tokens.length > 0 && sort === 'relevance') {
    results = results
      .map((item) => ({ item, score: scoreItem(item, tokens, q) }))
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
