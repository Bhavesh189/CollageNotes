// Study store — all reading/progress data, localStorage only, no backend.
// Keys are namespaced bn-* (same convention as bn-bookmarks / bn-theme).
// Every mutation dispatches a 'bn-study-changed' event so any view can
// refresh. Nothing here touches a file: notes are view-only by design;
// only metadata (pages viewed, done, flags, ticks) is stored.
const K = {
  progress: 'bn-progress',       // { [file]: { pages:{n:1}, done, lastPage, lastRead, minutes, title, subject, sem, type, nextReview } }
  history: 'bn-history',         // [{ file, title, type, subject, sem, at, page }] newest first, max 60
  downloads: 'bn-downloads',     // { count, pyq: n, syllabus: n, items: [{file,title,at}] }
  syllabus: 'bn-syllabus',       // { [subjectId]: { [unit]: true } }
  exam: 'bn-exam',               // { date: 'YYYY-MM-DD', label }
  goal: 'bn-goal',               // { pages: number, minutes: number }
  collections: 'bn-collections', // [{ id, name, color, items:[file], createdAt, archived }]
  flags: 'bn-flags',             // { [file]: { [page]: 'important'|'confusing'|'revise' } }
  annotations: 'bn-annotations', // { [file]: { [page]: [{ id, text, at }] } }
  flashcards: 'bn-flashcards',   // { [file]: [{ id, front, back, box, nextReview }] }
  quiz: 'bn-quiz',               // { [file]: [{ id, q, a }] }
  settings: 'bn-settings',       // { fontSize, reduceMotion, highContrast, haptics, lowData, defaultFit }
  searchHistory: 'bn-search-history', // [query] newest first, max 8
  shareCounts: 'bn-share-counts', // { [file]: n }
};

export function emit() {
  try { window.dispatchEvent(new CustomEvent('bn-study-changed')); } catch { /* ignore */ }
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw);
    return v === null || v === undefined ? fallback : v;
  } catch { return fallback; }
}

function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* full/unavailable */ }
  emit();
}

export function todayStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return todayStr(d);
}

// ---- progress ------------------------------------------------------------
export function getProgressMap() { return read(K.progress, {}); }

export function getProgress(file) {
  const p = getProgressMap()[file];
  if (!p) return { viewed: 0, total: 0, pct: 0, done: false, lastPage: 0, minutes: 0 };
  const viewed = Object.keys(p.pages || {}).length;
  const total = p.total || 0;
  return { viewed, total, pct: total > 0 ? Math.round((viewed / total) * 100) : 0, done: !!p.done, lastPage: p.lastPage || 0, minutes: p.minutes || 0 };
}

/** Called when the viewer shows a page. meta: { title, subject, sem, type, total } */
export function recordPageView(file, page, meta = {}) {
  const map = getProgressMap();
  const p = map[file] || { pages: {}, done: false, lastPage: 0, minutes: 0 };
  p.pages = p.pages || {};
  p.pages[page] = 1;
  p.lastPage = page;
  p.lastRead = new Date().toISOString();
  if (meta.total) p.total = meta.total;
  if (meta.title) p.title = meta.title;
  if (meta.subject) p.subject = meta.subject;
  if (meta.sem) p.sem = meta.sem;
  if (meta.type) p.type = meta.type;
  map[file] = p;
  write(K.progress, map);

  // History: one entry per file per day (newest first), keep 60.
  const hist = read(K.history, []);
  const today = todayStr();
  const existing = hist.findIndex((h) => h.file === file && (h.at || '').slice(0, 10) === today);
  if (existing >= 0) {
    hist[existing].page = page;
    hist[existing].at = new Date().toISOString();
    const [e] = hist.splice(existing, 1);
    hist.unshift(e);
  } else {
    hist.unshift({ file, title: meta.title || file, type: meta.type || 'note', subject: meta.subject || '', sem: meta.sem || '', at: new Date().toISOString(), page });
  }
  write(K.history, hist.slice(0, 60));
  addMinutes(today, 0); // ensures today exists in the streak map (a read day counts)
}

/** Add study minutes (called by the viewer on close with elapsed time). */
export function recordSession(file, seconds, meta = {}) {
  if (!file || !seconds || seconds < 5) return;
  const mins = Math.max(1, Math.round(seconds / 60));
  const map = getProgressMap();
  const p = map[file] || { pages: {}, done: false, lastPage: 0, minutes: 0 };
  p.minutes = (p.minutes || 0) + mins;
  if (meta.title) p.title = meta.title;
  map[file] = p;
  write(K.progress, map);
  addMinutes(todayStr(), mins);
}

