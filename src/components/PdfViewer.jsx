import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { trackEvent } from '../lib/analytics';
import { recordPageView, recordSession } from '../lib/study';

// pdf.js worker bundled by Vite (pdfjs-dist ships the .mjs worker).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const isDocFile = (file) => /\.(docx?)$/i.test(file || '');
const isPdfFile = (file) => /\.pdf$/i.test(file || '');

// In-browser document preview modal — no redirect, no new tab.
// PDFs render with pdf.js (react-pdf). .doc/.docx still go through the
// Google Docs viewer embed (needs the absolute public URL).
//
// PDF VIEWER — for PYQ / syllabus files (allowDownload true). Notes
// render as page IMAGES in ImageViewer.jsx instead (the browser never
// receives a notes PDF); DocViewer.jsx picks between the two by
// allowDownload. This file keeps the full PDF toolbar: Download button,
// text layer ON (selectable, as the old viewer had it), no watermark, no
// copy block, no blur deterrent — blocking copy would be incoherent when
// the PDF itself downloads. (The notes-mode copy protection that used to
// live here — no text layer, watermark, deterrents — now lives in
// ImageViewer.jsx, where it belongs.)
//
// COPY PROTECTION (notes mode only), by design:
//  - renderTextLayer={false} — no selectable text layer;
//  - no file-save button anywhere (not in the header, not on errors);
//  - user-select:none on the page area, context menu + copy/cut/save
//    shortcuts blocked inside the modal (inputs exempt);
//  - a diagonal "thebhavesh.online" watermark overlays every page;
//  - SCREENSHOT DETERRENTS (not a guarantee — see below): the page blurs
//    the moment the window loses focus or the tab is hidden (app-switch /
//    screen-share), the PrintScreen key is blocked + briefly blurs, and
//    long-press context menu is disabled. Honest limit: NO website can
//    block OS-level screenshots (desktop PrintScreen/Snipping Tool, mobile
//    OS capture all bypass the page). These deterrents stop casual copying;
//    the watermark is the real traceability. Never claim "screenshot-proof"
//    in any UI copy.
// Search works against the loaded PDF (pdf.getPage(i).getTextContent()) —
// page-level matches, jump to a match's page. NO word-level highlight:
// highlighting needs the text layer, which is off in notes mode (trade-off).
// `context` is optional metadata for analytics: { semester, source }.
//
// NEW (2026-11-22): RESUME READING — the last page read is remembered per
// file (localStorage) and the viewer reopens there. ZOOM MEMORY — the
// fit-width / zoom level is remembered across opens.
const SEARCH_MIN_LEN = 2;
const SEARCH_DEBOUNCE_MS = 300;
const BLUR_MS_AFTER_PRINTSCREEN = 1500;
const ZOOM_LEVELS = [0.6, 0.8, 1.0, 1.25, 1.5, 2.0];

const PAGE_KEY = (f) => `bn-viewer-page:${f}`;
const ZOOM_KEY = 'bn-viewer-zoom';

