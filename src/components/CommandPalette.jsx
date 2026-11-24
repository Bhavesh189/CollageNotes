import React, { useState, useEffect, useMemo, useRef } from 'react';
import { searchAll, buildSearchIndex } from '../lib/searchIndex';
import { useDebouncedValue } from '../lib/useDebouncedValue';
import { getStreak } from '../lib/study';

// Command palette (Ctrl/⌘+K): fuzzy-jump to any note, subject, PYQ,
// syllabus, or action. Arrow keys + Enter to open, Esc to close.
const ACTIONS = [
  { id: 'act-study', label: 'Go to My Study', hint: 'streaks, goals, revision', run: (nav) => nav('study') },
  { id: 'act-bookmarks', label: 'Go to Bookmarks & Collections', hint: 'saved notes', run: (nav) => nav('bookmarks') },
  { id: 'act-pyq', label: 'Go to PYQ Papers', hint: 'previous year papers', run: (nav) => nav('pyq') },
  { id: 'act-notes', label: 'Go to Notes Dashboard', hint: 'all semesters', run: (nav) => nav('notes') },
  { id: 'act-random', label: 'Surprise me — open a random unread note', hint: 'random', run: (nav, open) => open && open() },
  { id: 'act-theme', label: 'Toggle dark / light mode', hint: 'theme', run: (nav, open, toggleTheme) => toggleTheme && toggleTheme() },
];

const CommandPalette = ({ open, onClose, onNavigate, onOpenNote, onRandom, onToggleTheme }) => {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    }
  }, [open ]);

  // PERF (2026-11-24): the catalogue search used to re-run on every
  // keystroke; now it waits 150ms after typing pauses. The input stays
  // instant; the 150ms delay on the list is imperceptible.
  const dq = useDebouncedValue(q, 150);
  const results = useMemo(() => {
    if (!open) return [];
    const query = dq.trim();
    const acts = ACTIONS.filter((a) => !query || a.label.toLowerCase().includes(query.toLowerCase()) || a.hint.includes(query.toLowerCase()));
    const items = query.length >= 2 ? searchAll({ query }).slice(0, 8) : buildSearchIndex().slice(0, 0);
    return [
      ...acts.map((a) => ({ kind: 'action', id: a.id, title: a.label, sub: a.hint, act: a })),
      ...items.map((it) => ({ kind: 'item', id: it.id, title: it.title, sub: `${it.semesterName} · ${it.subject}`, item: it })),
    ].slice(0, 10);
  }, [dq, open]);

  useEffect(() => {
    setSel(0);
  }, [q]);

  if (!open) return null;

  const run = (r) => {
    if (!r) return;
    if (r.kind === 'action') {
      if (r.act.id === 'act-random') r.act.run(onNavigate, onRandom);
      else if (r.act.id === 'act-theme') r.act.run(onNavigate, null, onToggleTheme);
      else r.act.run(onNavigate);
    } else if (r.item) {
      onOpenNote && onOpenNote(r.item.file, r.item.title, { semester: r.item.semesterName, subject: r.item.subject, source: r.item.type || 'search' });
    }
    onClose();
  };

  return (
    <div className="palette-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Jump to anything">
      <div className="palette glass" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input-row">
          <i className="fa-solid fa-terminal"></i>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type to jump — notes, PYQ, subjects, actions…"
            aria-label="Jump to anything"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSel((s) => Math.min(results.length - 1, s + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                run(results[sel]);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="palette-list" role="listbox">
          {results.length === 0 ? (
            <div className="palette-empty">No matches — try “dbms”, “sem 3”, “pyq 2024”, or an action like “My Study”.</div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                className={`palette-row ${i === sel ? 'selected' : ''}`}
                onClick={() => run(r)}
                onMouseEnter={() => setSel(i)}
                role="option"
                aria-selected={i === sel}
              >
                <i className={`fa-solid ${r.kind === 'action' ? 'fa-bolt' : r.item.type === 'pyq' ? 'fa-file-lines' : 'fa-file-pdf'}`}></i>
                <span>
                  <strong>{r.title}</strong>
                  <small>{r.sub}</small>
                </span>
                {r.kind === 'action' && <span className="palette-action-tag">Action</span>}
              </button>
            ))
          )}
        </div>
        <div className="palette-foot">
          <span>↑↓ to move · Enter to open · Esc to close</span>
          <span>{getStreak().current}-day streak 🔥</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
