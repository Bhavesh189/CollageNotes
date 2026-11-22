import React, { useState, useEffect, useMemo } from 'react';
import { semestersData } from '../data/notesData';
import { formatSize, fileSizes } from '../data/fileSizes';
import LoginModal from '../components/LoginModal';
import DocViewer from '../components/DocViewer';
import SyllabusCard from '../components/SyllabusCard';
import { ViewButton, OpenButton, ComingSoonButton, BookmarkButton } from '../components/NoteActions';
import { isBookmarked, toggleBookmark } from '../lib/bookmarks';
import { pyqSubjectsFor, pyqCountFor, latestPyqYear } from '../lib/subjectPyq';
import { useNoteMeta, metaFor, readingMins } from '../lib/noteMeta';
import {
  getProgressMap, getCollections, saveCollection, newCollectionId,
  getHistory, getShareCounts, recordShare,
} from '../lib/study';

// Daily quote (rotates by date, text only).
const QUOTES = [
  'Small steps every day beat big plans once a month.',
  'Read one note fully — then teach it to someone.',
  'Revision is not re-reading. It is re-recalling.',
  'The page you skip today is the question in the exam.',
  'One unit a day keeps the backlog away.',
  'Handwritten once is remembered twice.',
  'Done is better than perfect — finish the unit.',
];
const quoteOfDay = () => QUOTES[new Date().getDate() % QUOTES.length];

// Count files in a subject (notes + subnotes, skip placeholders)
const countNotes = (subject) =>
  (subject.notes || []).reduce(
    (n, note) => n + (note.subnotes ? note.subnotes.length : (note.isPlaceholder ? 0 : 1)),
    0
  );