const PdfViewer = ({ file, title, onClose, context, allowDownload }) => {
  // PYQ / syllabus = downloadable (download button, text layer, no
  // deterrents). Notes = protected. Default (no prop) = protected.
  const downloadable = !!allowDownload;
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [scale, setScale] = useState(1.0);
  const [fitWidth, setFitWidth] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  // matches: [{ page, count }] — one entry per page that contains a hit.
  const [matches, setMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const modalRef = useRef(null);
  const pageWrapRef = useRef(null);
  const numPagesRef = useRef(null);
  const pageRef = useRef(1);
  const searchRunRef = useRef(0);
  const blurTimerRef = useRef(null);
  // Resume-reading target, read on open and consumed once the PDF loads.
  const resumePageRef = useRef(null);

  const totalMatches = useMemo(
    () => matches.reduce((sum, m) => sum + m.count, 0),
    [matches],
  );

  useEffect(() => {
    numPagesRef.current = numPages;
  }, [numPages]);

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

  // Fullscreen state (for the toolbar toggle icon/label).
  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // Screenshot deterrent (NOTES MODE ONLY): blur the page the moment the
  // window loses focus or the tab is hidden (app-switch / screen-share).
  // Un-blur on return. Skipped entirely for downloadable files.
  useEffect(() => {
    if (downloadable) return undefined;
    const onBlur = () => setBlurred(true);
    const onFocus = () => setBlurred(false);
    const onVis = () => setBlurred(document.hidden);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    };
  }, [downloadable]);

  const toggleFullscreen = () => {
    const el = modalRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const goToPage = (n) => {
    const total = numPagesRef.current;
    if (!total) return;
    const clamped = Math.min(total, Math.max(1, n));
    pageRef.current = clamped;
    setPageNumber(clamped);
    setPageInput(String(clamped));
    // Resume reading: remember the last page read for this file.
    try {
      localStorage.setItem(PAGE_KEY(file), String(clamped));
    } catch {
      // storage unavailable — reading still works
    }
    // Study progress: this page counts as read (feeds My Study, streaks,
    // continue-reading and per-subject bars). Metadata only — no file.
    recordPageView(file, clamped, {
      title,
      // Real subject name when the opener passed one (PYQ/search), else the
      // semester name — so rail cards stay distinguishable.
      subject: (context && context.subject) || (context && context.semester),
      sem: context && context.semId,
      type: context && context.source === 'pyq' ? 'pyq' : 'note',
      total,
    });
  };
  const goPrev = () => goToPage(pageRef.current - 1);
  const goNext = () => goToPage(pageRef.current + 1);

  // Keyboard: Esc closes; Left/Right change page; in NOTES MODE ONLY,
  // PrintScreen is blocked (+ brief blur) and Ctrl/Cmd+C, Ctrl/Cmd+X and
  // Ctrl/Cmd+S are blocked — but never while the user is typing in an
  // input, textarea, select or contentEditable. goToPage reads refs only,
  // so this listener never goes stale.
  useEffect(() => {
    const isTyping = (target) => {
      const tag = (target.tagName || '').toLowerCase();
      return (
        tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable
      );
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        // In fullscreen, Escape is the browser's "exit fullscreen" — let
        // it do only that; otherwise one press would exit fullscreen AND
        // close the viewer.
        if (document.fullscreenElement) return;
        onClose();
        return;
      }
      if (!downloadable && e.key === 'PrintScreen') {
        // Best effort only — the OS may still capture. Blur briefly so a
        // capture taken at this instant gets a blurred page.
        e.preventDefault();
        setBlurred(true);
        if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
        blurTimerRef.current = setTimeout(() => setBlurred(false), BLUR_MS_AFTER_PRINTSCREEN);
        return;
      }
      if (isTyping(e.target)) return;
      if (!downloadable && (e.ctrlKey || e.metaKey) && ['c', 'x', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, downloadable]);

  // Zoom memory: remember fit-width / zoom level across opens.
  useEffect(() => {
    try {
      localStorage.setItem(ZOOM_KEY, JSON.stringify({ scale, fitWidth }));
    } catch {
      // storage unavailable — reading still works
    }
  }, [scale, fitWidth]);

  // Reading session: log elapsed minutes when this file's view ends
  // (close or a different file opened) — feeds the streak + stats.
  const sessionStartRef = useRef(Date.now());
  useEffect(() => {
    sessionStartRef.current = Date.now();
    return () => {
      recordSession(file, (Date.now() - sessionStartRef.current) / 1000, { title });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // Reset whenever a different file is opened, and report the open to GA4
  // (which notes actually get read — the metric that matters most).
  // Fires once per open; no-op when analytics is off.
  // Also restores the resume page (if the user read past page 1 before)
  // and the remembered zoom — both applied once the PDF loads.
  useEffect(() => {
    setPdfDoc(null);
    setNumPages(null);
    setPageNumber(1);
    setPageInput('1');
    setScale(1.0);
    setFitWidth(true);
    setLoadError(false);
    setSearchQuery('');
    setMatches([]);
    setMatchIndex(0);
    setSearching(false);
    pageRef.current = 1;
    numPagesRef.current = null;
    resumePageRef.current = null;
    try {
      const p = parseInt(localStorage.getItem(PAGE_KEY(file)) || '', 10);
      if (Number.isFinite(p) && p > 1) resumePageRef.current = p;
    } catch {
      // no stored page — start at 1
    }
    try {
      const z = JSON.parse(localStorage.getItem(ZOOM_KEY) || 'null');
      if (z && typeof z.scale === 'number' && ZOOM_LEVELS.includes(z.scale)) {
        setScale(z.scale);
        setFitWidth(false);
      } else if (z && z.fitWidth) {
        setFitWidth(true);
      }
    } catch {
      // no stored zoom — defaults stand
    }
    trackEvent('view_pdf', {
      file_title: title || file,
      semester: context && context.semester,
      source: context && context.source,
      file_type: /\.pdf$/i.test(file || '') ? 'pdf' : 'other',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // In-document search: debounced; scans every page's text via the loaded
  // pdf object (getTextContent). A run superseded by newer typing abandons
  // itself via searchRunRef. No word highlight — the text layer is off.
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < SEARCH_MIN_LEN || !pdfDoc) {
      setMatches([]);
      setMatchIndex(0);
      setSearching(false);
      return undefined;
    }
    const runId = ++searchRunRef.current;
    setSearching(true);
    const timer = setTimeout(() => {
      (async () => {
        const needle = q.toLowerCase();
        const found = [];
        const total = pdfDoc.numPages;
        for (let i = 1; i <= total; i += 1) {
          if (searchRunRef.current !== runId) return;
          const page = await pdfDoc.getPage(i);
          const tc = await page.getTextContent();
          const text = tc.items.map((it) => it.str || '').join(' ');
          const lower = text.toLowerCase();
          let count = 0;
          let idx = lower.indexOf(needle);
          while (idx !== -1) {
            count += 1;
            idx = lower.indexOf(needle, idx + needle.length);
          }
          if (count > 0) found.push({ page: i, count });
        }
        if (searchRunRef.current !== runId) return;
        setMatches(found);
        setMatchIndex(0);
        setSearching(false);
        if (found.length > 0) goToPage(found[0].page);
      })();
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pdfDoc]);

  if (!file) return null;

  const showPdf = isPdfFile(file) && !loadError;
  const viewerUrl = isDocFile(file)
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(
        window.location.origin + file,
      )}&embedded=true`
    : file;

  // Zoom steps move through the fixed levels so the zoom select always
  // shows the current level. Any explicit zoom turns fit-width off.
  const stepZoom = (dir) => {
    const i = ZOOM_LEVELS.indexOf(scale);
    const next = ZOOM_LEVELS[Math.min(ZOOM_LEVELS.length - 1, Math.max(0, (i === -1 ? 2 : i) + dir))];
    setScale(next);
    setFitWidth(false);
  };
  const zoomOut = () => stepZoom(-1);
  const zoomIn = () => stepZoom(1);
  const onZoomSelect = (e) => {
    const v = e.target.value;
    if (v === 'fit') {
      setFitWidth(true);
    } else {
      setScale(parseFloat(v));
      setFitWidth(false);
    }
  };

  // Commit the page-jump input: Enter or blur. Out-of-range numbers clamp
  // to 1..numPages; anything unparseable snaps back to the current page.
  const commitPageInput = () => {
    const n = parseInt(pageInput, 10);
    if (!Number.isFinite(n) || !numPagesRef.current) {
      setPageInput(String(pageRef.current));
      return;
    }
    goToPage(n);
  };

  const goMatch = (dir) => {
    if (matches.length === 0) return;
    const next = (matchIndex + dir + matches.length) % matches.length;
    setMatchIndex(next);
    goToPage(matches[next].page);
  };

  // Copy protection on the modal itself (NOTES MODE ONLY): block the
  // context menu and the copy/cut events (except inside inputs, where
  // copy/paste stays usable). Downloadable files keep the browser default.
  const isTypingTarget = (target) => {
    if (!target || !target.tagName) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  };
  const blockIfNotTyping = (e) => {
    if (!downloadable && !isTypingTarget(e.target)) e.preventDefault();
  };

  const matchPagesText =
    matches.length > 0
      ? ` · p. ${matches
          .slice(0, 4)
          .map((m) => m.page)
          .join(', ')}${matches.length > 4 ? ', …' : ''}`
      : '';

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
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={blockIfNotTyping}
        onCopy={blockIfNotTyping}
        onCut={blockIfNotTyping}
      >
        <div className="docviewer-header">
          <span className="docviewer-title" title={title}>
            <i className="fa-solid fa-eye" style={{ marginRight: '8px' }}></i>
            {title || 'Document preview'}
          </span>
          <div className="docviewer-actions">
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

        {showPdf && numPages && (
          <div className="pdf-toolbar">
            <div className="pdf-tool-group">
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={goPrev}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <label className="pdf-page-jump">
                <span className="pdf-page-jump-label">Page</span>
                <input
                  type="number"
                  className="pdf-page-input"
                  value={pageInput}
                  min={1}
                  max={numPages || 1}
                  disabled={!numPages}
                  aria-label="Go to page"
                  title="Type a page number, press Enter"
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitPageInput();
                  }}
                  onBlur={commitPageInput}
                />
                <span className="pdf-page-label">of {numPages || '…'}</span>
              </label>
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={goNext}
                disabled={!numPages || pageNumber >= numPages}
                aria-label="Next page"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <div className="pdf-tool-group pdf-search-group">
              <input
                type="search"
                className="pdf-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Show "Searching…" from the very first render after
                  // typing — otherwise the label flashes "0 matches" for a
                  // frame before the debounced search runs.
                  setSearching(true);
                }}
                placeholder={downloadable ? 'Search in this paper…' : 'Search in this note…'}
                aria-label={downloadable ? 'Search in this paper' : 'Search in this note'}
              />
              {searching ? (
                <span className="pdf-match-label">Searching…</span>
              ) : searchQuery.trim().length >= SEARCH_MIN_LEN ? (
                <span
                  className="pdf-match-label"
                  title={
                    matches.length > 0
                      ? `Matches on pages: ${matches.map((m) => m.page).join(', ')}`
                      : 'No matches in this document'
                  }
                >
                  {totalMatches} match{totalMatches === 1 ? '' : 'es'}
                  {matchPagesText}
                </span>
              ) : null}
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={() => goMatch(-1)}
                disabled={matches.length === 0}
                aria-label="Previous match"
                title="Previous match"
              >
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={() => goMatch(1)}
                disabled={matches.length === 0}
                aria-label="Next match"
                title="Next match"
              >
                <i className="fa-solid fa-chevron-down"></i>
              </button>
            </div>

            <div className="pdf-tool-group">
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={zoomOut}
                disabled={scale <= ZOOM_LEVELS[0]}
                aria-label="Zoom out"
              >
                <i className="fa-solid fa-magnifying-glass-minus"></i>
              </button>
              <select
                className="pdf-zoom-select"
                value={fitWidth ? 'fit' : String(scale)}
                onChange={onZoomSelect}
                aria-label="Zoom level"
                title="Zoom level"
              >
                <option value="fit">Fit</option>
                {ZOOM_LEVELS.map((z) => (
                  <option key={z} value={String(z)}>
                    {Math.round(z * 100)}%
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={zoomIn}
                disabled={scale >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                aria-label="Zoom in"
              >
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </button>
              <button
                type="button"
                className="pdf-nav-btn pdf-fit-btn"
                onClick={() => setFitWidth((f) => !f)}
                aria-pressed={fitWidth}
                title={fitWidth ? 'Actual size (100%)' : 'Fit to width'}
              >
                <i className={fitWidth ? 'fa-solid fa-compress' : 'fa-solid fa-expand'}></i>
                <span>{fitWidth ? 'Fit' : '100%'}</span>
              </button>
              <button
                type="button"
                className="pdf-nav-btn pdf-fit-btn"
                onClick={toggleFullscreen}
                aria-pressed={isFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                <i className={isFullscreen ? 'fa-solid fa-minimize' : 'fa-solid fa-maximize'}></i>
                <span>{isFullscreen ? 'Exit' : 'Full'}</span>
              </button>
              {downloadable && (
                <a
                  className="pdf-nav-btn pdf-fit-btn pdf-download-btn"
                  href={file}
                  download
                  title="Download this file"
                  aria-label="Download this file"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className={`docviewer-body${downloadable ? ' docviewer-body--selectable' : ''}`} ref={pageWrapRef}>
          {showPdf ? (
            <div className={`pdf-page-wrap${blurred && !downloadable ? ' img-blurred' : ''}`}>
              <Document
                file={file}
                onLoadSuccess={(pdf) => {
                  setPdfDoc(pdf);
                  setNumPages(pdf.numPages);
                  setLoadError(false);
                  // Keep the ref in sync immediately (state lags a render).
                  numPagesRef.current = pdf.numPages;
                  // Resume reading: jump to the last page read, if any.
                  if (resumePageRef.current) {
                    const p = Math.min(resumePageRef.current, pdf.numPages);
                    resumePageRef.current = null;
                    if (p > 1) goToPage(p);
                  }
                }}
                onLoadError={() => {
                  setPdfDoc(null);
                  setLoadError(true);
                }}
                loading={<div className="pdf-loading">Loading PDF…</div>}
                error={<div className="pdf-error">Could not load this PDF.</div>}
              >
                <Page
                  pageNumber={pageNumber}
                  width={
                    containerWidth
                      ? Math.floor(containerWidth * (fitWidth ? 1 : scale))
                      : undefined
                  }
                  scale={containerWidth ? undefined : scale}
                  // Notes: text layer OFF (no selectable text). PYQ/syllabus:
                  // text layer ON, as the old viewer had it — the file is
                  // downloadable anyway, so selecting text here is coherent.
                  renderTextLayer={downloadable}
                  renderAnnotationLayer={downloadable}
                />
              </Document>
              {blurred && !downloadable && (
                <div className="img-pause-overlay" aria-hidden="true">
                  <span>Preview paused — switch back to this tab to continue reading.</span>
                </div>
              )}
              {!downloadable && (
                <div className="pdf-watermark" aria-hidden="true">
                  <span>thebhavesh.online</span>
                  <span>thebhavesh.online</span>
                  <span>thebhavesh.online</span>
                  <span>thebhavesh.online</span>
                </div>
              )}
            </div>
          ) : loadError ? (
            <div className="pdf-error-wrap">
              <p>Could not preview this file here.</p>
              <p className="pdf-error-note">
                The file may be damaged or unavailable — try opening it from the notes list again.
              </p>
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

export default PdfViewer;
