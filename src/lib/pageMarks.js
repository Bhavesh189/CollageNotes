// pageMarks — per-page marks on notes (local only, never leaves the device).
// Flags: confusing | important | revise. Annotations: text sticky notes.
// Highlights: rectangles (percent of page). Page bookmarks: saved pages.
// All stored as metadata — the note images themselves are never modified.
const K = (kind, file) => `bn-marks-${kind}:${file}`;

function read(kind, file) {
  try {
    return JSON.parse(localStorage.getItem(K(kind, file)) || '{}');
  } catch {
    return {};
  }
}

function write(kind, file, value) {
  try {
    localStorage.setItem(K(kind, file), JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('bn-marks-changed'));
  } catch {
    // storage unavailable — marks just don't persist
  }
}

export const FLAG_LABELS = {
  confusing: 'Confusing',
  important: 'Important',
  revise: 'Revise',
};

export function getFlags(file) {
  return read('flags', file);
}

export function setFlag(file, page, flag) {
  const m = read('flags', file);
  if (flag) m[page] = flag;
  else delete m[page];
  write('flags', file, m);
}

export function getAnnotations(file) {
  return read('notes', file);
}

export function addAnnotation(file, page, text) {
  const t = String(text || '').trim();
  if (!t) return;
  const m = read('notes', file);
  const arr = m[page] || [];
  arr.push({ id: Date.now(), text: t, ts: Date.now() });
  m[page] = arr;
  write('notes', file, m);
}

export function deleteAnnotation(file, page, id) {
  const m = read('notes', file);
  m[page] = (m[page] || []).filter((a) => a.id !== id);
  if (!m[page].length) delete m[page];
  write('notes', file, m);
}

export function getHighlights(file) {
  return read('hl', file);
}

// Text highlights: saved text selections (word-span rects), per page.
// Stored separately from region highlights ('hl'): { [page]: [{id, text,
// color, rects, ts}] } — rects are per-line boxes in % of the page, taken
// from the browser Selection's client rects over the text layer.
export function getTextHighlights(file) {
  return read('thl', file);
}

export function addTextHighlight(file, page, hl) {
  const m = read('thl', file);
  const arr = m[page] || [];
  arr.push({ id: Date.now(), ts: Date.now(), ...hl });
  m[page] = arr;
  write('thl', file, m);
}

export function deleteTextHighlight(file, page, id) {
  const m = read('thl', file);
  m[page] = (m[page] || []).filter((h) => h.id !== id);
  if (!m[page].length) delete m[page];
  write('thl', file, m);
}

export function clearTextHighlights(file, page) {
  const m = read('thl', file);
  delete m[page];
  write('thl', file, m);
}

// Replace the whole text-highlight map for a file (used by undo/redo —
// the snapshot IS the previous state, so no per-item logic is needed).
// Same key/shape as the other thl helpers; fires the same change event.
export function setTextHighlights(file, value) {
  write('thl', file, value || {});
}

export function addHighlight(file, page, rect) {
  const m = read('hl', file);
  const arr = m[page] || [];
  arr.push({ id: Date.now(), ...rect });
  m[page] = arr;
  write('hl', file, m);
}

export function deleteHighlight(file, page, id) {
  const m = read('hl', file);
  m[page] = (m[page] || []).filter((h) => h.id !== id);
  if (!m[page].length) delete m[page];
  write('hl', file, m);
}

export function getPageBookmarks(file) {
  return read('pb', file);
}

export function togglePageBookmark(file, page, title) {
  const m = read('pb', file);
  if (m[page]) delete m[page];
  else m[page] = { title: title || `Page ${page}`, ts: Date.now() };
  write('pb', file, m);
  return !!m[page];
}

// Scan ALL notes for a mark kind — used by the "Confusing pages" list and
// the page-bookmarks list. Returns [{file, page, ...mark}].
export function getAllMarks(kind) {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(`bn-marks-${kind}:`)) continue;
      const file = key.slice(`bn-marks-${kind}:`.length);
      const m = JSON.parse(localStorage.getItem(key) || '{}');
      for (const [page, mark] of Object.entries(m)) {
        out.push({ file, page: Number(page), ...(typeof mark === 'object' ? mark : { value: mark }) });
      }
    }
  } catch {
    // ignore
  }
  return out.sort((a, b) => (b.ts || 0) - (a.ts || 0));
}
