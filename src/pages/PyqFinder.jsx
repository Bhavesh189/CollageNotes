import React, { useState, useMemo, useEffect } from 'react';
import { pyqPapers } from '../data/pyqData';
import DocViewer from '../components/DocViewer';
import { ViewButton, BookmarkButton } from '../components/NoteActions';
import { isBookmarked, toggleBookmark } from '../lib/bookmarks';

// PYQ Finder. When initialSubjects is set (from a subject's "Get PYQ"
// button), results are pre-filtered to those subjects with a banner;
// "Show all PYQs" clears the filter.
const PyqFinder = ({ initialSubjects, initialLabel, onClearInitialSubjects }) => {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [year, setYear] = useState('all');
  const [preview, setPreview] = useState(null); // { file, title, context }
  const [, setBmTick] = useState(0);

  // A new "Get PYQ" navigation resets the free-text/year filters.
  useEffect(() => {
    if (initialSubjects) {
      setQuery('');
      setYear('all');
      setSubject('all');
      window.scrollTo({ top: 0 });
    }
  }, [initialSubjects]);

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
    const matchInitial = !initialSubjects || initialSubjects.includes(p.subject);
    const matchYear = year === 'all' || String(p.year) === String(year);
    return matchQuery && matchSubject && matchInitial && matchYear;
  });

  const handleToggleBookmark = (p) => {
    toggleBookmark({
      id: `pyq:${p.id}`,
      type: 'pyq',
      title: `${p.subject} — ${p.session}`,
      file: p.file,
      subject: p.subject,
      semesterName: null,
      isExternal: false,
    });
    setBmTick((t) => t + 1);
  };

  return (
    <div className="view-main">
      <div className="subject-panel-header">
        <div style={{ width: '80px' }}></div>
        <h2 className="panel-title">
          <i className="fa-solid fa-file-lines" style={{ marginRight: '10px' }}></i>
          PYQ Finder — B.Tech CSE · All Semesters
        </h2>
        <div style={{ width: '80px' }}></div>
      </div>

      {/* Subject pre-filter banner (from "Get PYQ") */}
      {initialSubjects && (
        <div className="pyq-filter-banner glass">
          <span>
            <i className="fa-solid fa-filter" style={{ marginRight: '8px' }}></i>
            Showing PYQs for <strong>{initialLabel || initialSubjects.join(', ')}</strong>
          </span>
          <button type="button" className="back-btn" onClick={onClearInitialSubjects}>
            Show all PYQs
          </button>
        </div>
      )}

      {/* Search + filters */}
      <div className="glass" style={{ padding: '1.4rem', margin: '0 auto 1.5rem', maxWidth: '920px', width: '100%' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by subject, code, or session…"
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
          {results.length} paper{results.length === 1 ? '' : 's'} found — tap a card to view it.
        </p>
      </div>

      {/* Results */}
      <div className="notes-list-container">
        {results.length > 0 ? (
          results.map((p, index) => {
            const openView = () => setPreview({ file: p.file, title: `${p.subject} — ${p.session}`, context: { source: 'pyq' } });
            const bmId = `pyq:${p.id}`;
            return (
            <div
              key={p.id}
              className="note-item glass"
              style={{ '--i': index }}
              onClick={openView}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openView(); } }}
            >
              <div className="note-item-left">
                <i className="fa-solid fa-file-pdf note-item-icon"></i>
                <span className="note-item-title pyq-title">
                  <span className="pyq-subject">{p.subject}</span>
                  <span className="pyq-code">{p.subjectCode}</span>
                  <small className="pyq-session">{p.session}</small>
                </span>
              </div>
              <div className="note-item-right">
                <BookmarkButton active={isBookmarked(bmId)} onClick={() => handleToggleBookmark(p)} />
                <ViewButton onClick={(e) => { e.stopPropagation(); openView(); }} label={`View ${p.subject} ${p.session}`} />
              </div>
            </div>
            );
          })
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
          context={preview.context}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default PyqFinder;
