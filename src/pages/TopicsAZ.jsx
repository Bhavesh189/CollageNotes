import React, { useMemo, useState } from 'react';
import { buildSearchIndex } from '../lib/searchIndex';

// Topics A–Z — every note title across all subjects in one browsable list.
const TopicsAZ = ({ onOpenNote }) => {
  const [filter, setFilter] = useState('');
  const notes = useMemo(() => buildSearchIndex().filter((i) => i.type === 'note'), []);
  const groups = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const list = notes.filter((n) => !q || n.title.toLowerCase().includes(q) || n.subject.toLowerCase().includes(q));
    const g = {};
    for (const n of list) {
      const letter = (n.title.trim()[0] || '#').toUpperCase();
      const key = /[A-Z]/.test(letter) ? letter : '#';
      (g[key] = g[key] || []).push(n);
    }
    return Object.keys(g).sort().map((k) => ({ letter: k, items: g[k].sort((a, b) => a.title.localeCompare(b.title)) }));
  }, [notes, filter]);

  return (
    <div className="view-main">
      <div className="subject-panel-header">
        <div style={{ width: '80px' }}></div>
        <h2 className="panel-title"><i className="fa-solid fa-arrow-down-a-z" style={{ marginRight: '10px' }}></i>Topics A–Z</h2>
        <div style={{ width: '80px' }}></div>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>
        Every note on the site, A to Z — {notes.length} notes. Tap one to open it.
      </p>
      <div className="grid-toolbar glass" style={{ marginBottom: '1rem' }}>
        <div className="grid-filter">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter topics…"
            aria-label="Filter topics"
          />
        </div>
      </div>
      {groups.length === 0 ? (
        <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
          <h3>No topics match</h3>
          <p>Try a shorter word.</p>
        </div>
      ) : (
        groups.map((g) => (
          <div key={g.letter} className="topics-group">
            <h3 className="topics-letter">{g.letter}</h3>
            <div className="notes-list-container">
              {g.items.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className="note-item glass topics-row"
                  onClick={() => onOpenNote && onOpenNote(n.file, n.title, { semester: n.semesterName, source: 'topics' })}
                >
                  <span className="note-item-left">
                    <span className="note-item-title">{n.title}<br /><small className="result-meta">{n.semesterName} · {n.subject}</small></span>
                  </span>
                  <span className="note-item-right"><i className="fa-solid fa-arrow-right"></i></span>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TopicsAZ;