const NotesHub = ({ currentSem, onNavigate, onNavigatePyq }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [pendingSubject, setPendingSubject] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preview, setPreview] = useState(null); // { file, title, context }
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'files' | 'recent'
  const [, setBmTick] = useState(0);
  // F3 — list tools on the subject detail view + home extras.
  const [unitFilter, setUnitFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // all | typed | handwritten | diagrams | formula | summary
  const [noteSort, setNoteSort] = useState('name'); // name | pages | least-read
  const [density, setDensity] = useState('comfortable'); // comfortable | compact
  const [listView, setListView] = useState('list'); // list | grid
  const [statusFilter, setStatusFilter] = useState('all'); // all | done | progress | fresh
  const [hideRead, setHideRead] = useState(false);
  const [pickerFor, setPickerFor] = useState(null); // file -> collection picker open
  const [newColName, setNewColName] = useState('');
  const [copiedSem, setCopiedSem] = useState(false);
  const manifest = useNoteMeta();
  const progressMap = useMemo(() => getProgressMap(), [selectedSubject, currentSem, preview]);
  const collections = useMemo(() => getCollections(), [pickerFor]);
  const recentHistory = useMemo(() => getHistory().slice(0, 6), [preview]);
  const shareCounts = useMemo(() => getShareCounts(), [preview]);

  // Check login state on mount
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(logged);
  }, []);

  // Open a note from elsewhere (My Study, chatbot): { file, title, context }
  // dispatched as 'bn-open-note' after navigating to the notes view.
  useEffect(() => {
    const onOpen = (e) => {
      const d = (e && e.detail) || {};
      if (!d.file) return;
      const source = (d.context && d.context.source) || 'notes';
      setPreview({
        file: d.file,
        title: d.title || d.file,
        context: d.context || { semester: semData.name, source },
        allowDownload: source === 'pyq' || source === 'syllabus',
      });
    };
    window.addEventListener('bn-open-note', onOpen);
    return () => window.removeEventListener('bn-open-note', onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset selected subject + grid controls when semester changes
  useEffect(() => {
    setSelectedSubject(null);
    setFilterText('');
  }, [currentSem]);

  const semData = semestersData[currentSem];
  if (!semData) return null;

  const visibleSubjects = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    const list = semData.subjects.filter((s) => !q || s.name.toLowerCase().includes(q));
    if (sortBy === 'files') {
      return [...list].sort((a, b) => countNotes(b) - countNotes(a) || a.name.localeCompare(b.name));
    }
    if (sortBy === 'recent') {
      return [...list].sort((a, b) => latestPyqYear(b.id) - latestPyqYear(a.id) || a.name.localeCompare(b.name));
    }
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [semData, filterText, sortBy]);

  const handleSubjectClick = (subject) => {
    if (subject.secured && !isAuthenticated) {
      setPendingSubject(subject);
      setIsLoginOpen(true);
      return;
    }

    setSelectedSubject(subject);
  };

  const handleUnlockSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    if (pendingSubject) {
      setSelectedSubject(pendingSubject);
      setPendingSubject(null);
    }
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  const handleToggleBookmark = (item) => {
    toggleBookmark(item);
    setBmTick((t) => t + 1);
  };

  // ---- F3 helpers -------------------------------------------------------
  // Flatten a subject's notes (incl. subnote folders) into uniform rows.
  const flatNotes = (subject) => {
    const rows = [];
    (subject.notes || []).forEach((note, index) => {
      if (note.subnotes) {
        note.subnotes.forEach((sub, sIdx) => {
          rows.push({ key: `${index}:${sIdx}`, note: sub, parent: note, index, sIdx, title: `${note.title} — ${sub.title}`, file: sub.file });
        });
      } else {
        rows.push({ key: `${index}`, note, parent: null, index, sIdx: null, title: note.title, file: note.file });
      }
    });
    return rows;
  };

  const unitOf = (title) => {
    const m = String(title || '').match(/unit\s*(\d+)/i);
    return m ? `Unit ${m[1]}` : 'Other';
  };

  const noteType = (row) => {
    const t = String(row.title || '').toLowerCase();
    if (/diagram|figure|sketch/.test(t)) return 'diagrams';
    if (/formula/.test(t)) return 'formula';
    if (/summary|revision|important|imp/.test(t)) return 'summary';
    const meta = metaFor(manifest, row.file);
    if (meta.typed === true) return 'typed';
    if (meta.typed === false) return 'handwritten';
    return 'typed';
  };

  const noteStatus = (row) => {
    const p = progressMap[row.file];
    if (!p) return 'fresh';
    if (p.done) return 'done';
    return Object.keys(p.pages || {}).length > 0 ? 'progress' : 'fresh';
  };

  // Per-subject progress: % done, last opened, next unread note.
  const subjectProgress = (sub) => {
    const rows = flatNotes(sub);
    let done = 0;
    let lastOpened = null;
    let lastAt = 0;
    let nextUnread = null;
    for (const r of rows) {
      const p = progressMap[r.file];
      if (p && p.done) done += 1;
      if (p && p.lastRead) {
        const at = new Date(p.lastRead).getTime();
        if (at > lastAt) {
          lastAt = at;
          lastOpened = r;
        }
      }
      if (!nextUnread && (!p || !p.done)) nextUnread = r;
    }
    return {
      total: rows.length,
      done,
      pct: rows.length ? Math.round((done / rows.length) * 100) : 0,
      lastOpened,
      nextUnread,
    };
  };

  const addToCollection = (row, colId) => {
    const cols = getCollections();
    const col = cols.find((c) => c.id === colId);
    if (!col) return;
    const items = col.items || [];
    if (!items.includes(row.file)) {
      saveCollection({ ...col, items: [...items, row.file] });
    }
    setPickerFor(null);
  };

  const createCollectionWith = (row) => {
    const name = newColName.trim();
    if (!name) return;
    const col = { id: newCollectionId(), name, color: '#1b7a43', items: [row.file], createdAt: Date.now(), archived: false };
    saveCollection(col);
    setNewColName('');
    setPickerFor(null);
  };

  const randomNote = () => {
    const all = [];
    (semData.subjects || []).forEach((sub) => {
      flatNotes(sub).forEach((r) => {
        const p = progressMap[r.file];
        if (!p || !p.done) all.push({ ...r, subject: sub });
      });
    });
    if (all.length === 0) return;
    const pick = all[Math.floor(Math.random() * all.length)];
    setPreview({ file: pick.file, title: pick.title, context: { semester: semData.name, semId: currentSem, source: 'notes' } });
  };

  const copySemLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${currentSem}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSem(true);
      setTimeout(() => setCopiedSem(false), 2000);
    } catch {
      window.prompt('Copy this semester link:', url);
    }
  };

  const shareNoteLink = async (row) => {
    const url = `${window.location.origin}${window.location.pathname}#${currentSem}`;
    const text = `${row.title} — Bhavesh Notes`;
    recordShare(row.file);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Bhavesh Notes', text, url });
        return;
      } catch {
        // user cancelled — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
    } catch {
      window.prompt('Copy this note link:', `${text} ${url}`);
    }
  };


  const subjectBadge = (sub) => {
    const n = countNotes(sub);
    if (n > 0) return `${n} file${n === 1 ? '' : 's'}`;
    if (pyqCountFor(sub.id) > 0) return 'PYQ papers';
    return 'Coming soon';
  };

  return (
    <div className="view-main">
      {/* Subject Panel Detail View */}
      {selectedSubject ? (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <button className="breadcrumb-link" onClick={handleBack} type="button">Dashboard</button>
            <span className="breadcrumb-sep">/</span>
            <button className="breadcrumb-link" onClick={handleBack} type="button">{semData.name}</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{selectedSubject.name}</span>
          </nav>
          <div className="subject-panel-header">
            <button className="back-btn" onClick={handleBack}>
              <i className="fa-solid fa-arrow-left"></i> Back to Grid
            </button>
            <h2 className="panel-title">{selectedSubject.name} Notes</h2>
            <div style={{ width: '80px' }}></div>
          </div>

          {/* F3 — list tools: unit + type filters, sort, density, view, status */}
          <div className="notes-tools glass">
            <div className="notes-tools-row">
              <span className="notes-tools-label">Unit</span>
              {['all', ...new Set(flatNotes(selectedSubject).map((r) => unitOf(r.title)))].map((u) => (
                <button
                  key={u}
                  type="button"
                  className={`viewer-chip ${unitFilter === u ? 'active' : ''}`}
                  onClick={() => setUnitFilter(u)}
                >
                  {u === 'all' ? 'All units' : u}
                </button>
              ))}
            </div>
            <div className="notes-tools-row">
              <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by note type">
                <option value="all">All types</option>
                <option value="typed">Typed</option>
                <option value="handwritten">Handwritten</option>
                <option value="diagrams">Diagrams</option>
                <option value="formula">Formula sheets</option>
                <option value="summary">Summaries</option>
              </select>
              <select className="form-select" value={noteSort} onChange={(e) => setNoteSort(e.target.value)} aria-label="Sort notes">
                <option value="name">Sort: Name A–Z</option>
                <option value="pages">Sort: Most pages</option>
                <option value="least-read">Sort: Least read first</option>
              </select>
              <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by reading status">
                <option value="all">Any status</option>
                <option value="fresh">Not started</option>
                <option value="progress">In progress</option>
                <option value="done">Done</option>
              </select>
              <button type="button" className={`viewer-chip ${hideRead ? 'active' : ''}`} onClick={() => setHideRead((h) => !h)} title="Show only unread notes">
                <i className="fa-solid fa-eye-slash"></i> Unread only
              </button>
              <button type="button" className={`viewer-chip ${density === 'compact' ? 'active' : ''}`} onClick={() => setDensity((d) => (d === 'compact' ? 'comfortable' : 'compact'))} title="Compact rows">
                <i className="fa-solid fa-bars-staggered"></i> Compact
              </button>
              <button type="button" className={`viewer-chip ${listView === 'grid' ? 'active' : ''}`} onClick={() => setListView((v) => (v === 'grid' ? 'list' : 'grid'))} title="Grid / list view">
                <i className={`fa-solid ${listView === 'grid' ? 'fa-list' : 'fa-grip'}`}></i> {listView === 'grid' ? 'List' : 'Grid'}
              </button>
              <button
                type="button"
                className="viewer-chip"
                title={`Search only inside ${selectedSubject.name}`}
                onClick={() => window.dispatchEvent(new CustomEvent('bn-search-set', { detail: { q: `sub:${selectedSubject.name.toLowerCase().split(/[\s&/()-]+/).filter(Boolean).map((w) => w[0]).join('')}` } }))}
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search in {selectedSubject.name} only
              </button>
              {unitFilter !== 'all' && (
                <button
                  type="button"
                  className="viewer-chip"
                  title={`Add every ${unitFilter} note to a collection`}
                  onClick={() => setPickerFor({ bulk: true, title: `${selectedSubject.name} — ${unitFilter}`, files: flatNotes(selectedSubject).filter((r) => unitOf(r.title) === unitFilter).map((r) => r.file) })}
                >
                  <i className="fa-solid fa-folder-plus"></i> Add {unitFilter} to collection
                </button>
              )}
            </div>
          </div>

          <div className={`notes-list-container ${density === 'compact' ? 'notes-list--compact' : ''} ${listView === 'grid' ? 'notes-list--grid' : ''}`}>
            {(() => {
              const rows = flatNotes(selectedSubject).filter((r) => {
                if (unitFilter !== 'all' && unitOf(r.title) !== unitFilter) return false;
                if (typeFilter !== 'all' && noteType(r) !== typeFilter) return false;
                const st = noteStatus(r);
                if (statusFilter !== 'all' && st !== statusFilter) return false;
                if (hideRead && st === 'done') return false;
                return true;
              });
              if (noteSort === 'pages') rows.sort((a, b) => (metaFor(manifest, b.file).pages || 0) - (metaFor(manifest, a.file).pages || 0));
              else if (noteSort === 'least-read') rows.sort((a, b) => (progressMap[a.file] ? Object.keys(progressMap[a.file].pages || {}).length : 0) - (progressMap[b.file] ? Object.keys(progressMap[b.file].pages || {}).length : 0));
              else rows.sort((a, b) => a.title.localeCompare(b.title));
              if (rows.length === 0) {
                const anyNotes = flatNotes(selectedSubject).length > 0;
                if (!anyNotes) {
                  return (
                    <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
                      <i className="fa-solid fa-hourglass-half coming-soon-icon"></i>
                      <h3>No notes uploaded yet</h3>
                      <p>We are currently compiling files for {selectedSubject.name}. Check back soon!</p>
                    </div>
                  );
                }
                return (
                  <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
                    <i className="fa-solid fa-filter coming-soon-icon"></i>
                    <h3>No notes match these filters</h3>
                    <p>Try a different unit, type or status — or clear the filters.</p>
                    <button
                      className="back-btn"
                      type="button"
                      style={{ margin: '1rem auto 0' }}
                      onClick={() => { setUnitFilter('all'); setTypeFilter('all'); setStatusFilter('all'); setHideRead(false); }}
                    >
                      <i className="fa-solid fa-filter-circle-xmark"></i> Clear filters
                    </button>
                  </div>
                );
              }
              return rows.map((row) => {
                const meta = metaFor(manifest, row.file);
                const mins = readingMins(meta.pages);
                const st = noteStatus(row);
                const prog = progressMap[row.file];
                if (row.note.isPlaceholder) {
                  return (
                    <div key={row.key} className="note-item glass note-item--placeholder">
                      <div className="note-item-left">
                        <i className="fa-solid fa-file-pdf note-item-icon"></i>
                        <span className="note-item-title">{row.title}<br /><small className="file-size">Coming soon</small></span>
                      </div>
                      <div className="note-item-right"><ComingSoonButton /></div>
                    </div>
                  );
                }
                const openRow = () => {
                  if (row.note.isExternal) {
                    window.open(row.file, '_blank', 'noopener,noreferrer');
                    return;
                  }
                  setPreview({ file: row.file, title: row.title, context: { semester: semData.name, semId: currentSem, source: 'notes' } });
                };
                const bmId = `note:${currentSem}:${selectedSubject.id}:${row.index}${row.sIdx !== null ? `:${row.sIdx}` : ''}`;
                const bmItem = { id: bmId, type: 'note', title: row.title, file: row.file, subject: selectedSubject.name, semesterName: semData.name, isExternal: !!row.note.isExternal };
                return (
                  <div key={row.key} className="note-item glass" onClick={openRow} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRow(); } }}>
                    <div className="note-item-left">
                      <i className={`fa-solid ${row.file && row.file.endsWith('.docx') ? 'fa-file-word' : 'fa-file-pdf'} note-item-icon`}></i>
                      <span className="note-item-title">
                        {row.title}
                        <br />
                        <small className="file-size">
                          {meta.pages ? `${meta.pages} pages · ~${mins} min` : ''}
                          {meta.typed === true ? ' · Typed' : meta.typed === false ? ' · Handwritten' : ''}
                          {prog && prog.lastPage > 0 ? ` · Resume p.${prog.lastPage}` : ''}
                          {st === 'done' ? ' · ✓ Done' : st === 'progress' ? ' · In progress' : ''}
                        </small>
                      </span>
                    </div>
                    <div className="note-item-right">
                      <BookmarkButton active={isBookmarked(bmId)} onClick={() => handleToggleBookmark(bmItem)} />
                      <button
                        type="button"
                        className="note-icon-btn"
                        title="Share this note (link only — never the file)"
                        aria-label={`Share ${row.title}`}
                        onClick={(e) => { e.stopPropagation(); shareNoteLink(row); }}
                      >
                        <i className="fa-solid fa-share-nodes"></i>
                      </button>
                      <button
                        type="button"
                        className="note-icon-btn"
                        title="Add to a collection"
                        aria-label={`Add ${row.title} to a collection`}
                        onClick={(e) => { e.stopPropagation(); setPickerFor({ file: row.file, title: row.title }); }}
                      >
                        <i className="fa-solid fa-folder-plus"></i>
                      </button>
                      <button
                        type="button"
                        className="note-icon-btn"
                        title="Copy a citation for this note"
                        aria-label={`Copy citation for ${row.title}`}
                        onClick={async (e) => {
                          e.stopPropagation();
                          const cite = `${row.title}, ${semData.name}, Bhavesh Notes — notes.thebhavesh.online`;
                          try {
                            await navigator.clipboard.writeText(cite);
                          } catch {
                            window.prompt('Copy this citation:', cite);
                          }
                        }}
                      >
                        <i className="fa-solid fa-quote-right"></i>
                      </button>
                      {row.note.isExternal ? (
                        <OpenButton file={row.file} label={`Open ${row.title}`} />
                      ) : (
                        <ViewButton onClick={(e) => { e.stopPropagation(); openRow(); }} label={`View ${row.title}`} />
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {pickerFor && (
            <div className="collection-picker glass" role="dialog" aria-label="Add to collection">
              <strong>Add {pickerFor.bulk ? `${pickerFor.title} (${pickerFor.files.length} notes)` : pickerFor.title} to…</strong>
              {collections.filter((c) => !c.archived).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="collection-picker-item"
                  onClick={() => {
                    if (pickerFor.bulk) {
                      const items = [...(c.items || [])];
                      pickerFor.files.forEach((f) => { if (!items.includes(f)) items.push(f); });
                      saveCollection({ ...c, items });
                      setPickerFor(null);
                    } else {
                      addToCollection({ file: pickerFor.file }, c.id);
                    }
                  }}
                >
                  <span className="collection-dot" style={{ background: c.color || '#1b7a43' }}></span> {c.name} ({(c.items || []).length})
                </button>
              ))}
              <div className="collection-picker-new">
                <input
                  type="text"
                  value={newColName}
                  placeholder="New collection name…"
                  aria-label="New collection name"
                  onChange={(e) => setNewColName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (pickerFor.bulk) {
                        saveCollection({ id: newCollectionId(), name: newColName.trim(), color: '#1b7a43', items: pickerFor.files, createdAt: Date.now(), archived: false });
                        setNewColName('');
                        setPickerFor(null);
                      } else {
                        createCollectionWith({ file: pickerFor.file });
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="viewer-chip"
                  onClick={() => {
                    if (pickerFor.bulk) {
                      if (!newColName.trim()) return;
                      saveCollection({ id: newCollectionId(), name: newColName.trim(), color: '#1b7a43', items: pickerFor.files, createdAt: Date.now(), archived: false });
                      setNewColName('');
                      setPickerFor(null);
                    } else {
                      createCollectionWith({ file: pickerFor.file });
                    }
                  }}
                >
                  Create
                </button>
                <button type="button" className="viewer-chip" onClick={() => setPickerFor(null)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Get PYQ — notes and PYQs are separate; this jumps to the PYQ
              view pre-filtered to this subject. */}
          {pyqSubjectsFor(selectedSubject.id).length > 0 && (
            <div className="get-pyq-card glass">
              <div className="get-pyq-text">
                <i className="fa-solid fa-file-lines get-pyq-icon"></i>
                <div>
                  <h3>Previous Year Papers</h3>
                  <p>{pyqCountFor(selectedSubject.id)} PYQ paper{pyqCountFor(selectedSubject.id) === 1 ? '' : 's'} available for {selectedSubject.name}.</p>
                </div>
              </div>
              <button
                type="button"
                className="get-pyq-btn"
                onClick={() => onNavigatePyq && onNavigatePyq(selectedSubject.id, selectedSubject.name)}
              >
                Get PYQ <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Grid of Subjects */
        <div style={{ width: '100%' }}>
          {semData.subjects.length > 0 ? (
            <>
              <SyllabusCard semId={currentSem} onPreview={setPreview} />
              {/* Home extras — welcome back, quote, pick-up rail, most shared */}
              <div className="home-extras">
                {recentHistory.length > 0 && (
                  <div className="home-extra-card glass">
                    <strong><i className="fa-solid fa-hand-wave"></i> Welcome back</strong>
                    <span>Last read: {recentHistory[0].title}</span>
                    <button
                      type="button"
                      className="home-extra-btn"
                      onClick={() => setPreview({ file: recentHistory[0].file, title: recentHistory[0].title, context: { semester: semData.name, semId: currentSem, source: 'notes' } })}
                    >
                      Continue <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                )}
                <div className="home-extra-card glass home-quote">
                  <strong><i className="fa-solid fa-quote-left"></i> Today</strong>
                  <span>{quoteOfDay()}</span>
                </div>
                <div className="home-extra-card glass">
                  <strong><i className="fa-solid fa-shuffle"></i> Can’t decide?</strong>
                  <span>Open a random unread note.</span>
                  <button type="button" className="home-extra-btn" onClick={randomNote}>
                    Surprise me <i className="fa-solid fa-dice"></i>
                  </button>
                </div>
                <div className="home-extra-card glass">
                  <strong><i className="fa-solid fa-route"></i> Start here — guided path</strong>
                  <span>
                    {(() => {
                      const total = semData.subjects.reduce((n, s) => n + flatNotes(s).length, 0);
                      const done = semData.subjects.reduce((n, s) => n + flatNotes(s).filter((r) => progressMap[r.file] && progressMap[r.file].done).length, 0);
                      return `${done}/${total} notes done in ${semData.name} — subject by subject, unit by unit.`;
                    })()}
                  </span>
                  <button
                    type="button"
                    className="home-extra-btn"
                    onClick={() => {
                      for (const sub of semData.subjects) {
                        const next = flatNotes(sub).find((r) => !progressMap[r.file] || !progressMap[r.file].done);
                        if (next) {
                          setPreview({ file: next.file, title: next.title, context: { semester: semData.name, semId: currentSem, source: 'guided-path' } });
                          return;
                        }
                      }
                      const first = semData.subjects[0] && flatNotes(semData.subjects[0])[0];
                      if (first) setPreview({ file: first.file, title: first.title, context: { semester: semData.name, semId: currentSem, source: 'guided-path' } });
                    }}
                  >
                    {semData.subjects.some((s) => flatNotes(s).some((r) => progressMap[r.file] && progressMap[r.file].done)) ? 'Continue the path' : 'Start the path'} <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              {recentHistory.length > 0 && (
                <div className="recent-rail">
                  <h3 className="recent-rail-title"><i className="fa-solid fa-clock-rotate-left"></i> Pick up where you left off</h3>
                  <div className="recent-rail-row">
                    {recentHistory.map((h) => (
                      <button
                        key={h.file + h.at}
                        type="button"
                        className="recent-rail-item glass"
                        onClick={() => setPreview({ file: h.file, title: h.title, context: { semester: semData.name, semId: currentSem, source: 'notes' } })}
                      >
                        <strong>{h.title}</strong>
                        <small>{h.subject || ''} · page {h.page || 1}</small>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {Object.keys(shareCounts).length > 0 && (
                <div className="shared-strip">
                  <strong><i className="fa-solid fa-share-nodes"></i> Most shared this week:</strong>
                  {Object.entries(shareCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([file, n]) => {
                    const allRows = [];
                    (semData.subjects || []).forEach((sub) => flatNotes(sub).forEach((r) => allRows.push(r)));
                    const row = allRows.find((r) => r.file === file);
                    if (!row) return null;
                    return (
                      <button
                        key={file}
                        type="button"
                        className="shared-strip-item"
                        onClick={() => setPreview({ file: row.file, title: row.title, context: { semester: semData.name, semId: currentSem, source: 'notes' } })}
                      >
                        {row.title} · {n} share{n === 1 ? '' : 's'}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="section-head">
                <h2>{semData.name}</h2>
                <span className="section-count">{semData.subjects.length} subjects</span>
                <button type="button" className="home-extra-btn" onClick={copySemLink} title="Copy a link that opens this semester">
                  <i className="fa-solid fa-link"></i> {copiedSem ? 'Link copied!' : 'Share semester'}
                </button>
              </div>
              <div className="grid-toolbar glass">
                <div className="grid-filter">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                  <input
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Filter subjects…"
                    aria-label="Filter subjects by name"
                  />
                </div>
                <select
                  className="form-select grid-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort subjects"
                >
                  <option value="name">Sort: Name A–Z</option>
                  <option value="files">Sort: Most files</option>
                  <option value="recent">Sort: Recently added</option>
                </select>
              </div>
              {visibleSubjects.length > 0 ? (
                <div className="subjects-grid">
                  {visibleSubjects.map((sub) => {
                    const n = countNotes(sub);
                    const prog = subjectProgress(sub);
                    return (
                      <div
                        key={sub.id}
                        className={`subject-card glass glass-hover ${sub.colorClass || ''}`}
                        onClick={() => handleSubjectClick(sub)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSubjectClick(sub); } }}
                      >
                        <div className="subject-card-img-wrapper">
                          <img src={sub.image} alt={sub.name} className="subject-card-img" loading="lazy" />
                          <div className="subject-card-scrim" aria-hidden="true" />
                          <div className="subject-card-overlay">
                            <h3 className="subject-card-name">{sub.name}</h3>
                            <span className="note-count-badge">
                              <i className="fa-solid fa-file"></i> {subjectBadge(sub)}
                            </span>
                          </div>
                          {sub.secured && (
                            <div className="secured-indicator">
                              <i className="fa-solid fa-shield-halved"></i> Secured
                            </div>
                          )}
                        </div>
                        {prog.total > 0 && (
                          <div className="subject-card-footer">
                            <span className="subject-progress-line">
                              <svg className="subject-ring" viewBox="0 0 36 36" width="22" height="22" aria-hidden="true">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="4" />
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1b7a43" strokeWidth="4" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset={97.4 * (1 - prog.pct / 100)} transform="rotate(-90 18 18)" />
                              </svg>
                              {prog.pct}% done · {prog.done}/{prog.total}
                            </span>
                            {prog.lastOpened && (
                              <span className="subject-last-line">Last: {prog.lastOpened.title.slice(0, 34)}{prog.lastOpened.title.length > 34 ? '…' : ''}</span>
                            )}
                            {prog.nextUnread && (
                              <span className="subject-next-line">Next: {prog.nextUnread.title.slice(0, 34)}{prog.nextUnread.title.length > 34 ? '…' : ''}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
                  <i className="fa-solid fa-magnifying-glass coming-soon-icon"></i>
                  <h3>No subjects match</h3>
                  <p>Try a different search term for {semData.name}.</p>
                </div>
              )}
            </>
          ) : (
            <div className="coming-soon-card glass" style={{ margin: '4rem auto' }}>
              <i className="fa-solid fa-laptop-code coming-soon-icon"></i>
              <h3>Semester Coming Soon</h3>
              <p>Notes for {semData.name} are currently under preparation. Stay tuned!</p>
            </div>
          )}
        </div>
      )}

      {/* Login modal check for secured notes */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onUnlock={handleUnlockSuccess}
      />

      {/* In-browser document preview — notes are protected (no download);
          the syllabus preview passes allowDownload: true via onPreview. */}
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

export default NotesHub;
