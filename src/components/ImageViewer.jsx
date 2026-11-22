import React, { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { recordPageView, recordSession } from '../lib/study';

// IMAGE-BASED document viewer — the browser NEVER receives a PDF file.
// The build renders every PDF under notes-source/ to page images
// (scripts/render-notes.mjs, prebuild) + a per-page text search index.
// This viewer shows page IMAGES ONLY, from public/generated/:
//   /generated/<dir>/page-001.jpg ... + search.json + manifest.json
// Source PDFs live in notes-source/ (committed, but NOT served — Vercel
// only serves public/ + the built assets, so no raw file URL exists).
//
// COPY PROTECTION, by design:
//  - page images only — no text layer, nothing selectable;
//  - no Download button anywhere;
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
// Search works against the per-doc search index (page-level matches, jump
// to a match's page). No word highlight — images can't be highlighted.
// `context` is optional metadata for analytics: { semester, source }.
//
// INSTANT OPEN (his order 2026-11-22): the viewer must feel like reading
// the PDF itself — the user must never know no PDF was served.
//  - the manifest is prefetched on app idle (prefetchViewerManifest, called
//    from App.jsx), so opening a note finds it already cached;
//  - page 1 renders the moment the manifest entry is known — the search
//    index loads in the background and never gates the first page;
//  - the next 3 pages (and the previous one) preload while the user reads,
//    so page turns find the image already in the browser cache;
//  - a page-shaped skeleton holds the page's place while an image is
//    genuinely not ready yet — never a blank wait. The image carries
//    fetchpriority="high" so the browser prioritises it over the preloads.
// Images are scale 1.5 / JPEG q80 (~105 KB/page avg) — measured fast
// enough on throttled mobile (see IMAGE-VIEWER.md); a smaller variant was
// considered and not needed.
const SEARCH_MIN_LEN = 2;
const SEARCH_DEBOUNCE_MS = 300;
const BLUR_MS_AFTER_PRINTSCREEN = 1500;

// RESUME READING + ZOOM MEMORY (same keys as the PDF viewer — a note
// resumed in either viewer reopens on the same page, with the same zoom).
const PAGE_KEY = (f) => `bn-viewer-page:${f}`;
const ZOOM_KEY = 'bn-viewer-zoom';

const pad = (n) => String(n).padStart(3, '0');

// The manifest is fetched once per page load and shared by every viewer open.
let manifestPromise = null;
const loadManifest = () => {
  if (!manifestPromise) {
    manifestPromise = fetch('/generated/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`manifest HTTP ${r.status}`);
        return r.json();
      })
      .catch((err) => {
        manifestPromise = null;
        throw err;
      });
  }
  return manifestPromise;
};

// INSTANT-OPEN: warm the manifest cache on app idle (called from App.jsx).
// The manifest (file -> page-image dir) is ~50 KB and fetched once per page
// load, so a viewer open later finds it already in memory — the first page
// image can be requested immediately, with no manifest round-trip on open.
export const prefetchViewerManifest = () => {
  loadManifest().catch(() => {});
};

