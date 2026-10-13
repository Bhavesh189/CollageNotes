// Tiny in-browser chatbot brain — pattern/keyword intent classifier with
// entity extraction, fully client-side, no backend. Answers note/PYQ
// lookups by querying the existing searchIndex.
import { searchAll } from './searchIndex';

// Alias → subject-name fragment used for matching
const SUBJECT_ALIASES = {
  aem: 'advanced engineering mathematics',
  'advanced maths': 'advanced engineering mathematics',
  de: 'digital electronics',
  dsa: 'data structures',
  'data structures': 'data structures',
  oop: 'object oriented programming',
  'c++': 'object oriented programming',
  se: 'software engineering',
  lsp: 'linux and shell',
  linux: 'linux and shell',
  dm: 'discrete mathematics',
  'discrete': 'discrete mathematics',
  mpi: 'microprocessor',
  microprocessor: 'microprocessor',
  toc: 'theory of computation',
  dbms: 'database management systems',
  rdbms: 'database management systems',
  database: 'database management systems',
  python: 'python programming',
  py: 'python programming',
  java: 'java programming',
  os: 'operating systems',
  'operating system': 'operating systems',
  'operating systems': 'operating systems',
  'computer networks': 'computer networks',
  'digital electronics': 'digital electronics',
  'software engineering': 'software engineering',
  'theory of computation': 'theory of computation',
  'compiler design': 'compiler design',
  'deep learning': 'deep learning',
  coa: 'computer org',
  architecture: 'computer org',
  cn: 'computer networks',
  networks: 'computer networks',
  cloud: 'cloud computing',
  devops: 'cloud computing',
  ml: 'machine learning',
  dmw: 'data mining',
  'data mining': 'data mining',
  ds: 'distributed systems',
  'distributed': 'distributed systems',
  cd: 'compiler design',
  compiler: 'compiler design',
  daa: 'design and analysis',
  algorithms: 'design and analysis',
  iss: 'information security',
  security: 'information security',
  dip: 'digital image processing',
  'image processing': 'digital image processing',
  iot: 'internet of things',
  nlp: 'natural language processing',
  dl: 'deep learning',
  'deep learning': 'deep learning',
  disaster: 'disaster management',
  gai: 'generative ai',
  'generative ai': 'generative ai',
  fhi: 'fhi subject',
  chemistry: 'chemistry',
  chem: 'chemistry',
  maths: 'maths',
  math: 'maths',
  bee: 'bee',
  mefa: 'managerial economics',
  'managerial economics': 'managerial economics',
  physics: 'physics',
  'built environment': 'built environment',
  communication: 'communication',
  tc: 'technical communication',
  'technical communication': 'technical communication',
  'engineering mathematics': 'engineering mathematics',
};

// Intent patterns — checked in order; first match wins
const INTENTS = [
  {
    id: 'founder',
    patterns: [
      /who (created|made|built|developed|designed)/,
      /\bfounder\b/,
      /who is (the )?(owner|creator|developer)/,
      /created you/,
      /who made this/,
    ],
  },
  {
    id: 'greeting',
    patterns: [/^(hi+|hello+|hey+|namaste|yo)\b/, /\bgood (morning|evening|afternoon)\b/],
  },
  { id: 'thanks', patterns: [/\b(thank|thanks|thx|shukriya|dhanyavad)\b/] },
  {
    id: 'help',
    patterns: [/\bhelp\b/, /what can you do/, /how (do|can) (i|you) (use|find)/, /how to use/, /options/],
  },
  {
    id: 'find_pyq',
    patterns: [/\bpyq\b/, /previous year/, /\bpapers?\b/],
  },
  {
    id: 'find_notes',
    patterns: [/\b(unit|chapter|\bch\b|notes?|pdf|materials?|syllabus)\b/, /\bsem\b/],
  },
];

const norm = (s) => String(s || '').toLowerCase();

export function classifyIntent(text) {
  const t = norm(text).trim();
  for (const intent of INTENTS) {
    if (intent.patterns.some((p) => p.test(t))) return intent.id;
  }
  // Heuristic: looks like a subject/semester lookup even without keywords
  if (extractEntities(t).subject || extractEntities(t).semester) return 'find_notes';
  return 'fallback';
}