function addMinutes(day, mins) {
  const s = read(K.streak, { days: {} });
  s.days = s.days || {};
  s.days[day] = (s.days[day] || 0) + mins;
  try { localStorage.setItem('bn-streak', JSON.stringify(s)); } catch { /* ignore */ }
  emit();
}

export function markDone(file, done, meta = {}) {
  const map = getProgressMap();
  const p = map[file] || { pages: {}, done: false, lastPage: 0, minutes: 0 };
  p.done = !!done;
  if (meta.title) p.title = meta.title;
  if (meta.subject) p.subject = meta.subject;
  if (meta.sem) p.sem = meta.sem;
  if (meta.type) p.type = meta.type;
  if (done) {
    // SM-2-lite: first review due tomorrow; each "revise" flag pushes it out.
    const d = new Date();
    d.setDate(d.getDate() + 1);
    p.nextReview = todayStr(d);
  } else {
    delete p.nextReview;
  }
  map[file] = p;
  write(K.progress, map);
}

/** Mark a note for revision (reappears after 1 / 3 / 7 days — SM-2-lite). */
export function markRevise(file, meta = {}) {
  const map = getProgressMap();
  const p = map[file] || { pages: {}, done: false, lastPage: 0, minutes: 0 };
  const step = p.reviseStep || 0;
  const gap = [1, 3, 7][Math.min(step, 2)];
  const d = new Date();
  d.setDate(d.getDate() + gap);
  p.nextReview = todayStr(d);
  p.reviseStep = step + 1;
  if (meta.title) p.title = meta.title;
  if (meta.subject) p.subject = meta.subject;
  map[file] = p;
  write(K.progress, map);
}

// ---- history / continue / on-this-day ------------------------------------
export function getHistory() { return read(K.history, []); }

export function getContinueReading(limit = 4) {
  const seen = new Set();
  const out = [];
  for (const h of getHistory()) {
    if (seen.has(h.file)) continue;
    seen.add(h.file);
    const p = getProgress(h.file);
    if (p.done) continue; // finished notes don't need resuming
    out.push({ ...h, pct: p.pct, lastPage: p.lastPage || h.page || 1, total: p.total || 0 });
    if (out.length >= limit) break;
  }
  return out;
}

export function getOnThisDay() {
  const hist = getHistory();
  const pick = (n) => {
    const day = daysAgo(n);
    const items = hist.filter((h) => (h.at || '').slice(0, 10) === day);
    const seen = new Set();
    return items.filter((h) => !seen.has(h.file) && seen.add(h.file)).slice(0, 3);
  };
  return { week: pick(7), month: pick(30) };
}

export function getRevisionDue() {
  const today = todayStr();
  const map = getProgressMap();
  const out = [];
  for (const [file, p] of Object.entries(map)) {
    if (p.nextReview && p.nextReview <= today && (p.done || (p.reviseStep || 0) > 0)) {
      out.push({ file, title: p.title || file, subject: p.subject || '', sem: p.sem || '', nextReview: p.nextReview });
    }
  }
  const flags = read(K.flags, {});
  for (const [file, pages] of Object.entries(flags)) {
    const hasRevise = Object.values(pages || {}).some((f) => f === 'revise');
    if (hasRevise && !out.some((o) => o.file === file)) {
      const p = map[file] || {};
      out.push({ file, title: p.title || file, subject: p.subject || '', sem: p.sem || '', nextReview: 'flagged' });
    }
  }
  return out.slice(0, 8);
}

// ---- streak / stats -------------------------------------------------------
export function getStreak() {
  const s = read(K.streak, { days: {} });
  const days = s.days || {};
  let current = 0;
  let best = 0;
  let run = 0;
  let freezeUsed = false;
  // Walk back from today; one zero-minute day in the last 7 is forgiven
  // (the weekly rest-day freeze). A second gap ends the streak.
  for (let i = 0; i < 365; i++) {
    const d = daysAgo(i);
    const mins = days[d] || 0;
    if (mins > 0) {
      run += 1;
      current = run;
    } else if (i === 0) {
      // today hasn't been studied yet — streak still stands from yesterday
      continue;
    } else if (!freezeUsed && i <= 7 && run > 0) {
      // A single zero-minute day only forgives an EXISTING streak (the
      // weekly rest-day freeze). With no streak at all there is nothing
      // to freeze.
      freezeUsed = true;
      continue;
    } else {
      break;
    }
  }
  // Best streak: longest run over the stored days.
  const sorted = Object.keys(days).filter((d) => days[d] > 0).sort();
  let b = 0;
  let r = 0;
  let prev = null;
  for (const d of sorted) {
    if (prev) {
      const diff = (new Date(d) - new Date(prev)) / 86400000;
      r = diff === 1 ? r + 1 : 1;
      // a single 1-day gap inside a run still counts once (freeze)
      if (diff === 2) r += 1;
    } else r = 1;
    b = Math.max(b, r);
    prev = d;
  }
  best = Math.max(b, current);
  const todayMins = days[todayStr()] || 0;
  const totalMins = Object.values(days).reduce((a, v) => a + (v || 0), 0);
  return { current, best, freezeUsed, todayMins, totalMins, days };
}

