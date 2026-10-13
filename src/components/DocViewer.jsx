import React, { useEffect } from 'react';

// In-browser document preview modal — no redirect, no new tab.
// PDFs render via the browser's native viewer; .doc/.docx go through
// the Google Docs viewer embed (needs the absolute public URL).
const isDocFile = (file) => /\.(docx?)$/i.test(file || '');

const DocViewer = ({ file, title, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  if (!file) return null;

  const viewerUrl = isDocFile(file)
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(
        window.location.origin + file
      )}&embedded=true`
    : file;

  return (
    <div
      className="docviewer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Document preview'}
    >
      <div
        className="docviewer-modal glass"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="docviewer-header">
          <span className="docviewer-title" title={title}>
            <i className="fa-solid fa-eye" style={{ marginRight: '8px' }}></i>
            {title || 'Document preview'}
          </span>
          <div className="docviewer-actions">
            <a
              href={file}
              download
              className="docviewer-btn"
              title="Download file"
              aria-label="Download file"
            >
              <i className="fa-solid fa-download"></i>
            </a>
            <button
              className="docviewer-btn"
              onClick={onClose}
              title="Close preview"
              aria-label="Close preview"
              type="button"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <iframe
          src={viewerUrl}
          className="docviewer-frame"
          title={title || 'Document preview'}
        />
      </div>
    </div>
  );
};

export default DocViewer;