export function extractEntities(text) {
  const t = norm(text);
  const entities = { semester: null, subject: null, unit: null, year: null };

  const semM = t.match(/sem(?:ester)?\s*0*([1-8])/) || t.match(/\b([1-8])(?:st|nd|rd|th)?\s*sem\b/);
  if (semM) entities.semester = `sem${semM[1]}`;

  const unitM = t.match(/(?:unit|chapter|\bch\b)\s*0*(\d{1,2})/);
  if (unitM) entities.unit = unitM[1];

  const yearM = t.match(/\b(20\d{2})\b/);
  if (yearM) entities.year = yearM[1];

  // Longest alias first so "machine learning" beats "ml" correctly
  const keys = Object.keys(SUBJECT_ALIASES).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    const re = new RegExp(`\\b${k.replace(/[.+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (re.test(t)) {
      entities.subject = SUBJECT_ALIASES[k];
      break;
    }
  }
  return entities;
}

function toResults(items, limit = 5) {
  return items.slice(0, limit).map((it) => ({
    title: it.title,
    subject: it.subject,
    semesterName: it.semesterName,
    file: it.file,
    type: it.type, // 'note' | 'pyq'
    isExternal: !!it.isExternal,
  }));
}

function answerFindNotes(entities) {
  const qParts = [];
  if (entities.subject) qParts.push(entities.subject);
  // NOTE: never append the bare unit number to the query — searchIndex
  // maps a bare "1" to semester 1. Filter by unit text after searching.
  let results = searchAll({
    query: qParts.join(' '),
    semester: entities.semester || 'all',
    subject: 'all',
    type: 'note',
    sort: 'relevance',
  });
  let scopeNote = '';
  if (results.length === 0 && entities.semester) {
    results = searchAll({
      query: qParts.join(' '),
      semester: 'all',
      subject: 'all',
      type: 'note',
      sort: 'relevance',
    });
    if (results.length > 0) scopeNote = ' (no matches in that semester, showing all semesters)';
  }
  if (entities.unit) {
    const u = `unit ${entities.unit}`;
    const exact = results.filter((r) => norm(r.title).includes(u));
    if (exact.length > 0) results = exact;
  }
  if (results.length === 0) {
    return {
      reply:
        "I couldn't find notes matching that. Try the subject name plainly — e.g. “dsa unit 3 sem 4”.",
      results: [],
    };
  }
  const shown = toResults(results);
  return {
    reply: `Found ${results.length} note${results.length === 1 ? '' : 's'}${scopeNote} — here are the top ${shown.length}:`,
    results: shown,
  };
}

function answerFindPyq(entities) {
  const qParts = [];
  if (entities.subject) qParts.push(entities.subject);
  if (entities.year) qParts.push(entities.year);
  const results = searchAll({
    query: qParts.join(' '),
    semester: 'all',
    subject: 'all',
    type: 'pyq',
    sort: 'newest',
  });
  if (results.length === 0) {
    return {
      reply:
        'No PYQ papers matched that. Our PYQ collection covers Semester 3 CSE — try “dsa pyq 2024”.',
      results: [],
    };
  }
  const shown = toResults(results);
  return {
    reply: `Found ${results.length} PYQ paper${results.length === 1 ? '' : 's'} — top ${shown.length}:`,
    results: shown,
  };
}

const HELP_TEXT =
  'I can find study material for you. Try:\n• “aem chapter 1 sem 3”\n• “dsa unit 3 sem 4”\n• “pyq 2024” or “previous year papers”\n• “who created you?”';

export function getBotReply(rawText) {
  const text = norm(rawText).trim();
  if (!text) return { reply: 'Type something — e.g. “dsa unit 2 sem 4”.', results: [] };

  const intent = classifyIntent(text);
  const entities = extractEntities(text);

  switch (intent) {
    case 'founder':
      return { reply: 'I was created by **Bhavesh Sharma**.', results: [] };
    case 'greeting':
      return {
        reply: 'Hey! 👋 Ask me for notes like “aem chapter 1 sem 3” or papers like “pyq 2024”.',
        results: [],
      };
    case 'thanks':
      return { reply: "You're welcome! Good luck with your studies. 📚", results: [] };
    case 'help':
      return { reply: HELP_TEXT, results: [] };
    case 'find_pyq':
      return answerFindPyq(entities);
    case 'find_notes':
      if (!entities.subject && !entities.semester) {
        return {
          reply: 'Which subject? Try “dsa unit 2 sem 4” or “operating systems sem 5”.',
          results: [],
        };
      }
      return answerFindNotes(entities);
    default:
      return {
        reply: 'I can help you find notes — try “dsa unit 3 sem 4” or “pyq 2024”.',
        results: [],
      };
  }
}