export function getStats() {
  const map = getProgressMap();
  const entries = Object.entries(map);
  const notes = entries.filter(([, p]) => (p.type || 'note') === 'note');
  const notesRead = notes.filter(([, p]) => Object.keys(p.pages || {}).length > 0).length;
  const notesDone = notes.filter(([, p]) => p.done).length;
  const pagesRead = entries.reduce((a, [, p]) => a + Object.keys(p.pages || {}).length, 0);
  const minutes = entries.reduce((a, [, p]) => a + (p.minutes || 0), 0);
  const dl = read(K.downloads, { count: 0, pyq: 0, syllabus: 0 });
  const streak = getStreak();
  // Per-subject bars (notes only).
  const perSubject = {};
  for (const [, p] of notes) {
    const name = p.subject || 'Other';
    perSubject[name] = perSubject[name] || { done: 0, total: 0, read: 0 };
    perSubject[name].total += 1;
    if (p.done) perSubject[name].done += 1;
    if (Object.keys(p.pages || {}).length > 0) perSubject[name].read += 1;
  }
  // This week vs last week (pages are not dated; use minutes per day).
  const week = (offset) => {
    let m = 0;
    for (let i = 0; i < 7; i++) m += (streak.days[daysAgo(i + offset)] || 0);
    return m;
  };
  const daily = [];
  for (let i = 6; i >= 0; i--) daily.push({ day: daysAgo(i).slice(5), mins: streak.days[daysAgo(i)] || 0 });
  return {
    notesRead, notesDone, pagesRead, minutes,
    pyqDownloads: dl.pyq || 0, syllabusDownloads: dl.syllabus || 0,
    streak, perSubject, weekNow: week(0), weekPrev: week(7), daily,
  };
}

export function getAchievements() {
  const s = getStats();
  const list = [
    { id: 'first-note', name: 'First Note', desc: 'Opened your first note', unlocked: s.notesRead >= 1 },
    { id: 'ten-pages', name: '10 Pages', desc: 'Read 10 pages', unlocked: s.pagesRead >= 10 },
    { id: 'hundred-pages', name: '100 Pages', desc: 'Read 100 pages', unlocked: s.pagesRead >= 100 },
    { id: 'five-notes', name: '5 Notes Done', desc: 'Marked 5 notes done', unlocked: s.notesDone >= 5 },
    { id: 'streak-3', name: '3-Day Streak', desc: 'Studied 3 days in a row', unlocked: s.streak.current >= 3 },
    { id: 'streak-7', name: '7-Day Streak', desc: 'Studied a full week', unlocked: s.streak.current >= 7 },
    { id: 'pyq-hunter', name: 'PYQ Hunter', desc: 'Downloaded 5 PYQ papers', unlocked: s.pyqDownloads >= 5 },
    { id: 'hour', name: 'One Hour In', desc: '60 minutes of reading', unlocked: s.minutes >= 60 },
    { id: 'night-owl', name: 'Night Owl', desc: 'Read after 11 PM', unlocked: getHistory().some((h) => (h.at || '').slice(11, 13) >= '23') },
  ];
  return list;
}

// ---- downloads ------------------------------------------------------------
export function recordDownload(file, title, kind) {
  const dl = read(K.downloads, { count: 0, pyq: 0, syllabus: 0, items: [] });
  dl.count = (dl.count || 0) + 1;
  if (kind === 'pyq') dl.pyq = (dl.pyq || 0) + 1;
  if (kind === 'syllabus') dl.syllabus = (dl.syllabus || 0) + 1;
  dl.items = [{ file, title, at: new Date().toISOString() }, ...(dl.items || [])].slice(0, 20);
  write(K.downloads, dl);
}

// ---- syllabus tracker -----------------------------------------------------
// Units are derived from note titles: a leading "N." or "Unit N" groups a
// subject's notes into Unit 1..5. Ticking a unit marks its notes done.
export function deriveUnits(notes) {
  const units = {};
  for (const n of notes || []) {
    const t = (n.title || '').trim();
    let m = t.match(/^(\d+)\s*[.\-\)]/) || t.match(/unit\s*(\d+)/i);
    const u = m ? `Unit ${m[1]}` : 'Other';
    units[u] = units[u] || [];
    units[u].push(n);
  }
  return units;
}

