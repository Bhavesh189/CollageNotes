import React, { useState, useEffect, useCallback } from 'react';
import AiChat from './AiChat';
import DocViewer from './DocViewer';

// Floating assistant button — opens an IN-SITE chat popup (no redirect).
// The chat can preview documents via DocViewer without leaving the page.
const FloatingBot = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null); // { file, title }

  const closeAll = useCallback(() => {
    setPreview(null);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      // Let DocViewer consume Escape first when it's open
      if (e.key === 'Escape' && !preview) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, preview]);

  const handlePreview = useCallback((file, title) => {
    setPreview({ file, title });
  }, []);

  return (
    <>
      <div className="ai-bot-widget">
        <div className="ai-tooltip">
          {open ? 'Close assistant' : 'Ask the Notes Assistant 🤖'}
        </div>
        <button
          type="button"
          onClick={() => (open ? closeAll() : setOpen(true))}
          className="ai-bot-link"
          title="Notes Assistant"
          aria-label={open ? 'Close notes assistant' : 'Open notes assistant'}
          aria-expanded={open}
        >
          <i
            className={`fa-solid ${open ? 'fa-xmark' : 'fa-robot'} ai-bot-icon`}
            aria-hidden="true"
          ></i>
        </button>
      </div>

      {open && (
        <div
          className="aichat-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            className="aichat-popup glass"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Notes assistant chat"
          >
            <div className="aichat-header">
              <span>
                <i className="fa-solid fa-robot" style={{ marginRight: '8px' }}></i>
                Notes Assistant
              </span>
              <button
                type="button"
                className="docviewer-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <AiChat onPreview={handlePreview} />
          </div>
        </div>
      )}

      {preview && (
        <DocViewer
          file={preview.file}
          title={preview.title}
          onClose={() => setPreview(null)}
        />
      )}
    </>
  );
};

export default FloatingBot;
