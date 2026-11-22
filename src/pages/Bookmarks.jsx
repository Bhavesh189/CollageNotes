import React, { useState } from 'react';
import { getBookmarks, removeBookmark } from '../lib/bookmarks';
import DocViewer from '../components/DocViewer';
import { ViewButton, DownloadButton, OpenButton } from '../components/NoteActions';

// Saved notes & PYQ papers (localStorage). No account, no sync —
// bookmarks live in this browser only.
const Bookmarks = ({ onBrowseNotes }) => {
  const [preview, setPreview] = useState(null); // { file, title, context }
  const [items, setItems] = useState(() => getBookmarks());

  const handleRemove = (id) => {
    removeBookmark(id);
    setItems(getBookmarks());
  };

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

export default Bookmarks;
