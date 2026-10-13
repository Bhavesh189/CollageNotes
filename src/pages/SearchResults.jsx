import React, { useState, useMemo, useEffect } from 'react';
import {
  searchAll,
  getSemesterOptions,
  getSubjectOptions,
  formatSize,
} from '../lib/searchIndex';

// Dedicated universal-search results view.
// Props: query (from header), onQueryChange, onClear (Escape / clear button).
const SearchResults = ({ query, onQueryChange, onClear }) => {
  const [semester, setSemester] = useState('all');
  const [subject, setSubject] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('relevance');

  const semesterOptions = useMemo(() => getSemesterOptions(), []);
  const subjectOptions = useMemo(
    () => getSubjectOptions(semester),
    [semester]
  );

  // Reset dependent subject when semester changes
  useEffect(() => {
    setSubject('all');
  }, [semester]);

  const results = useMemo(
    () => searchAll({ query, semester, subject, type, sort }),
    [query, semester, subject, type, sort]
  );

  const hasFilters = semester !== 'all' || subject !== 'all' || type !== 'all' || query.trim() !== '';
  const clearAll = () => {
    setSemester('all');
    setSubject('all');
    setType('all');
    setSort('relevance');
    onClear();
  };

  const showResults = query.trim().length >= 2 || hasFilters;

  return (
    <div className="view-main">
      <div className="subject-panel-header">
        <div style={{ width: '80px' }}></div>
        <h2 className="panel-title">
          <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '10px' }}></i>
          Search everything
        </h2>
        <div style={{ width: '80px' }}></div>
      </div>

      {/* Filters bar */}
      <div className="glass search-filters">
        <div className="search-filters-row">
          <input
            type="text"
            className="form-input search-page-input"
            placeholder="🔍 Notes, PYQs, subjects, semesters…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search query"
            autoComplete="off"
          />
        </div>
        <div className="search-filters-row">
          <select
            className="form-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            aria-label="Filter by semester"
          >
            <option value="all">All Semesters</option>
            {semesterOptions.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Filter by subject"
          >
            <option value="all">All Subjects</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">Notes + PYQs</option>
            <option value="note">Notes only</option>
            <option value="pyq">PYQ papers only</option>
          </select>
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort results"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="az">Sort: A–Z</option>
            <option value="newest">Sort: Newest first</option>
          </select>
          {hasFilters && (
            <button className="back-btn" onClick={clearAll} type="button">
              <i className="fa-solid fa-filter-circle-xmark"></i> Clear
            </button>
          )}
        </div>
        <p className="search-count">
          {showResults ? (
            <>{results.length} result{results.length === 1 ? '' : 's'}</>
          ) : (
            <>Type at least 2 characters, or pick filters — e.g. try “sem 4”, “database”, “pyq 2024”.</>
          )}
        </p>
      </div>

      {/* Results */}
      {showResults && (
        <div className="notes-list-container">
          {results.length > 0 ? (
            results.map((r, index) => (
              <a
                key={r.id}
                href={r.file}
                download={!r.isExternal}
                target={r.isExternal ? '_blank' : '_self'}
                rel={r.isExternal ? 'noopener noreferrer' : ''}
                className="note-item glass"
                style={{ '--i': Math.min(index, 12) }}
              >
                <div className="note-item-left">
                  <i className={`fa-solid ${r.type === 'pyq' ? 'fa-file-lines' : 'fa-file-pdf'} note-item-icon`}></i>
                  <span className="note-item-title">
                    <span className={`result-badge ${r.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>
                      {r.type === 'pyq' ? 'PYQ' : 'Note'}
                    </span>{' '}
                    {r.title}
                    <br />
                    <small className="result-meta">
                      {r.semesterName} · {r.subject}
                      {r.size != null && <> · {formatSize(r.size)}</>}
                    </small>
                  </span>
                </div>
                <div className="note-item-right">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </a>
            ))
          ) : (
            <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
              <i className="fa-solid fa-magnifying-glass coming-soon-icon"></i>
              <h3>No matches found</h3>
              <p>Try fewer filters, a shorter keyword, or a different spelling.</p>
              <button className="back-btn" onClick={clearAll} type="button" style={{ margin: '1rem auto 0' }}>
                <i className="fa-solid fa-filter-circle-xmark"></i> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
