import React, { useState, useMemo, useEffect } from 'react';
import {
  searchAll,
  getSemesterOptions,
  getSubjectOptions,
  formatSize,
  didYouMean,
  snippetFor,
} from '../lib/searchIndex';
import { useDebouncedValue } from '../lib/useDebouncedValue';
import DocViewer from '../components/DocViewer';
import { ViewButton, OpenButton, BookmarkButton } from '../components/NoteActions';
import { isBookmarked, toggleBookmark } from '../lib/bookmarks';
import { getTrendingSearches, requestNote, getNoteRequests } from '../lib/study';

// Dedicated universal-search results view.
// Props: query (from header), onQueryChange, onClear (Escape / clear button).
const SearchResults = ({ query, onQueryChange, onClear }) => {
  const [semester, setSemester] = useState('all');
  const [subject, setSubject] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [pyqYear, setPyqYear] = useState('all');
  const [pyqExam, setPyqExam] = useState('all');
  const [preview, setPreview] = useState(null); // { file, title }
  const [copied, setCopied] = useState(false);
  const [requested, setRequested] = useState(false);
  const [, setBmTick] = useState(0);

  const semesterOptions = useMemo(() => getSemesterOptions(), []);
  const subjectOptions = useMemo(
    () => getSubjectOptions(semester),
    [semester]
  );

  // Reset dependent subject when semester changes
  useEffect(() => {
    setSubject('all');
  }, [semester]);

  // PERF (2026-11-24): the results computation (full-catalogue scoring +
  // rendering up to hundreds of rows) used to re-run on EVERY keystroke.
  // The input above stays instant — only the results wait 150ms after the
  // user pauses typing.
  const debouncedQuery = useDebouncedValue(query, 150);
  const results = useMemo(
    () => searchAll({ query: debouncedQuery, semester, subject, type, sort }),
    [debouncedQuery, semester, subject, type, sort]
  );

  // PYQ facets: year + exam type (midterm/endterm) on PYQ results.
  const pyqResults = useMemo(() => {
    let list = results.filter((r) => r.type === 'pyq');
    if (pyqYear !== 'all') list = list.filter((r) => String(r.year) === pyqYear);
    if (pyqExam !== 'all') {
      list = list.filter((r) => {
        const s = String(r.session || '').toLowerCase();
        return pyqExam === 'mid' ? /mid|sessional|internal/.test(s) : /end|final|main/.test(s);
      });
    }
    return list;
  }, [results, pyqYear, pyqExam]);
  const shownResults = type === 'pyq' ? pyqResults : results;
  const pyqYears = useMemo(() => {
    const ys = [...new Set(results.filter((r) => r.type === 'pyq').map((r) => r.year).filter(Boolean))].sort((a, b) => b - a);
    return ys;
  }, [results]);

  const hasFilters = semester !== 'all' || subject !== 'all' || type !== 'all' || query.trim() !== '';
  const showResults = query.trim().length >= 2 || hasFilters;

  const suggestion = useMemo(
    () => (showResults && results.length === 0 && query.trim().length >= 3 ? didYouMean(query) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, results.length, showResults]
  );
  const trending = useMemo(() => getTrendingSearches(5), [query]);
  const requests = useMemo(() => getNoteRequests(), [requested]);

  const copySearchLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#search?q=${encodeURIComponent(query.trim())}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this search link:', url);
    }
  };

  const clearAll = () => {
    setSemester('all');
    setSubject('all');
    setType('all');
    setSort('relevance');
    setPyqYear('all');
    setPyqExam('all');
    onClear();
  };

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
            <option value="relevance">Relevance</option>
            <option value="az">A–Z</option>
            <option value="newest">Newest first</option>
          </select>
          {hasFilters && (
            <button className="back-btn" onClick={clearAll} type="button">
              <i className="fa-solid fa-filter-circle-xmark"></i> Clear
            </button>
          )}
        </div>
        <p className="search-count">
          {showResults ? (
            <>{shownResults.length} result{shownResults.length === 1 ? '' : 's'}</>
          ) : (
            <>Type at least 2 characters, or pick filters — e.g. try “sem 4”, “database”, “pyq 2024”.</>
          )}
          {query.trim().length >= 2 && (
            <button type="button" className="search-copy-link" onClick={copySearchLink} title="Copy a shareable link for this search">
              <i className="fa-solid fa-link"></i> {copied ? 'Link copied!' : 'Copy search link'}
            </button>
          )}
        </p>
        {type === 'pyq' && pyqYears.length > 0 && (
          <div className="search-filters-row">
            <select className="form-select" value={pyqYear} onChange={(e) => setPyqYear(e.target.value)} aria-label="Filter PYQ by year">
              <option value="all">All years</option>
              {pyqYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select className="form-select" value={pyqExam} onChange={(e) => setPyqExam(e.target.value)} aria-label="Filter PYQ by exam type">
              <option value="all">Midterm + Endterm</option>
              <option value="mid">Midterm / Sessional</option>
              <option value="end">Endterm / Main</option>
            </select>
          </div>
        )}
        {!showResults && trending.length > 0 && (
          <p className="search-trending">
            Students are searching:{' '}
            {trending.map((t, i) => (
              <span key={t.term}>
                {i > 0 && ' · '}
                <button type="button" className="search-trend-btn" onClick={() => onQueryChange(t.term)}>{t.term}</button>
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Results */}
      {showResults && (
        <div className="notes-list-container">
          {shownResults.length > 0 ? (
            shownResults.map((r, index) => {
              const openView = () => {
                if (r.isExternal) {
                  window.open(r.file, '_blank', 'noopener,noreferrer');
                } else {
                  setPreview({ file: r.file, title: r.title, context: { semester: r.semesterName, subject: r.subject, source: r.type || 'search' }, allowDownload: false });
                }
              };
              const snip = snippetFor(r, query);
              return (
              <div
                key={r.id}
                className="note-item glass"
                style={{ '--i': Math.min(index, 12) }}
                onClick={openView}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openView(); } }}
              >
                <div className="note-item-left">
                  <i className={`fa-solid ${r.type === 'pyq' ? 'fa-file-lines' : 'fa-file-pdf'} note-item-icon`}></i>
                  <span className="note-item-title">
                    <span className={`result-badge ${r.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>
                      {r.type === 'pyq' ? 'PYQ' : 'Note'}
                    </span>{' '}
                    {String(snip.title).split('**').map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>))}
                    <br />
                    <small className="result-meta">
                      {snip.meta}
                      {r.size != null && <> · {formatSize(r.size)}</>}
                    </small>
                  </span>
                </div>
                <div className="note-item-right">
                  <BookmarkButton
                    active={isBookmarked(r.id)}
                    onClick={() => {
                      toggleBookmark({ id: r.id, type: r.type, title: r.title, file: r.file, subject: r.subject, semesterName: r.semesterName, isExternal: !!r.isExternal });
                      setBmTick((t) => t + 1);
                    }}
                  />
                  {r.isExternal ? (
                    <OpenButton file={r.file} label={`Open ${r.title}`} />
                  ) : (
                    <>
                      <ViewButton onClick={(e) => { e.stopPropagation(); openView(); }} label={`View ${r.title}`} />
                    </>
                  )}
                </div>
              </div>
              );
            })
          ) : (
            <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
              <i className="fa-solid fa-magnifying-glass coming-soon-icon"></i>
              <h3>No matches found</h3>
              {suggestion ? (
                <p>
                  Did you mean{' '}
                  <button type="button" className="search-trend-btn" onClick={() => onQueryChange(suggestion.suggestion)}>
                    “{suggestion.suggestion}”
                  </button>
                  ? Try it, or fewer filters.
                </p>
              ) : (
                <p>Try fewer filters, a shorter keyword, or a different spelling.</p>
              )}
              <p>
                Looking for a paper instead? Try the{' '}
                <button type="button" className="search-trend-btn" onClick={() => { setType('pyq'); }}>PYQ papers</button>
                {' '}— or request this note and it will be added to your requested list in My Study:
              </p>
              <button
                className="back-btn"
                onClick={() => { requestNote(query.trim()); setRequested(true); }}
                type="button"
                style={{ margin: '0.5rem auto 0' }}
              >
                <i className="fa-solid fa-hand"></i> {requested ? 'Requested ✓ — see My Study' : `Request “${query.trim()}”`}
              </button>
              {requests.length > 0 && (
                <p className="search-requests">Your requests: {requests.slice(0, 3).map((r) => r.text).join(' · ')}</p>
              )}
              <button className="back-btn" onClick={clearAll} type="button" style={{ margin: '1rem auto 0' }}>
                <i className="fa-solid fa-filter-circle-xmark"></i> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {preview && (
        <DocViewer
          file={preview.file}
          title={preview.title}
          context={preview.context}
          allowDownload={preview.allowDownload}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default SearchResults;