export function getSyllabusTicks(subjectId) {
  return (read(K.syllabus, {})[subjectId]) || {};
}

export function toggleSyllabusUnit(subjectId, unit, notesInUnit) {
  const all = read(K.syllabus, {});
  const ticks = { ...(all[subjectId] || {}) };
  const now = !ticks[unit];
  if (now) ticks[unit] = true;
  else delete ticks[unit];
  all[subjectId] = ticks;
  write(K.syllabus, all);
  // Keep note progress in sync: ticking a unit marks its notes done.
  const map = getProgressMap();
  for (const n of notesInUnit || []) {
    const p = map[n.file] || { pages: {}, done: false, lastPage: 0, minutes: 0 };
    p.done = now;
    p.title = n.title;
    map[n.file] = p;
  }
  write(K.progress, map);
}

// ---- exam countdown + plan ------------------------------------------------
export function getExam() { return read(K.exam, { date: '', label: 'Endsem' }); }
export function setExam(date, label) { write(K.exam, { date, label: label || 'Endsem' }); }

export function daysUntilExam() {
  const e = getExam();
  if (!e.date) return null;
  const diff = Math.ceil((new Date(e.date + 'T00:00:00') - new Date()) / 86400000);
  return diff;
}

/** Spread unread notes evenly across the remaining days. */
export function buildExamPlan(unreadNotes) {
  const days = daysUntilExam();
  if (!days || days <= 0 || !unreadNotes || unreadNotes.length === 0) return [];
  const perDay = Math.ceil(unreadNotes.length / days);
  const plan = [];
  for (let i = 0; i < days && unreadNotes.length > i * perDay; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    plan.push({ date: todayStr(d), notes: unreadNotes.slice(i * perDay, (i + 1) * perDay) });
  }
  return plan;
}

// ---- goal ------------------------------------------------------------------
export function getGoal() { return read(K.goal, { pages: 20, minutes: 30 }); }
export function setGoal(pages, minutes) { write(K.goal, { pages: pages || 20, minutes: minutes || 30 }); }

// ---- settings / data -------------------------------------------------------
export function getSettings() {
  return read(K.settings, { fontSize: 'm', reduceMotion: false, highContrast: false, haptics: true, lowData: false, defaultFit: 'width' });
}
export function setSettings(patch) { write(K.settings, { ...getSettings(), ...patch }); }

export function exportAllData() {
  const out = {};
  for (const [name, key] of Object.entries(K)) {
    try { out[name] = JSON.parse(localStorage.getItem(key) || 'null'); } catch { out[name] = null; }
  }
  try { out.bookmarks = JSON.parse(localStorage.getItem('bn-bookmarks') || '[]'); } catch { out.bookmarks = []; }
  try { out.theme = localStorage.getItem('bn-theme'); } catch { out.theme = null; }
  return out;
}

export function importAllData(data) {
  if (!data || typeof data !== 'object') return false;
  for (const [name, key] of Object.entries(K)) {
    if (data[name] !== undefined && data[name] !== null) {
      try { localStorage.setItem(key, JSON.stringify(data[name])); } catch { /* ignore */ }
    }
  }
  if (Array.isArray(data.bookmarks)) {
    try { localStorage.setItem('bn-bookmarks', JSON.stringify(data.bookmarks)); } catch { /* ignore */ }
  }
  emit();
  return true;
}

export function resetAllData() {
  for (const key of Object.values(K)) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }
  try { localStorage.removeItem('bn-bookmarks'); } catch { /* ignore */ }
  try { localStorage.removeItem('bn-viewer-page'); } catch { /* ignore */ }
  emit();
}

// ---- search history / shares ----------------------------------------------
export function getSearchHistory() { return read(K.searchHistory, []); }
export function pushSearchHistory(q) {
  const h = read(K.searchHistory, []).filter((x) => x !== q);
  h.unshift(q);
  write(K.searchHistory, h.slice(0, 8));
}
export function removeSearchHistory(q) {
  write(K.searchHistory, read(K.searchHistory, []).filter((x) => x !== q));
}
export function recordShare(file) {
  const c = read(K.shareCounts, {});
  c[file] = (c[file] || 0) + 1;
  write(K.shareCounts, c);
}
export function getShareCounts() { return read(K.shareCounts, {}); }

// ---- collections -----------------------------------------------------------
export function getCollections() { return read(K.collections, []); }
export function saveCollection(col) {
  const list = getCollections();
  const i = list.findIndex((c) => c.id === col.id);
  if (i >= 0) list[i] = col;
  else list.push(col);
  write(K.collections, list);
}
export function deleteCollection(id) {
  write(K.collections, getCollections().filter((c) => c.id !== id));
}
export function newCollectionId() { return `col-${Date.now().toString(36)}`; }
