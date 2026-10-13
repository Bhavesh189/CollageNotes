import React, { useState, useMemo } from 'react';
import { pyqPapers } from '../data/pyqData';
import DocViewer from '../components/DocViewer';

const PyqFinder = () => {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [year, setYear] = useState('all');
  const [preview, setPreview] = useState(null); // { file, title }

  const subjects = useMemo(
    () => [...new Set(pyqPapers.map((p) => p.subject))].sort(),
    []
  );
  const years = useMemo(
    () => [...new Set(pyqPapers.map((p) => p.year))].sort((a, b) => b - a),
    []
  );

  const results = pyqPapers.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      p.subject.toLowerCase().includes(q) ||
      p.subjectCode.toLowerCase().includes(q) ||
      p.session.toLowerCase().includes(q);
    const matchSubject = subject === 'all' || p.subject === subject;
    const matchYear = year === 'all' || String(p.year) === String(year);
    return matchQuery && matchSubject && matchYear;
  });

  return (
    <div className="view-main">
      <div className="subject-panel-header">
        <div style={{ width: '80px' }}></div>
        <h2 className="panel-title">
          <i className="fa-solid fa-file-lines" style={{ marginRight: '10px' }}></i>
          PYQ Finder — Sem 3 CSE
        </h2>
        <div style={{ width: '80px' }}></div>
      </div>

      {/* Search + filters */}
      <div className="glass" style={{ padding: '1.4rem', margin: '0 auto 1.5rem', maxWidth: '920px', width: '100%' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search by subject, code, or session…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: '2 1 220px' }}
          />
          <select
            className="form-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ flex: '1 1 160px' }}
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ flex: '1 1 120px' }}
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <p style={{ margin: '12px 0 0', color: 'var(--text-muted, #9aa0b4)', fontSize: '0.9rem' }}>
          {results.length} paper{results.length === 1 ? '' : 's'} found — tap any card to download.
        </p>
      </div>

      {/* Results */}
      <div className="notes-list-container">
        {results.length > 0 ? (
          results.map((p, index) => (
            <a
              key={p.id}
              href={p.file}
              download
              className="note-item glass"
              style={{ '--i': index }}
            >
              <div className="note-item-left">
                <i className="fa-solid fa-file-pdf note-item-icon"></i>
                <span className="note-item-title">
                  {p.subject} <span style={{ opacity: 0.65 }}>· {p.subjectCode}</span>
                  <br />
                  <small style={{ opacity: 0.75, fontWeight: 'normal' }}>{p.session}</small>
                </span>
              </div>
              <div className="note-item-right">
                <button
                  type="button"
                  className="preview-btn"
                  title="Preview in browser"
                  aria-label={`Preview ${p.subject} ${p.session}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPreview({ file: p.file, title: `${p.subject} — ${p.session}` });
                  }}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </a>
          ))
        ) : (
          <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
            <i className="fa-solid fa-magnifying-glass coming-soon-icon"></i>
            <h3>No papers match</h3>
            <p>Try a different search term, subject, or year.</p>
          </div>
        )}
      </div>

      {preview && (
        <DocViewer
          file={preview.file}
          title={preview.title}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default PyqFinder;
