import React, { useState, useEffect, useMemo } from 'react';
import { semestersData } from '../data/notesData';
import { formatSize, fileSizes } from '../data/fileSizes';
import LoginModal from '../components/LoginModal';
import DocViewer from '../components/DocViewer';
import SyllabusCard from '../components/SyllabusCard';
import { ViewButton, OpenButton, ComingSoonButton, BookmarkButton } from '../components/NoteActions';
import { isBookmarked, toggleBookmark } from '../lib/bookmarks';
import { pyqSubjectsFor, pyqCountFor, latestPyqYear } from '../lib/subjectPyq';

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

  // Check login state on mount
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(logged);
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

          <div className="notes-list-container">
            {selectedSubject.notes && selectedSubject.notes.length > 0 ? (
              selectedSubject.notes.map((note, index) => {
                // If it's a secured subject containing sub-folders (like practical files)
                if (note.subnotes) {
                  return (
                    <div key={index} className="folder-card glass" style={{ '--i': index }}>
                      <div className="folder-header">
                        <i className="fa-solid fa-folder-open"></i>
                        <span>{note.title}</span>
                      </div>
                      <div className="folder-notes-grid">
                        {note.subnotes.map((sub, sIdx) => {
                          const openSub = () => {
                            if (sub.isExternal) {
                              window.open(sub.file, '_blank', 'noopener,noreferrer');
                            } else {
                              setPreview({ file: sub.file, title: sub.title, context: { semester: semData.name, source: 'notes' } });
                            }
                          };
                          const bmId = `note:${currentSem}:${selectedSubject.id}:${index}:${sIdx}`;
                          const bmItem = { id: bmId, type: 'note', title: `${note.title} — ${sub.title}`, file: sub.file, subject: selectedSubject.name, semesterName: semData.name, isExternal: !!sub.isExternal };
                          return (
                            <div
                              key={sIdx}
                              className="folder-note-row"
                              onClick={openSub}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSub(); } }}
                            >
                              <span className="folder-note-title">{sub.title}</span>
                              <span className="folder-note-meta">
                                {fileSizes[sub.file] != null && <span className="file-size">{formatSize(fileSizes[sub.file])}</span>}
                                <BookmarkButton active={isBookmarked(bmId)} onClick={() => handleToggleBookmark(bmItem)} />
                                {sub.isExternal ? (
                                  <OpenButton file={sub.file} label={`Open ${sub.title}`} />
                                ) : (
                                  <>
                                    <ViewButton onClick={(e) => { e.stopPropagation(); openSub(); }} label={`View ${sub.title}`} />
                                  </>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                // Normal Note — explicit View button (whole row opens View)
                const openView = () => {
                  if (note.isPlaceholder) {
                    alert("Note has not been uploaded yet! Coming soon.");
                    return;
                  }
                  if (note.isExternal) {
                    window.open(note.file, '_blank', 'noopener,noreferrer');
                    return;
                  }
                  if (note.file) setPreview({ file: note.file, title: note.title, context: { semester: semData.name, source: 'notes' } });
                };
                const bmId = `note:${currentSem}:${selectedSubject.id}:${index}`;
                const bmItem = { id: bmId, type: 'note', title: note.title, file: note.file, subject: selectedSubject.name, semesterName: semData.name, isExternal: !!note.isExternal };
                return (
                  <div
                    key={index}
                    className="note-item glass"
                    style={{ '--i': index }}
                    onClick={openView}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openView(); } }}
                  >
                    <div className="note-item-left">
                      <i className={`fa-solid ${note.file && note.file.endsWith('.docx') ? 'fa-file-word' : 'fa-file-pdf'} note-item-icon`}></i>
                      <span className="note-item-title">
                        {note.title}
                        {note.file && fileSizes[note.file] != null && !note.isExternal && (
                          <><br /><small className="file-size">{formatSize(fileSizes[note.file])}</small></>
                        )}
                      </span>
                    </div>
                    <div className="note-item-right">
                      {!note.isPlaceholder && (
                        <BookmarkButton active={isBookmarked(bmId)} onClick={() => handleToggleBookmark(bmItem)} />
                      )}
                      {note.isPlaceholder ? (
                        <ComingSoonButton />
                      ) : note.isExternal ? (
                        <OpenButton file={note.file} label={`Open ${note.title}`} />
                      ) : (
                        <>
                          <ViewButton onClick={(e) => { e.stopPropagation(); openView(); }} label={`View ${note.title}`} />
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="coming-soon-card glass" style={{ margin: '2rem auto' }}>
                <i className="fa-solid fa-hourglass-half coming-soon-icon"></i>
                <h3>No notes uploaded yet</h3>
                <p>We are currently compiling files for {selectedSubject.name}. Check back soon!</p>
              </div>
            )}
          </div>

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
              <div className="section-head">
                <h2>{semData.name}</h2>
                <span className="section-count">{semData.subjects.length} subjects</span>
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
