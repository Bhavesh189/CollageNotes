import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// pdf.js worker bundled by Vite (pdfjs-dist ships the .mjs worker).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const isDocFile = (file) => /\.(docx?)$/i.test(file || '');
const isPdfFile = (file) => /\.pdf$/i.test(file || '');

// In-browser document preview modal — no redirect, no new tab.
// PDFs render with pdf.js (react-pdf): page navigation + zoom, works offline
// with the static files in /public. .doc/.docx still go through the Google
// Docs viewer embed (needs the absolute public URL). Anything else falls
// back to the browser's native handling in an iframe.
const DocViewer = ({ file, title, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loadError, setLoadError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const pageWrapRef = useRef(null);

  // Fit the PDF page to the modal width; re-measure on resize.
  useEffect(() => {
    const el = pageWrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  // Reset paging whenever a different file is opened.
  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setScale(1.0);
    setLoadError(false);
  }, [file]);

  if (!file) return null;

  const showPdf = isPdfFile(file) && !loadError;
  const viewerUrl = isDocFile(file)
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(
        window.location.origin + file
      )}&embedded=true`
    : file;

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p));
  const zoomOut = () => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.0, +(s + 0.2).toFixed(2)));

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

        {showPdf && (
          <div className="pdf-toolbar">
            <button type="button" className="pdf-nav-btn" onClick={goPrev} disabled={pageNumber <= 1} aria-label="Previous page">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="pdf-page-label">
              Page {pageNumber}{numPages ? ` of ${numPages}` : ''}
            </span>
            <button type="button" className="pdf-nav-btn" onClick={goNext} disabled={!numPages || pageNumber >= numPages} aria-label="Next page">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <span className="pdf-toolbar-spacer" />
            <button type="button" className="pdf-nav-btn" onClick={zoomOut} disabled={scale <= 0.6} aria-label="Zoom out">
              <i className="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <span className="pdf-zoom-label">{Math.round(scale * 100)}%</span>
            <button type="button" className="pdf-nav-btn" onClick={zoomIn} disabled={scale >= 2.0} aria-label="Zoom in">
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
          </div>
        )}

        <div className="docviewer-body" ref={pageWrapRef}>
          {showPdf ? (
            <Document
              file={file}
              onLoadSuccess={({ numPages: n }) => { setNumPages(n); setLoadError(false); }}
              onLoadError={() => setLoadError(true)}
              loading={<div className="pdf-loading">Loading PDF…</div>}
              error={<div className="pdf-error">Could not load this PDF.</div>}
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth ? Math.floor(containerWidth * scale) : undefined}
                scale={containerWidth ? undefined : scale}
                renderTextLayer
                renderAnnotationLayer
              />
            </Document>
          ) : loadError ? (
            <div className="pdf-error-wrap">
              <p>Could not preview this file here.</p>
              <a href={file} download className="action-btn action-view">
                <i className="fa-solid fa-download"></i>
                <span>Download instead</span>
              </a>
            </div>
          ) : (
            <iframe
              src={viewerUrl}
              className="docviewer-frame"
              title={title || 'Document preview'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocViewer;
