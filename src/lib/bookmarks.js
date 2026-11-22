// Bookmarks — notes & PYQ papers saved by the user, persisted in localStorage.
// Item shape: { id, type: 'note' | 'pyq', title, file, subject, semesterName, isExternal }
const KEY = 'bn-bookmarks';

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function isBookmarked(id) {
  return getBookmarks().some((b) => b.id === id);
}

// Toggles the item. Returns true when the item is bookmarked afterwards.
export function toggleBookmark(item) {
  const list = getBookmarks();
  const i = list.findIndex((b) => b.id === item.id);
  if (i >= 0) list.splice(i, 1);
  else list.push(item);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // storage full / unavailable — the in-memory list is already updated
  }
  try {
    window.dispatchEvent(new CustomEvent('bn-bookmarks-changed', { detail: { count: list.length } }));
  } catch {
    // non-browser environment
  }
  return i < 0;
}

export function removeBookmark(id) {
  const list = getBookmarks().filter((b) => b.id !== id);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent('bn-bookmarks-changed', { detail: { count: list.length } }));
  } catch {
    // ignore
  }
}