const ImageViewer = ({ file, title, onClose, context }) => {
  const [status, setStatus] = useState('loading'); // loading|ready|missing|error|unsupported
  const [statusNote, setStatusNote] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [scale, setScale] = useState(1.0);
  const [fitWidth, setFitWidth] = useState(true);
  const [pageTexts, setPageTexts] = useState(null);
  const [entryDir, setEntryDir] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  // matches: [{ page, count }] — one entry per page that contains a hit.
  const [matches, setMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [blurred, setBlurred] = useState(false);
  // imgReady: the current page image has arrived + decoded. While false the
  // skeleton holds the page's place — never a blank wait. imgError: the
  // page image itself failed to load (missing file on disk).
  const [imgReady, setImgReady] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);
  const modalRef = useRef(null);
  const numPagesRef = useRef(null);
  const pageRef = useRef(1);
  const searchRunRef = useRef(0);
  const blurTimerRef = useRef(null);
  // Resume-reading target, read on open and consumed once the manifest
  // entry is known (numPages set). Zoom is restored in the reset effect.
  const resumePageRef = useRef(null);
  const sessionStartRef = useRef(Date.now());

  const totalMatches = useMemo(
    () => matches.reduce((sum, m) => sum + m.count, 0),
    [matches],
  );

  const pageSrc = (n) => (entryDir ? `/generated/${entryDir}/page-${pad(n)}.jpg` : null);

  useEffect(() => {
    numPagesRef.current = numPages;
  }, [numPages]);

  // Fullscreen state (for the toolbar toggle icon/label).
  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

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
  useEffect(() => {
    sessionStartRef.current = Date.now();
    return () => {
      recordSession(file, (Date.now() - sessionStartRef.current) / 1000, { title });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // Screenshot deterrent: blur the page the moment the window loses focus
  // or the tab is hidden (app-switch / screen-share). Un-blur on return.
  useEffect(() => {
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
  }, []);

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
      subject: context && context.semester,
      sem: context && context.semId,
      type: 'note',
      total,
    });
  };
  const goPrev = () => goToPage(pageRef.current - 1);
  const goNext = () => goToPage(pageRef.current + 1);

  // Keyboard: Esc closes; Left/Right change page; PrintScreen is blocked
  // (+ brief blur); Ctrl/Cmd+C, Ctrl/Cmd+X and Ctrl/Cmd+S are blocked —
  // but never while the user is typing in an input, textarea, select or
  // contentEditable. goToPage reads refs only, so this listener never goes stale.
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
      if (e.key === 'PrintScreen') {
        // Best effort only — the OS may still capture. Blur briefly so a
        // capture taken at this instant gets a blurred page.
        e.preventDefault();
        setBlurred(true);
        if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
        blurTimerRef.current = setTimeout(() => setBlurred(false), BLUR_MS_AFTER_PRINTSCREEN);
        return;
      }
      if (isTyping(e.target)) return;
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's'].includes(e.key.toLowerCase())) {
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
  }, [onClose]);

  // Reset + resolve the document whenever a different file is opened, and
  // report the open to GA4 (which notes actually get read — the metric that
  // matters most). Fires once per open; no-op when analytics is off.
  // INSTANT OPEN: page 1 renders the moment the manifest entry is known.
  // The search index loads in the BACKGROUND and never gates the first
  // page — search just starts working a moment later (the search effect
  // re-runs when pageTexts lands, so a query typed early is searched
  // automatically once the index arrives).
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setStatusNote('');
    setNumPages(null);
    setPageNumber(1);
    setPageInput('1');
    setScale(1.0);
    setFitWidth(true);
    setPageTexts(null);
    setEntryDir(null);
    setSearchQuery('');
    setMatches([]);
    setMatchIndex(0);
    setSearching(false);
    setImgReady(false);
    setImgError(false);
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
      if (z && typeof z.scale === 'number' && z.scale >= 0.6 && z.scale <= 2.0) {
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
    if (!/\.pdf$/i.test(file || '')) {
      setStatus('unsupported');
      setStatusNote('Only PDF notes open in this viewer.');
      return undefined;
    }
    loadManifest()
      .then((manifest) => {
        if (cancelled) return;
        const entry = manifest.docs && manifest.docs[file];
        if (!entry) {
          setStatus('missing');
          setStatusNote('This note is not available as page images yet.');
          return;
        }
        if (entry.error || !entry.pages) {
          setStatus('error');
          setStatusNote('This file could not be rendered to page images.');
          return;
        }
        setEntryDir(entry.dir);
        setNumPages(entry.pages);
        // Ready NOW — the <img> for page 1 mounts and its request starts
        // immediately; the search index follows in the background.
        setStatus('ready');
        // Resume reading: jump to the stored page (if any) now that the
        // page count is known. Direct set — the open itself is not a
        // "page read"; the first real turn records it.
        if (resumePageRef.current) {
          const p = Math.min(resumePageRef.current, entry.pages);
          resumePageRef.current = null;
          pageRef.current = p;
          setPageNumber(p);
          setPageInput(String(p));
        }
        fetch(`/generated/${entry.dir}/search.json`)
          .then((r) => (r.ok ? r.json() : { pages: [] }))
          .then((idx) => {
            if (cancelled) return;
            setPageTexts(Array.isArray(idx.pages) ? idx.pages : []);
          })
          .catch(() => {
            if (!cancelled) setPageTexts([]);
          });
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error');
          setStatusNote('Could not load the viewer index — try again.');
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // INSTANT PAGE TURNS: preload the previous page and the NEXT 3 pages
  // while the user reads the current one, so a turn finds the image
  // already in the browser cache. Plain Image() prefetches — they do not
  // block the visible page; the browser deprioritises them behind it.
  useEffect(() => {
    if (status !== 'ready') return;
    [pageNumber - 1, pageNumber + 1, pageNumber + 2, pageNumber + 3].forEach((n) => {
      if (n >= 1 && n <= (numPagesRef.current || 0)) {
        const img = new Image();
        img.src = pageSrc(n);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, status]);

  // Track whether the current page image has actually arrived. Reset on
  // every page change; if the image is already cached, `complete` is true
  // by the time this effect runs and no skeleton flashes at all. Otherwise
  // the skeleton holds the page's place until onLoad fires.
  useEffect(() => {
    if (status !== 'ready') return;
    setImgError(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImgReady(true);
    } else {
      setImgReady(false);
    }
  }, [pageNumber, entryDir, status]);

  // In-document search: debounced; scans the per-doc search index
  // (page-level text extracted at build time). A run superseded by newer
  // typing abandons itself via searchRunRef.
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < SEARCH_MIN_LEN || !pageTexts) {
      setMatches([]);
      setMatchIndex(0);
      setSearching(false);
      return undefined;
    }
    const runId = ++searchRunRef.current;
    setSearching(true);
    const timer = setTimeout(() => {
      const needle = q.toLowerCase();
      const found = [];
      pageTexts.forEach((text, i) => {
        if (searchRunRef.current !== runId) return;
        const lower = (text || '').toLowerCase();
        let count = 0;
        let idx = lower.indexOf(needle);
        while (idx !== -1) {
          count += 1;
          idx = lower.indexOf(needle, idx + needle.length);
        }
        if (count > 0) found.push({ page: i + 1, count });
      });
      if (searchRunRef.current !== runId) return;
      setMatches(found);
      setMatchIndex(0);
      setSearching(false);
      if (found.length > 0) goToPage(found[0].page);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pageTexts]);

  if (!file) return null;

  const ready = status === 'ready';
  const zoomOut = () => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(2)));
  const zoomIn = () => setScale((s) => Math.min(2.0, +(s + 0.2).toFixed(2)));

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

  // Copy protection on the modal itself: block the context menu and the
  // copy/cut events (except inside inputs, where copy/paste stays usable).
  const isTypingTarget = (target) => {
    if (!target || !target.tagName) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  };
  const blockIfNotTyping = (e) => {
    if (!isTypingTarget(e.target)) e.preventDefault();
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

        {ready && (
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
                placeholder="Search in this note…"
                aria-label="Search in this note"
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
                disabled={scale <= 0.6}
                aria-label="Zoom out"
              >
                <i className="fa-solid fa-magnifying-glass-minus"></i>
              </button>
              <span className="pdf-zoom-label">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                className="pdf-nav-btn"
                onClick={zoomIn}
                disabled={scale >= 2.0}
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
            </div>
          </div>
        )}

        <div className="docviewer-body">
          {ready ? (
            <div className={`pdf-page-wrap${!imgReady && !imgError ? ' pdf-page-wrap--loading' : ''}`}>
              <img
                ref={imgRef}
                className={`img-page${blurred ? ' img-blurred' : ''}`}
                src={pageSrc(pageNumber)}
                alt={`Page ${pageNumber} of ${numPages} — ${title || 'note'}`}
                draggable={false}
                fetchpriority="high"
                decoding="async"
                onLoad={() => setImgReady(true)}
                onError={() => setImgError(true)}
                onContextMenu={(e) => e.preventDefault()}
                style={{ width: fitWidth ? '100%' : `${Math.round(scale * 100)}%` }}
              />
              {!imgReady && !imgError && (
                <div className="pdf-skeleton pdf-skeleton--overlay" aria-hidden="true">
                  <span>Loading page…</span>
                </div>
              )}
              {imgError && (
                <div className="pdf-error-wrap">
                  <p>Could not load this page image.</p>
                  <p className="pdf-error-note">Try going back a page, or reopen the note.</p>
                </div>
              )}
              {blurred && (
                <div className="img-pause-overlay" aria-hidden="true">
                  <span>Preview paused — switch back to this tab to continue reading.</span>
                </div>
              )}
              <div className="pdf-watermark" aria-hidden="true">
                <span>thebhavesh.online</span>
                <span>thebhavesh.online</span>
                <span>thebhavesh.online</span>
                <span>thebhavesh.online</span>
              </div>
            </div>
          ) : status === 'loading' ? (
            <div className="pdf-skeleton pdf-skeleton--standalone" aria-hidden="true">
              <span>Loading pages…</span>
            </div>
          ) : (
            <div className="pdf-error-wrap">
              <p>
                {status === 'missing'
                  ? 'This note is not available as page images yet.'
                  : status === 'unsupported'
                    ? 'Only PDF notes open in this viewer.'
                    : 'Could not preview this file here.'}
              </p>
              <p className="pdf-error-note">{statusNote || 'Try opening it from the notes list again.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
