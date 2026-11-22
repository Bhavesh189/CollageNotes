import React, { useState, useMemo, useEffect } from 'react';
import { getBookmarks, removeBookmark } from '../lib/bookmarks';
import DocViewer from '../components/DocViewer';
import { ViewButton, DownloadButton, OpenButton } from '../components/NoteActions';
import {
  getCollections, saveCollection, deleteCollection, newCollectionId,
  getFlashcards, addFlashcard, deleteFlashcard, reviewFlashcard, getFlashcardsDue,
  getQuiz, addQuizQA, deleteQuizQA, getProgressMap,
} from '../lib/study';
import { getAllMarks } from '../lib/pageMarks';
import { useNoteMeta, metaFor, readingMins, dirFor } from '../lib/noteMeta';

// Saved notes & PYQ papers (localStorage) + named collections, a read-later
// queue, page bookmarks, confusing pages, and self-made flashcards / quiz.
// Everything is local — no account, no sync.
const Bookmarks = ({ onBrowseNotes }) => {
  const [preview, setPreview] = useState(null); // { file, title, context }
  const [items, setItems] = useState(() => getBookmarks());
  const [collections, setCollections] = useState(() => getCollections());
  const [openCol, setOpenCol] = useState(null); // collection id open
  const [newCol, setNewCol] = useState('');
  const [renameId, setRenameId] = useState(null);
  const [renameVal, setRenameVal] = useState('');
  const [printCol, setPrintCol] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const [queueIdx, setQueueIdx] = useState(0);
  const [flipId, setFlipId] = useState(null);
  const [fcFile, setFcFile] = useState('');
  const [fcFront, setFcFront] = useState('');
  const [fcBack, setFcBack] = useState('');
  const [quizFile, setQuizFile] = useState('');
  const [quizQ, setQuizQ] = useState('');
  const [quizA, setQuizA] = useState('');
  const [showAnswer, setShowAnswer] = useState({});
  const manifest = useNoteMeta();
  const progressMap = useMemo(() => getProgressMap(), [preview]);

  const refreshCols = () => setCollections(getCollections());
  useEffect(() => {
    const onImport = (e) => {
      const d = (e && e.detail) || {};
      if (!d.name || !Array.isArray(d.items)) return;
      saveCollection({ id: newCollectionId(), name: d.name, color: '#1b7a43', items: d.items, createdAt: Date.now(), archived: false });
      refreshCols();
      setShareMsg(`Imported collection “${d.name}” (${d.items.length} notes).`);
    };
    window.addEventListener('bn-import-collection', onImport);
    return () => window.removeEventListener('bn-import-collection', onImport);
  }, []);

  const handleRemove = (id) => {
    removeBookmark(id);
    setItems(getBookmarks());
  };

  const openFile = (file, title, context, next) => {
    setPreview({ file, title, context: context || { semester: '', source: 'bookmarks' }, allowDownload: false, next });
  };

  // Open at an exact page: the viewer resumes to the stored page.
  const openAtPage = (file, title, page) => {
    try {
      localStorage.setItem(`bn-viewer-page:${file}`, String(page));
    } catch { /* ignore */ }
    openFile(file, title, { semester: '', source: 'bookmarks' });
  };

  const pageBookmarks = useMemo(() => getAllMarks('pb'), [preview]);
  const flaggedPages = useMemo(() => getAllMarks('flags').filter((m) => m.value === 'confusing'), [preview]);
  const dueCards = useMemo(() => getFlashcardsDue(), [preview, flipId]);

  const titleFor = (file) => {
    const b = items.find((i) => i.file === file);
    if (b) return b.title;
    const col = collections.flatMap((c) => c.items || []).includes(file);
    return col ? file.split('/').pop().replace(/\.pdf$/i, '') : file.split('/').pop().replace(/\.pdf$/i, '');
  };

  const colStats = (col) => {
    const files = col.items || [];
    let pages = 0;
    let done = 0;
    for (const f of files) {
      const m = metaFor(manifest, f);
      pages += m.pages || 0;
      if (progressMap[f] && progressMap[f].done) done += 1;
    }
    return { n: files.length, pages, mins: readingMins(pages), done, pct: files.length ? Math.round((done / files.length) * 100) : 0 };
  };

  const shareCollection = async (col) => {
    const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ name: col.name, items: col.items || [] }))));
    const url = `${window.location.origin}${window.location.pathname}#col=${payload}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg(`Link copied — opening it on any device rebuilds “${col.name}”.`);
      setTimeout(() => setShareMsg(''), 4000);
    } catch {
      window.prompt('Copy this collection link:', url);
    }
  };

  const moveItem = (col, idx, dir) => {
    const itemsArr = [...(col.items || [])];
    const j = idx + dir;
    if (j < 0 || j >= itemsArr.length) return;
    [itemsArr[idx], itemsArr[j]] = [itemsArr[j], itemsArr[idx]];
    saveCollection({ ...col, items: itemsArr });
    refreshCols();
  };

  const startQueue = (col) => {
    const files = col.items || [];
    if (files.length === 0) return;
    setQueueIdx(0);
    const next = (i) => {
      const f = files[i];
      if (!f) return null;
      return () => {
        const ni = i + 1;
        setQueueIdx(ni);
        if (ni < files.length) openFile(files[ni], titleFor(files[ni]), { semester: '', source: 'bookmarks' }, next(ni));
        else setPreview(null);
      };
    };
    openFile(files[0], titleFor(files[0]), { semester: '', source: 'bookmarks' }, next(1));
  };

  const openColObj = collections.find((c) => c.id === openCol);
  const visibleCols = collections.filter((c) => !c.archived);
  const archivedCols = collections.filter((c) => c.archived);

  return (
    <div className="view-main">
      <div className="subject-panel-header">
        <div style={{ width: '80px' }}></div>
        <h2 className="panel-title">
          <i className="fa-solid fa-bookmark" style={{ marginRight: '10px' }}></i>
          Your Bookmarks
        </h2>
        <div style={{ width: '80px' }}></div>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
        {items.length > 0
          ? `${items.length} saved item${items.length === 1 ? '' : 's'} — stored in this browser only.`
          : 'Notes and PYQ papers you save will show up here.'}
      </p>

      {/* ---- Collections ---- */}
      <div className="collections-section">
        <h3><i className="fa-solid fa-layer-group"></i> Collections</h3>
        <div className="collection-new-row">
          <input
            type="text"
            value={newCol}
            placeholder="New collection — e.g. Endsem Revision"
            aria-label="New collection name"
            onChange={(e) => setNewCol(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newCol.trim()) {
                saveCollection({ id: newCollectionId(), name: newCol.trim(), color: '#1b7a43', items: [], createdAt: Date.now(), archived: false });
                setNewCol('');
                refreshCols();
              }
            }}
          />
          <button
            type="button"
            className="viewer-chip"
            onClick={() => {
              if (!newCol.trim()) return;
              saveCollection({ id: newCollectionId(), name: newCol.trim(), color: '#1b7a43', items: [], createdAt: Date.now(), archived: false });
              setNewCol('');
              refreshCols();
            }}
          >
            Create collection
          </button>
        </div>
        {shareMsg && <p className="study-export-msg">{shareMsg}</p>}
        {visibleCols.length === 0 ? (
          <p className="study-empty">No collections yet — group notes for revision (e.g. “Weak Topics”, “Formula Sheets”). A note can live in several collections.</p>
        ) : (
          <div className="collections-grid">
            {visibleCols.map((col) => {
              const st = colStats(col);
              const coverFile = (col.items || [])[0];
              const coverDir = coverFile ? dirFor(manifest, coverFile) : null;
              return (
                <div key={col.id} className="collection-card glass">
                  {coverDir && (
                    <img src={`/generated/${coverDir}/page-001.jpg`} alt="" className="collection-cover" loading="lazy" />
                  )}
                  <div className="collection-card-body">
                    {renameId === col.id ? (
                      <span className="collection-rename">
                        <input value={renameVal} onChange={(e) => setRenameVal(e.target.value)} aria-label="Collection name" />
                        <button type="button" onClick={() => { saveCollection({ ...col, name: renameVal.trim() || col.name }); setRenameId(null); refreshCols(); }}>Save</button>
                      </span>
                    ) : (
                      <strong>{col.name}</strong>
                    )}
                    <span className="collection-meta">{st.n} note{st.n === 1 ? '' : 's'} · {st.pages} pages · ~{st.mins || 0} min</span>
                    <div className="study-progress"><div style={{ width: `${st.pct}%` }} /></div>
                    <span className="collection-meta">{st.done}/{st.n} done · {st.pct}%</span>
                    <div className="collection-actions">
                      <button type="button" className="viewer-chip" onClick={() => setOpenCol(openCol === col.id ? null : col.id)}>
                        {openCol === col.id ? 'Close' : 'Open'}
                      </button>
                      <button type="button" className="viewer-chip" onClick={() => startQueue(col)} title="Open the first note; Next advances through the queue">
                        <i className="fa-solid fa-play"></i> Queue
                      </button>
                      <button type="button" className="viewer-chip" onClick={() => shareCollection(col)} title="Copy a link that rebuilds this collection">
                        <i className="fa-solid fa-share-nodes"></i> Share
                      </button>
                      <button type="button" className="viewer-chip" onClick={() => setPrintCol(col)} title="Printable checklist (titles + checkboxes)">
                        <i className="fa-solid fa-print"></i> Print
                      </button>
                      <button
                        type="button"
                        className="viewer-chip"
                        onClick={() => {
                          saveCollection({ ...col, id: newCollectionId(), name: `${col.name} (copy)`, createdAt: Date.now() });
                          refreshCols();
                        }}
                      >
                        Duplicate
                      </button>
                      <label className="collection-color" title="Collection colour">
                        <input
                          type="color"
                          value={col.color || '#1b7a43'}
                          aria-label="Collection colour"
                          onChange={(e) => { saveCollection({ ...col, color: e.target.value }); refreshCols(); }}
                        />
                      </label>
                      <button type="button" className="viewer-chip" onClick={() => { setRenameId(col.id); setRenameVal(col.name); }}>Rename</button>
                      <button type="button" className="viewer-chip" onClick={() => { saveCollection({ ...col, archived: true }); refreshCols(); }}>Archive</button>
                      <button
                        type="button"
                        className="viewer-chip danger"
                        onClick={() => { if (window.confirm(`Delete collection “${col.name}”? The notes stay saved.`)) { deleteCollection(col.id); refreshCols(); } }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {archivedCols.length > 0 && (
          <p className="study-empty">
            Archived: {archivedCols.map((c) => c.name).join(', ')} —{' '}
            {archivedCols.map((c) => (
              <button key={c.id} type="button" className="search-trend-btn" onClick={() => { saveCollection({ ...c, archived: false }); refreshCols(); }}>
                restore {c.name}
              </button>
            ))}
          </p>
        )}
        {openColObj && (
          <div className="collection-detail glass">
            <h4>{openColObj.name} — {openColObj.items?.length || 0} notes</h4>
            {(openColObj.items || []).length === 0 ? (
              <p className="study-empty">Empty — add notes from any note card (folder-plus button).</p>
            ) : (
              <div className="notes-list-container">
                {openColObj.items.map((f, idx) => (
                  <div
                    key={f}
                    className="note-item glass"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', String(idx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const from = Number(e.dataTransfer.getData('text/plain'));
                      if (Number.isFinite(from) && from !== idx) {
                        const arr = [...(openColObj.items || [])];
                        const [moved] = arr.splice(from, 1);
                        arr.splice(idx, 0, moved);
                        saveCollection({ ...openColObj, items: arr });
                        refreshCols();
                      }
                    }}
                  >
                    <div className="note-item-left">
                      <i className="fa-solid fa-grip-vertical" aria-hidden="true"></i>
                      <span className="note-item-title">{titleFor(f)}</span>
                    </div>
                    <div className="note-item-right">
                      <button type="button" className="note-icon-btn" aria-label="Move up" onClick={() => moveItem(openColObj, idx, -1)}>↑</button>
                      <button type="button" className="note-icon-btn" aria-label="Move down" onClick={() => moveItem(openColObj, idx, 1)}>↓</button>
                      <button type="button" className="viewer-chip" onClick={() => openFile(f, titleFor(f), { semester: '', source: 'bookmarks' })}>Open</button>
                      <button
                        type="button"
                        className="viewer-chip danger"
                        onClick={() => {
                          saveCollection({ ...openColObj, items: (openColObj.items || []).filter((x) => x !== f) });
                          refreshCols();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---- Page bookmarks + confusing pages ---- */}
      {(pageBookmarks.length > 0 || flaggedPages.length > 0) && (
        <div className="collections-section">
          {pageBookmarks.length > 0 && (
            <>
              <h3><i className="fa-solid fa-bookmark"></i> Saved pages</h3>
              <div className="notes-list-container">
                {pageBookmarks.map((pb) => (
                  <button key={`${pb.file}:${pb.page}`} type="button" className="note-item glass" onClick={() => openAtPage(pb.file, titleFor(pb.file), pb.page)}>
                    <span className="note-item-left"><span className="note-item-title">{titleFor(pb.file)} — page {pb.page}</span></span>
                    <span className="note-item-right"><span className="viewer-chip">Open p.{pb.page}</span></span>
                  </button>
                ))}
              </div>
            </>
          )}
          {flaggedPages.length > 0 && (
            <>
              <h3><i className="fa-solid fa-circle-question"></i> Confusing pages — re-read these</h3>
              <div className="notes-list-container">
                {flaggedPages.map((fp) => (
                  <button key={`${fp.file}:${fp.page}`} type="button" className="note-item glass" onClick={() => openAtPage(fp.file, titleFor(fp.file), fp.page)}>
                    <span className="note-item-left"><span className="note-item-title">{titleFor(fp.file)} — page {fp.page}</span></span>
                    <span className="note-item-right"><span className="viewer-chip">Re-read</span></span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ---- Flashcards: review due + make your own ---- */}
      <div className="collections-section">
        <h3><i className="fa-solid fa-layer-group"></i> Flashcards {dueCards.length > 0 && `— ${dueCards.length} due`}</h3>
        {dueCards.length === 0 ? (
          <p className="study-empty">No flashcards due. Make your own below — front/back cards you type yourself, reviewed with Again / Hard / Easy.</p>
        ) : (
          <div className="flash-grid">
            {dueCards.slice(0, 6).map((c) => (
              <div key={c.id} className="flash-card glass">
                <button type="button" className="flash-face" onClick={() => setFlipId(flipId === c.id ? null : c.id)}>
                  <small>{titleFor(c.file)}</small>
                  <strong>{flipId === c.id ? c.back : c.front}</strong>
                  <span>{flipId === c.id ? 'Tap to see the question' : 'Tap to flip'}</span>
                </button>
                <div className="flash-grade">
                  {['again', 'hard', 'easy'].map((g) => (
                    <button key={g} type="button" className="viewer-chip" onClick={() => { reviewFlashcard(c.file, c.id, g); setFlipId(null); }}>
                      {g === 'again' ? 'Again' : g === 'hard' ? 'Hard' : 'Easy'}
                    </button>
                  ))}
                  <button type="button" className="viewer-chip danger" onClick={() => deleteFlashcard(c.file, c.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flash-make">
          <select value={fcFile} onChange={(e) => setFcFile(e.target.value)} aria-label="Flashcard note" className="form-select">
            <option value="">Pick a note for the card…</option>
            {items.filter((i) => i.type === 'note').map((i) => (
              <option key={i.file} value={i.file}>{i.title}</option>
            ))}
          </select>
          <input type="text" value={fcFront} placeholder="Front — the question" aria-label="Flashcard front" onChange={(e) => setFcFront(e.target.value)} />
          <input type="text" value={fcBack} placeholder="Back — the answer" aria-label="Flashcard back" onChange={(e) => setFcBack(e.target.value)} />
          <button
            type="button"
            className="viewer-chip"
            onClick={() => {
              if (!fcFile) return;
              const c = addFlashcard(fcFile, fcFront, fcBack);
              if (c) { setFcFront(''); setFcBack(''); setFlipId(null); }
            }}
          >
            Add flashcard
          </button>
        </div>
        <div className="flash-make">
          <select value={quizFile} onChange={(e) => setQuizFile(e.target.value)} aria-label="Quiz note" className="form-select">
            <option value="">Pick a note for a quiz question…</option>
            {items.filter((i) => i.type === 'note').map((i) => (
              <option key={i.file} value={i.file}>{i.title}</option>
            ))}
          </select>
          <input type="text" value={quizQ} placeholder="Question" aria-label="Quiz question" onChange={(e) => setQuizQ(e.target.value)} />
          <input type="text" value={quizA} placeholder="Answer" aria-label="Quiz answer" onChange={(e) => setQuizA(e.target.value)} />
          <button
            type="button"
            className="viewer-chip"
            onClick={() => {
              if (!quizFile) return;
              const q = addQuizQA(quizFile, quizQ, quizA);
              if (q) { setQuizQ(''); setQuizA(''); }
            }}
          >
            Add question
          </button>
        </div>
        {quizFile && getQuiz(quizFile).length > 0 && (
          <div className="quiz-list">
            {getQuiz(quizFile).map((q) => (
              <div key={q.id} className="quiz-item glass">
                <strong>Q: {q.q}</strong>
                {showAnswer[q.id] ? (
                  <span>A: {q.a}</span>
                ) : (
                  <button type="button" className="viewer-chip" onClick={() => setShowAnswer((s) => ({ ...s, [q.id]: true }))}>Reveal answer</button>
                )}
                <button type="button" className="viewer-chip danger" onClick={() => deleteQuizQA(quizFile, q.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---- Saved bookmarks list ---- */}
      {items.length > 0 ? (
        <div className="notes-list-container">
          {items.map((b, index) => {
            const openView = () => {
              if (b.isExternal) {
                window.open(b.file, '_blank', 'noopener,noreferrer');
                return;
              }
              setPreview({ file: b.file, title: b.title, context: { semester: b.semesterName, source: 'bookmarks' }, allowDownload: b.type === 'pyq' });
            };
            return (
              <div
                key={b.id}
                className="note-item glass"
                style={{ '--i': Math.min(index, 12) }}
                onClick={openView}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openView(); } }}
              >
                <div className="note-item-left">
                  <i className={`fa-solid ${b.type === 'pyq' ? 'fa-file-lines' : 'fa-file-pdf'} note-item-icon`}></i>
                  <span className="note-item-title">
                    <span className={`result-badge ${b.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>
                      {b.type === 'pyq' ? 'PYQ' : 'Note'}
                    </span>{' '}
                    {b.title}
                    <br />
                    <small className="result-meta">
                      {b.subject}
                      {b.semesterName ? ` · ${b.semesterName}` : ''}
                    </small>
                  </span>
                </div>
                <div className="note-item-right">
                  <button
                    type="button"
                    className="action-btn action-remove"
                    onClick={(e) => { e.stopPropagation(); handleRemove(b.id); }}
                    title="Remove bookmark"
                    aria-label={`Remove bookmark: ${b.title}`}
                  >
                    <i className="fa-solid fa-xmark"></i>
                    <span>Remove</span>
                  </button>
                  {b.isExternal ? (
                    <OpenButton file={b.file} label={`Open ${b.title}`} />
                  ) : (
                    <>
                      <ViewButton onClick={(e) => { e.stopPropagation(); openView(); }} label={`View ${b.title}`} />
                      {b.type === 'pyq' && <DownloadButton file={b.file} label={`Download ${b.title}`} />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
          <i className="fa-solid fa-bookmark coming-soon-icon"></i>
          <h3>No bookmarks yet</h3>
          <p>Tap the bookmark icon on any note or PYQ paper to save it here for quick access.</p>
          <button className="back-btn" onClick={onBrowseNotes} type="button" style={{ margin: '1rem auto 0' }}>
            <i className="fa-solid fa-graduation-cap"></i> Browse notes
          </button>
        </div>
      )}

      {printCol && (
        <div className="print-only" aria-hidden="true">
          <h2>{printCol.name} — checklist</h2>
          <p>CollageNotes · titles only (notes themselves are view-only).</p>
          {(printCol.items || []).map((f) => (
            <label key={f} className="print-row">
              <input type="checkbox" /> {titleFor(f)}
            </label>
          ))}
        </div>
      )}
      {printCol && (
        <div className="print-actions">
          <button type="button" className="viewer-chip" onClick={() => { window.print(); }}>Print this checklist</button>
          <button type="button" className="viewer-chip" onClick={() => setPrintCol(null)}>Close</button>
        </div>
      )}

      {preview && (
        <DocViewer
          file={preview.file}
          title={preview.title}
          context={preview.context}
          allowDownload={preview.allowDownload}
          onOpenNext={preview.next}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default Bookmarks;
