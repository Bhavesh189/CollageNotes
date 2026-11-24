import React, { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { recordPageView, recordSession, getFrequentlyTogether } from '../lib/study';
import {
  getFlags, setFlag, getAnnotations, addAnnotation, deleteAnnotation,
  getHighlights, addHighlight, deleteHighlight, getTextHighlights,
  addTextHighlight, deleteTextHighlight, clearTextHighlights,
  getPageBookmarks, togglePageBookmark, FLAG_LABELS,
} from '../lib/pageMarks';
import { semestersData } from '../data/notesData';

// IMAGE-BASED document viewer — the browser NEVER receives a PDF file.
// The build renders every PDF under notes-source/ to page images
// (scripts/render-notes.mjs, prebuild) + a per-page text search index.
// This viewer shows page IMAGES ONLY, from public/generated/:
//   /generated/<dir>/page-001.jpg ... + search.json + manifest.json
// Source PDFs live in notes-source/ (committed, but NOT served — Vercel
// only serves public/ + the built assets, so no raw file URL exists).
//
// COPY PROTECTION, by design:
//  - page images only — no text layer, nothing selectable BY DEFAULT;
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
//  - TEXT SELECT (2026-11-23, opt-in "Select" toggle): a transparent
//    selectable text layer (words.json, built at render time) over the page
//    image, fit-to-width typed pages only. Selecting text inherently means
//    the selected text can also be copied with Ctrl+C — that is the honest
//    trade-off of the feature; the images themselves stay non-downloadable
//    and nothing else about the protection changes.
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
// Text-highlight colours (background rgba; the popover swatch uses the same value).
const HL_COLORS = [
  { name: 'Yellow', bg: 'rgba(250, 204, 21, 0.35)' },
  { name: 'Green', bg: 'rgba(134, 239, 172, 0.45)' },
  { name: 'Pink', bg: 'rgba(244, 114, 182, 0.4)' },
];
// Tap zones (WhatsApp-like): left/right 22% of the page = prev/next page.
// A tap is a short press with (almost) no movement; the navigation is
// delayed ~240ms so a double-tap can still zoom instead of navigating twice.
const TAP_EDGE = 0.22;
const TAP_MAX_MS = 300;
const TAP_MAX_MOVE = 8;
const TAP_DELAY_MS = 240;
const TAP_DOUBLE_MS = 400;

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

const ImageViewer = ({ file, title, onClose, context, onOpenSyllabus, onOpenNext }) => {
  const [status, setStatus] = useState('loading'); // loading|ready|missing|error|unsupported
  const [statusNote, setStatusNote] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [scale, setScale] = useState(1.0);
  const [fitWidth, setFitWidth] = useState(true);
  const [pageTexts, setPageTexts] = useState(null);
  const [entryDir, setEntryDir] = useState(null);
  const [hwPages, setHwPages] = useState(null); // Set of page numbers rendered in handwriting, or null
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  // matches: [{ page, count }] — one entry per page that contains a hit.
  const [matches, setMatches] = useState([]);
  const [matchIndex, setMatchIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [blurred, setBlurred] = useState(false);
  // F2 — viewer tools (all local, overlays/metadata only; images untouched).
  const [toolsOpen, setToolsOpen] = useState(false); // overflow panel
  const [filmstrip, setFilmstrip] = useState(false);
  const [spread, setSpread] = useState(false); // two-page spread (desktop)
  const [rotateDeg, setRotateDeg] = useState(0);
  const [rulerOn, setRulerOn] = useState(false); // reading ruler / focus line
  const [rulerY, setRulerY] = useState(50); // % down the page wrap
  const [focusMode, setFocusMode] = useState(false);
  const [together, setTogether] = useState([]);

  useEffect(() => {
    setTogether(file ? getFrequentlyTogether(file, 3) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]); // dim all chrome
  const [brightness, setBrightness] = useState(100); // night-reading %
  const [quality, setQuality] = useState('sharp'); // fast | sharp
  const [playing, setPlaying] = useState(false); // slideshow auto-advance
  const [slideSecs, setSlideSecs] = useState(5);
  const [flags, setFlags] = useState({});
  const [annotations, setAnnotations] = useState({});
  const [highlights, setHighlights] = useState({});
  const [pageBookmarks, setPageBookmarks] = useState({});
  const [noteText, setNoteText] = useState('');
  const [hlMode, setHlMode] = useState(false); // drag to draw a highlight
  const [hlDrag, setHlDrag] = useState(null); // {x0,y0,x1,y1} in %
  const [touchX, setTouchX] = useState(null); // swipe to change page
  // Selectable text + tap zones (2026-11-23).
  const [selectMode, setSelectMode] = useState(false); // text layer on/off
  const [words, setWords] = useState(null); // words.json pages for this doc
  const [wordsState, setWordsState] = useState('idle'); // idle|loading|ready|none
  const [textHls, setTextHls] = useState({});
  const [tapHintSeen, setTapHintSeen] = useState(true);
  const [selPop, setSelPop] = useState(null); // highlight popover {x, y} in wrap %
  const [selColor, setSelColor] = useState(HL_COLORS[0].bg);
  const [layerSize, setLayerSize] = useState({ w: 0, h: 0 });
  const textLayerRef = useRef(null);
  const tapTimerRef = useRef(null);
  const pointerRef = useRef(null); // {x, y, t} of the current press
  const hlClickPosRef = useRef(null); // mousedown pos on a text highlight (drag-vs-click)
  const lastTapUpRef = useRef(0); // double-tap guard
  const lastTouchRef = useRef(0); // last touchstart — kills emulated mouse taps
  const wrapRef = useRef(null);
  const refreshMarks = () => {
    setFlags(getFlags(file));
    setAnnotations(getAnnotations(file));
    setHighlights(getHighlights(file));
    setTextHls(getTextHighlights(file));
    setPageBookmarks(getPageBookmarks(file));
  };
  useEffect(refreshMarks, [file]);
  useEffect(() => {
    const onMarks = () => refreshMarks();
    window.addEventListener('bn-marks-changed', onMarks);
    return () => window.removeEventListener('bn-marks-changed', onMarks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
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

  const pageSrc = (n) =>
    entryDir
      ? hwPages && hwPages.has(n)
        ? `/generated/${entryDir}/hw/page-${pad(n)}.jpg`
        : `/generated/${entryDir}/page-${pad(n)}.jpg`
      : null;

  // PERF (2026-11-24): filmstrip thumbnails — thumb-NNN.jpg, 128px wide
  // (2x the 64px display), ~8-12 KB. The strip used to load the full
  // ~170 KB page image for a 64px thumb: a 28-page doc burst ~4.8 MB.
  // Thumbs are generated at build time (scripts/render-notes.mjs,
  // scripts/handwrite.mjs) next to the page images.
  const thumbSrc = (n) =>
    entryDir
      ? hwPages && hwPages.has(n)
        ? `/generated/${entryDir}/hw/thumb-${pad(n)}.jpg`
        : `/generated/${entryDir}/thumb-${pad(n)}.jpg`
      : null;

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
    setSelPop(null); // a page turn dismisses the highlight popover
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
      // Subject name for the "Pick up where you left off" rail: the file
      // itself is the authority (noteMeta matches it in the catalog), then
      // the opener's context, then the semester name as last resort — the
      // semester alone makes same-titled notes indistinguishable.
      subject: (noteMeta && noteMeta.subject) || (context && context.subject) || (context && context.semester),
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
        // Text selection is a real feature now (select mode): allow copying
        // the selected text with Ctrl+C when the selection is inside the
        // text layer. The images stay non-downloadable; Ctrl+S / Ctrl+X
        // stay blocked.
        if (e.key.toLowerCase() === 'c' && selectionInTextLayer()) return;
        e.preventDefault();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleFullscreen();
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
    setHwPages(null);
    setSearchQuery('');
    setMatches([]);
    setMatchIndex(0);
    setSearching(false);
    setImgReady(false);
    setImgError(false);
    setSelectMode(false);
    setWords(null);
    setWordsState('idle');
    // NOTE: do NOT clear textHls here. refreshMarks (useEffect on [file],
    // declared BEFORE this effect) already loads this file's text
    // highlights — and this reset effect runs after it in the same commit,
    // so a setTextHls({}) here wiped the just-loaded highlights and none
    // ever rendered on reopen. The other mark types (flags/annotations)
    // were never cleared here for the same reason. 2026-11-23.
    setSelPop(null);
    clearPendingTap();
    try {
      setTapHintSeen(!!localStorage.getItem('bn-tap-hint-seen'));
    } catch {
      setTapHintSeen(true);
    }
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
      // Only restore a FIXED scale when the user actually zoomed (stored
      // fitWidth === false). The zoom-memory effect saves {scale: 1.0,
      // fitWidth: true} on mount, so a bare "scale is a number" check
      // misreads fit-to-width as a fixed 100% zoom and forced fitWidth
      // off on EVERY open — which also silently disabled the text layer
      // (it requires fitWidth). 2026-11-23.
      if (z && z.fitWidth === false && typeof z.scale === 'number' && z.scale >= 0.6 && z.scale <= 2.0) {
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
        setHwPages(Array.isArray(entry.hwPages) && entry.hwPages.length > 0 ? new Set(entry.hwPages) : null);
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

  // INSTANT PAGE TURNS: preload the previous page and the NEXT pages
  // while the user reads the current one, so a turn finds the image
  // already in the browser cache. Plain Image() prefetches — they do not
  // block the visible page; the browser deprioritises them behind it.
  // Quality: Sharp preloads 3 ahead (default); Fast preloads only the
  // next page, for slow networks / low-data reading.
  // PERF (2026-11-24): SEQUENTIAL chain — the NEXT page gets the whole
  // pipe first and the others follow only after it finishes. A 600ms
  // stagger was tried first and measured NO turn improvement (7.6s turn
  // on Slow 3G, same as before): on a 50 KB/s pipe the next page still
  // shared bandwidth with the other three. Sequential is the only shape
  // that makes a turn instant once the reader has spent a few seconds
  // on the current page.
  useEffect(() => {
    if (status !== 'ready') return;
    const total = numPagesRef.current || 0;
    const queue = quality === 'fast'
      ? [pageNumber + 1]
      : [pageNumber + 1, pageNumber - 1, pageNumber + 2, pageNumber + 3];
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled) return;
      while (i < queue.length) {
        const n = queue[i++];
        if (n >= 1 && n <= total && n !== pageNumber) {
          const img = new Image();
          img.onload = step;
          img.onerror = step;
          img.src = pageSrc(n);
          return;
        }
      }
    };
    step();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, status, quality]);

  // Slideshow: hands-free revision — advance a page every N seconds.
  useEffect(() => {
    if (!playing || status !== 'ready') return undefined;
    const t = setInterval(() => {
      const total = numPagesRef.current || 0;
      if (pageRef.current >= total) {
        setPlaying(false);
        return;
      }
      goToPage(pageRef.current + 1);
    }, slideSecs * 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, slideSecs, status]);

  // Text layer: lazily load words.json when select mode is first enabled
  // for this doc (one fetch per doc; ~50 KB). A 404 (corrupt doc / old
  // build) just means no selectable text — never an error state.
  useEffect(() => {
    if (!selectMode || !entryDir || words) return undefined;
    let cancelled = false;
    setWordsState('loading');
    fetch(`/generated/${entryDir}/words.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (cancelled) return;
        if (j && Array.isArray(j.pages)) {
          // A scan doc has a words.json (backfilled) but zero word items
          // on every page — that is "no text", not "ready": the scan note
          // ("This page is a scan…") only shows for wordsState 'none'.
          const hasWords = j.pages.some((pg) => Array.isArray(pg) && pg.length > 0);
          if (hasWords) { setWords(j.pages); setWordsState('ready'); }
          else setWordsState('none');
        }
        else setWordsState('none');
      })
      .catch(() => { if (!cancelled) setWordsState('none'); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMode, entryDir]);

  // Measure the page wrap (the text layer's box) so span font sizes match
  // the rendered image height.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const update = () => {
      const r = el.getBoundingClientRect();
      setLayerSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); };
  }, [status, entryDir, pageNumber, fitWidth, scale, spread, rotateDeg]);

  // Show the Highlight popover next to a text selection (mouse, touch or
  // keyboard selection — all funnel through selectionchange). Only when
  // the selection is inside the text layer.
  useEffect(() => {
    if (!selectMode) { setSelPop(null); return undefined; }
    const onSel = () => {
      const sel = window.getSelection();
      const layer = textLayerRef.current;
      if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !layer || !sel.anchorNode || !layer.contains(sel.anchorNode)) {
        setSelPop(null);
        return;
      }
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      const wrect = wrap.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) { setSelPop(null); return; }
      setSelPop({
        x: Math.max(10, Math.min(90, ((rect.left + rect.width / 2 - wrect.left) / wrect.width) * 100)),
        y: Math.max(12, ((rect.top - wrect.top) / wrect.height) * 100),
      });
    };
    document.addEventListener('selectionchange', onSel);
    return () => document.removeEventListener('selectionchange', onSel);
  }, [selectMode]);

  // Where does this note sit in its subject? (syllabus chip + up-next)
  const noteMeta = useMemo(() => {
    for (const sem of Object.values(semestersData || {})) {
      for (const sub of sem.subjects || []) {
        const idx = (sub.notes || []).findIndex((n) => n.file === file);
        if (idx !== -1) {
          const notes = sub.notes || [];
          const next = notes.slice(idx + 1).find((n) => {
            try {
              const p = JSON.parse(localStorage.getItem('bn-progress') || '{}')[n.file];
              return !p || !p.done;
            } catch {
              return true;
            }
          });
          const unit = (title || '').match(/unit\s*(\d+)/i);
          return {
            subject: sub.name, subjectId: sub.id, semId: sem.id, semName: sem.name,
            unit: unit ? `Unit ${unit[1]}` : '', next,
          };
        }
      }
    }
    return null;
  }, [file, title]);

  // Highlight drawing: drag on the page to mark a region (percent coords).
  const hlPos = (e) => {
    const r = wrapRef.current ? wrapRef.current.getBoundingClientRect() : { left: 0, top: 0, width: 1, height: 1 };
    const x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
    return { x, y };
  };
  const hlStart = (e) => {
    if (!hlMode) return;
    const p = hlPos(e);
    setHlDrag({ x0: p.x, y0: p.y, x1: p.x, y1: p.y });
  };
  const hlMove = (e) => {
    if (!hlDrag) return;
    const p = hlPos(e);
    setHlDrag({ ...hlDrag, x1: p.x, y1: p.y });
  };
  const hlEnd = () => {
    if (!hlDrag) return;
    const x = Math.min(hlDrag.x0, hlDrag.x1);
    const y = Math.min(hlDrag.y0, hlDrag.y1);
    const w = Math.abs(hlDrag.x1 - hlDrag.x0);
    const h = Math.abs(hlDrag.y1 - hlDrag.y0);
    setHlDrag(null);
    if (w > 2 && h > 1) addHighlight(file, pageNumber, { x, y, w, h });
  };
  // Swipe left/right to change page (mobile-first); swipe down closes.
  const onTouchStart = (e) => {
    if (e.touches.length === 1) setTouchX({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };
  const onTouchEnd = (e) => {
    if (!touchX || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchX.x;
    const dy = e.changedTouches[0].clientY - touchX.y;
    setTouchX(null);
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 2) {
      onClose();
    }
  };

  // --- Tap zones (WhatsApp-like) + text selection helpers (2026-11-23) ---
  const clearPendingTap = () => {
    if (tapTimerRef.current) { clearTimeout(tapTimerRef.current); tapTimerRef.current = null; }
  };
  const scheduleTapNav = (clientX) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const fx = (clientX - r.left) / r.width;
    const dir = fx < TAP_EDGE ? -1 : fx > 1 - TAP_EDGE ? 1 : 0;
    if (dir === 0) return;
    clearPendingTap();
    tapTimerRef.current = setTimeout(() => {
      tapTimerRef.current = null;
      if (dir < 0) goPrev();
      else goNext();
    }, TAP_DELAY_MS);
  };
  const isTapTarget = (target) => {
    // Taps on controls / marks / overlays never navigate — only taps on the
    // page image itself (or the text layer) count as page-turn taps.
    if (!target || !target.closest) return true;
    return !target.closest('button, a, input, select, textarea, .page-highlight, .page-notes-badge, .page-flag-badge, .viewer-upnext, .textsel-pop, .tap-hint, .viewer-tools, .viewer-filmstrip');
  };
  const tapUpCommon = (clientX, clientY, target, eventTime) => {
    const p = pointerRef.current;
    pointerRef.current = null;
    if (!p) return;
    const nowWall = Date.now();
    // Second tap in quick succession = double-tap (zoom) — never navigate.
    // Wall-clock on purpose: it also swallows the emulated mouseup that
    // follows a touch tap (it arrives within ~400ms of the touchend).
    if (nowWall - lastTapUpRef.current < TAP_DOUBLE_MS) { lastTapUpRef.current = nowWall; return; }
    lastTapUpRef.current = nowWall;
    // Hold duration from the EVENTS' own timestamps (e.timeStamp), not from
    // handler wall-clock: on a busy main thread the touchend handler can run
    // ~800ms after touchstart even for an instant tap, which used to abort
    // every touch tap (dt > TAP_MAX_MS). e.timeStamp is when the touch
    // actually started/ended, so dt is the true hold time. 2026-11-23.
    const dt = eventTime - p.t;
    const moved = Math.hypot(clientX - p.x, clientY - p.y);
    if (dt > TAP_MAX_MS || moved > TAP_MAX_MOVE) return;
    if (!isTapTarget(target)) return;
    scheduleTapNav(clientX);
  };
  const tapDown = (e) => {
    // Emulated mouse events fired after a touch tap — ignore them entirely.
    // (The touch path already handled the tap; clearing here would cancel
    // its pending navigation before the 240ms timer fires.)
    if (Date.now() - lastTouchRef.current < 500) return;
    clearPendingTap(); // a second press = likely double-click -> zoom wins
    pointerRef.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
  };
  const tapUp = (e) => {
    // Emulated mouse events fired after a touch tap — the touch path
    // already handled it; ignore mouse taps right after a touch.
    if (Date.now() - lastTouchRef.current < 500) { pointerRef.current = null; return; }
    tapUpCommon(e.clientX, e.clientY, e.target, e.timeStamp);
  };
  const tapTouchEnd = (e) => {
    const t = e.changedTouches && e.changedTouches[0];
    if (!t) return;
    tapUpCommon(t.clientX, t.clientY, e.target, e.timeStamp);
  };
  // True when the user has a real text selection inside the text layer —
  // the only case where copy (Ctrl+C / the copy event) is allowed.
  const selectionInTextLayer = () => {
    const sel = window.getSelection();
    const layer = textLayerRef.current;
    return !!(
      sel && !sel.isCollapsed && sel.rangeCount > 0 && layer &&
      sel.anchorNode && layer.contains(sel.anchorNode)
    );
  };
  const onCopyGuard = (e) => {
    if (!isTypingTarget(e.target) && !selectionInTextLayer()) e.preventDefault();
  };
  // Save the current text selection as a highlight: rects come from the
  // Selection's own client rects (per-line, post-transform), so they line
  // up with the image words even for a partial-line selection.
  const applyTextHighlight = () => {
    const sel = window.getSelection();
    const layer = textLayerRef.current;
    const wrap = wrapRef.current;
    if (!sel || sel.rangeCount === 0 || !layer || !wrap) return;
    if (!sel.anchorNode || !layer.contains(sel.anchorNode)) return;
    const range = sel.getRangeAt(0);
    const wrect = wrap.getBoundingClientRect();
    const rects = [...range.getClientRects()]
      .map((r) => ({
        x: +(((r.left - wrect.left) / wrect.width) * 100).toFixed(2),
        y: +(((r.top - wrect.top) / wrect.height) * 100).toFixed(2),
        w: +((r.width / wrect.width) * 100).toFixed(2),
        h: +((r.height / wrect.height) * 100).toFixed(2),
      }))
      .filter((r) => r.w > 0.1 && r.h > 0.1);
    if (rects.length === 0) return;
    addTextHighlight(file, pageNumber, {
      text: sel.toString().trim().slice(0, 300),
      color: selColor,
      rects,
    });
    sel.removeAllRanges();
    setSelPop(null);
  };

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
  // Selectable text layer (2026-11-23): only when the layer can match the
  // image exactly — fit-to-width, no rotation, no spread, typed page.
  const isHwPage = !!(hwPages && hwPages.has(pageNumber));
  const selectAvailable = ready && fitWidth && rotateDeg === 0 && !spread && !isHwPage;
  const wordsForPage = wordsState === 'ready' && words ? (words[pageNumber - 1] || []) : [];
  const selectActive = selectMode && selectAvailable && wordsForPage.length > 0;
  // Span geometry: font size from the layer height; scaleX (via canvas
  // measure) squeezes each line fragment to its PDF box width, like a
  // pdf.js text layer — so selection rects line up with the image words.
  const measureCtx = useMemo(() => {
    try { return document.createElement('canvas').getContext('2d'); } catch { return null; }
  }, []);
  const spanStyle = (w) => {
    const fontPx = Math.max(6, (w[3] / 100) * layerSize.h);
    let sx = 1;
    if (measureCtx && layerSize.w > 0) {
      measureCtx.font = `${fontPx}px sans-serif`;
      const tw = measureCtx.measureText(w[4]).width || 1;
      const bw = (w[2] / 100) * layerSize.w;
      sx = Math.min(2.5, Math.max(0.4, bw / tw));
    }
    return { left: `${w[0]}%`, top: `${w[1]}%`, width: `${w[2]}%`, height: `${w[3]}%`, fontSize: `${fontPx}px`, transform: `scaleX(${sx.toFixed(3)})` };
  };
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
        className={`docviewer-modal glass${focusMode ? ' docviewer-modal--focus' : ''}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={blockIfNotTyping}
        onCopy={onCopyGuard}
        onCut={blockIfNotTyping}
      >
        {focusMode && (
          <button type="button" className="focus-show-btn" onClick={() => setFocusMode(false)} title="Show controls">
            <i className="fa-solid fa-eye"></i> Show controls
          </button>
        )}
        <div className="docviewer-header">
          <span className="docviewer-title" title={title}>
            <i className="fa-solid fa-eye" style={{ marginRight: '8px' }}></i>
            {title || 'Document preview'}
            {hwPages && hwPages.has(pageNumber) && (
              <span className="viewer-hw-badge" title="This page is re-set in handwriting from the original notes">
                <i className="fa-solid fa-pen"></i> Handwritten
              </span>
            )}
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
                className={`pdf-nav-btn pdf-fit-btn ${selectMode ? 'active' : ''}`}
                onClick={() => setSelectMode((s) => !s)}
                aria-pressed={selectMode}
                title={selectMode ? 'Text select ON — drag over the page to select, then Highlight' : 'Select text on this page (fit-to-width view, typed pages only)'}
              >
                <i className="fa-solid fa-i-cursor"></i>
                <span>Select</span>
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
              <button
                type="button"
                className="pdf-nav-btn pdf-fit-btn"
                onClick={() => setFilmstrip((f) => !f)}
                aria-pressed={filmstrip}
                title="Page thumbnails"
                aria-label="Page thumbnails"
              >
                <i className="fa-solid fa-images"></i>
                <span>Pages</span>
              </button>
              <button
                type="button"
                className="pdf-nav-btn pdf-fit-btn"
                onClick={() => setToolsOpen((t) => !t)}
                aria-pressed={toolsOpen}
                title="More reading tools"
                aria-label="More reading tools"
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <span>Tools</span>
              </button>
            </div>
          </div>
        )}

        {ready && !tapHintSeen && (
          <div className="tap-hint">
            <i className="fa-solid fa-hand-pointer"></i>
            <span>Tip: tap the left edge for the previous page, right edge for the next — just like WhatsApp.</span>
            <button type="button" onClick={() => { try { localStorage.setItem('bn-tap-hint-seen', '1'); } catch {} setTapHintSeen(true); }}>Got it</button>
          </div>
        )}
        {ready && selectMode && !selectAvailable && (
          <div className="tap-hint">
            <span>Text select needs Fit-to-width view{isHwPage ? ' — this page is handwritten, so there is no text layer for it' : rotateDeg !== 0 ? ' — turn off rotation' : spread ? ' — turn off spread view' : ''}.</span>
            {!isHwPage && <button type="button" onClick={() => { setFitWidth(true); setRotateDeg(0); setSpread(false); }}>Fit to width</button>}
          </div>
        )}
        {ready && selectMode && selectAvailable && wordsState === 'none' && (
          <div className="tap-hint"><span>This page is a scan — there is no text to select.</span></div>
        )}

        {ready && toolsOpen && (
          <div className="viewer-tools" role="region" aria-label="Reading tools">
            <div className="viewer-tools-row">
              <span className="viewer-tools-label">Zoom</span>
              {[50, 75, 100, 150, 200].map((z) => (
                <button
                  key={z}
                  type="button"
                  className={`viewer-chip ${Math.round(scale * 100) === z ? 'active' : ''}`}
                  onClick={() => { setFitWidth(false); setScale(z / 100); }}
                >
                  {z}%
                </button>
              ))}
              <input
                type="range" min="60" max="200" step="5" value={Math.round(scale * 100)}
                aria-label="Zoom level slider"
                onChange={(e) => { setFitWidth(false); setScale(Number(e.target.value) / 100); }}
              />
            </div>
            <div className="viewer-tools-row">
              <span className="viewer-tools-label">View</span>
              <button type="button" className={`viewer-chip ${spread ? 'active' : ''}`} onClick={() => setSpread((s) => !s)} title="Two-page spread (desktop)">
                <i className="fa-solid fa-book-open"></i> Spread
              </button>
              <button type="button" className="viewer-chip" onClick={() => setRotateDeg((d) => (d + 90) % 360)} title="Rotate page 90°">
                <i className="fa-solid fa-rotate-right"></i> Rotate {rotateDeg}°
              </button>
              <button type="button" className={`viewer-chip ${rulerOn ? 'active' : ''}`} onClick={() => setRulerOn((r) => !r)} title="Reading ruler — a focus line that follows your pointer">
                <i className="fa-solid fa-ruler-horizontal"></i> Ruler
              </button>
              <button type="button" className={`viewer-chip ${focusMode ? 'active' : ''}`} onClick={() => setFocusMode((f) => !f)} title="Focus mode — hide all chrome, show only the page">
                <i className="fa-solid fa-eye-low-vision"></i> Focus
              </button>
              <label className="viewer-chip viewer-slider-chip" title="Night-reading brightness">
                <i className="fa-solid fa-moon"></i>
                <input type="range" min="50" max="100" step="5" value={brightness} aria-label="Page brightness" onChange={(e) => setBrightness(Number(e.target.value))} />
                <span>{brightness}%</span>
              </label>
              <span className="viewer-tools-label">Quality</span>
              <button type="button" className={`viewer-chip ${quality === 'fast' ? 'active' : ''}`} onClick={() => setQuality('fast')} title="Fast — loads only the next page (slow networks)">Fast</button>
              <button type="button" className={`viewer-chip ${quality === 'sharp' ? 'active' : ''}`} onClick={() => setQuality('sharp')} title="Sharp — preloads 3 pages ahead">Sharp</button>
            </div>
            <div className="viewer-tools-row">
              <span className="viewer-tools-label">Slideshow</span>
              <button type="button" className={`viewer-chip ${playing ? 'active' : ''}`} onClick={() => setPlaying((p) => !p)}>
                <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`}></i> {playing ? 'Pause' : 'Play'}
              </button>
              <select value={slideSecs} onChange={(e) => setSlideSecs(Number(e.target.value))} aria-label="Seconds per page" className="viewer-select">
                <option value={3}>3s / page</option>
                <option value={5}>5s / page</option>
                <option value={8}>8s / page</option>
              </select>
              <span className="viewer-tools-label">Flag this page</span>
              {Object.entries(FLAG_LABELS).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className={`viewer-chip flag-${k} ${flags[pageNumber] === k ? 'active' : ''}`}
                  onClick={() => setFlag(file, pageNumber, flags[pageNumber] === k ? null : k)}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className={`viewer-chip ${pageBookmarks[pageNumber] ? 'active' : ''}`}
                onClick={() => togglePageBookmark(file, pageNumber, title)}
                title="Bookmark this exact page"
              >
                <i className="fa-solid fa-bookmark"></i> {pageBookmarks[pageNumber] ? 'Page saved' : 'Save page'}
              </button>
              <button
                type="button"
                className={`viewer-chip ${hlMode ? 'active' : ''}`}
                onClick={() => setHlMode((h) => !h)}
                title="Drag on the page to mark an important area"
              >
                <i className="fa-solid fa-highlighter"></i> Highlight
              </button>
            </div>
            <div className="viewer-tools-row">
              <span className="viewer-tools-label">My note on p.{pageNumber}</span>
              <input
                type="text"
                className="viewer-note-input"
                value={noteText}
                placeholder="Add a sticky note on this page…"
                aria-label="Add a note on this page"
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && noteText.trim()) {
                    addAnnotation(file, pageNumber, noteText);
                    setNoteText('');
                  }
                }}
              />
              <button
                type="button"
                className="viewer-chip"
                onClick={() => {
                  if (noteText.trim()) {
                    addAnnotation(file, pageNumber, noteText);
                    setNoteText('');
                  }
                }}
              >
                Add note
              </button>
              {(annotations[pageNumber] || []).map((a) => (
                <span key={a.id} className="viewer-note-item">
                  {a.text}
                  <button type="button" aria-label="Delete note" onClick={() => deleteAnnotation(file, pageNumber, a.id)}>×</button>
                </span>
              ))}
              {noteMeta && noteMeta.unit && (
                <button
                  type="button"
                  className="viewer-chip syllabus-chip"
                  title="See what the syllabus says for this unit"
                  onClick={() => onOpenSyllabus && onOpenSyllabus(noteMeta.semId)}
                >
                  <i className="fa-solid fa-list-check"></i> Syllabus: {noteMeta.subject} · {noteMeta.unit}
                </button>
              )}
            </div>
            {(textHls[pageNumber] || []).length > 0 && (
              <div className="viewer-tools-row">
                <span className="viewer-tools-label">Text highlights p.{pageNumber}</span>
                {(textHls[pageNumber] || []).map((h) => (
                  <span key={h.id} className="viewer-note-item" title={h.text || ''}>
                    <span style={{ background: h.color, padding: '0 6px', borderRadius: 4 }}>{(h.text || '').slice(0, 24) || 'highlight'}</span>
                    <button type="button" aria-label="Delete text highlight" onClick={() => deleteTextHighlight(file, pageNumber, h.id)}>×</button>
                  </span>
                ))}
                <button type="button" className="viewer-chip" onClick={() => clearTextHighlights(file, pageNumber)}>Clear page</button>
              </div>
            )}
          </div>
        )}

        {ready && filmstrip && numPages && (
          <div className="viewer-filmstrip" role="region" aria-label="Page thumbnails">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`film-thumb ${n === pageNumber ? 'active' : ''}`}
                onClick={() => goToPage(n)}
                title={`Page ${n}${flags[n] ? ` — ${FLAG_LABELS[flags[n]]}` : ''}${pageBookmarks[n] ? ' — saved' : ''}`}
              >
                <img
                  src={thumbSrc(n)}
                  alt={`Page ${n}`}
                  loading="lazy"
                  draggable={false}
                  // If a thumb is missing (doc rendered before thumbnails),
                  // fall back to the full page image — slower, never broken.
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fellBack) {
                      t.dataset.fellBack = '1';
                      t.src = pageSrc(n);
                    }
                  }}
                />
                <span>
                  {n}
                  {flags[n] && <i className={`film-dot flag-${flags[n]}`}></i>}
                  {pageBookmarks[n] && <i className="fa-solid fa-bookmark film-bm"></i>}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="docviewer-body">
          {together.length > 0 && onOpenNext && (
            <div className="viewer-together">
              <span><i className="fa-solid fa-people-arrows"></i> Often read with:</span>
              {together.map((t) => (
                <button key={t.file} type="button" className="viewer-chip" onClick={() => onOpenNext(t.file, t.title)}>
                  {t.title}
                </button>
              ))}
            </div>
          )}
          {ready ? (
            <div
              className={`pdf-page-wrap${!imgReady && !imgError ? ' pdf-page-wrap--loading' : ''}${spread ? ' pdf-page-wrap--spread' : ''}${selectActive ? ' pdf-page-wrap--selecting' : ''}`}
              ref={wrapRef}
              onMouseMove={(e) => {
                if (rulerOn && wrapRef.current) {
                  const r = wrapRef.current.getBoundingClientRect();
                  setRulerY(Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)));
                }
                hlMove(e);
              }}
              onMouseDown={(e) => { tapDown(e); hlStart(e); }}
              onMouseUp={(e) => { hlEnd(); tapUp(e); }}
              onMouseLeave={() => setHlDrag(null)}
              onTouchStart={(e) => {
                lastTouchRef.current = Date.now();
                clearPendingTap();
                const t = e.touches[0];
                // e.timeStamp (not Date.now()): the tap-duration check in
                // tapUpCommon compares event timestamps, so a slow main
                // thread can't inflate the measured hold time.
                if (t) pointerRef.current = { x: t.clientX, y: t.clientY, t: e.timeStamp };
                onTouchStart(e);
              }}
              onTouchEnd={(e) => { onTouchEnd(e); tapTouchEnd(e); }}
              onDoubleClick={() => {
                if (fitWidth || scale < 2.0) {
                  setFitWidth(false);
                  setScale(2.0);
                } else {
                  setScale(1.0);
                }
              }}
            >
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
                style={{
                  width: fitWidth ? '100%' : `${Math.round(scale * 100)}%`,
                  filter: brightness !== 100 ? `brightness(${brightness}%)` : undefined,
                  transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined,
                }}
              />
              {spread && pageNumber < numPages && (
                <img
                  className={`img-page img-page--spread${blurred ? ' img-blurred' : ''}`}
                  src={pageSrc(pageNumber + 1)}
                  alt={`Page ${pageNumber + 1} of ${numPages} — ${title || 'note'}`}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    width: fitWidth ? '100%' : `${Math.round(scale * 100)}%`,
                    filter: brightness !== 100 ? `brightness(${brightness}%)` : undefined,
                    transform: rotateDeg ? `rotate(${rotateDeg}deg)` : undefined,
                  }}
                />
              )}
              {rulerOn && (
                <>
                  <div className="ruler-dim ruler-dim--top" style={{ height: `${Math.max(0, rulerY - 4)}%` }} aria-hidden="true" />
                  <div className="ruler-line" style={{ top: `${rulerY}%` }} aria-hidden="true" />
                  <div className="ruler-dim ruler-dim--bottom" style={{ top: `${Math.min(100, rulerY + 4)}%` }} aria-hidden="true" />
                </>
              )}
              {(highlights[pageNumber] || []).map((h) => (
                <div
                  key={h.id}
                  className="page-highlight"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                  title={hlMode ? 'Click to remove this highlight' : 'Highlighted area'}
                  onClick={(e) => {
                    if (hlMode) {
                      e.stopPropagation();
                      deleteHighlight(file, pageNumber, h.id);
                    }
                  }}
                />
              ))}
              {hlDrag && (
                <div
                  className="page-highlight page-highlight--drag"
                  style={{
                    left: `${Math.min(hlDrag.x0, hlDrag.x1)}%`,
                    top: `${Math.min(hlDrag.y0, hlDrag.y1)}%`,
                    width: `${Math.abs(hlDrag.x1 - hlDrag.x0)}%`,
                    height: `${Math.abs(hlDrag.y1 - hlDrag.y0)}%`,
                  }}
                  aria-hidden="true"
                />
              )}
              {selectActive && (
                <div className="text-layer" ref={textLayerRef} aria-label="Selectable page text">
                  {wordsForPage.map((w, i) => (
                    <span key={i} className="text-layer-word" style={spanStyle(w)}>{w[4]}</span>
                  ))}
                </div>
              )}
              {(textHls[pageNumber] || []).map((h) => (
                h.rects.map((r, i) => (
                  <div
                    key={`${h.id}-${i}`}
                    className="page-highlight page-highlight--text"
                    style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%`, background: h.color, borderColor: 'transparent' }}
                    title={selectMode ? 'Click to remove this highlight' : (h.text || '')}
                    onMouseDown={(e) => { hlClickPosRef.current = { x: e.clientX, y: e.clientY }; }}
                    onClick={(e) => {
                      if (!selectMode) return;
                      // A drag that starts on a highlight is a text selection,
                      // not a delete — only a real click (no movement) removes it.
                      const p = hlClickPosRef.current;
                      hlClickPosRef.current = null;
                      if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > TAP_MAX_MOVE) return;
                      e.stopPropagation();
                      deleteTextHighlight(file, pageNumber, h.id);
                    }}
                  />
                ))
              ))}
              {ready && !selectMode && (
                <>
                  <div className="tap-edge tap-edge--left" aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></div>
                  <div className="tap-edge tap-edge--right" aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></div>
                </>
              )}
              {selPop && selectActive && (
                <div className="textsel-pop" style={{ left: `${selPop.x}%`, top: `${selPop.y}%` }} onMouseDown={(e) => e.preventDefault()}>
                  {HL_COLORS.map((c) => (
                    <button key={c.name} type="button" className={`textsel-swatch ${selColor === c.bg ? 'active' : ''}`} style={{ background: c.bg }} title={`Highlight ${c.name}`} aria-label={`Highlight ${c.name}`} onClick={() => { setSelColor(c.bg); applyTextHighlight(); }} />
                  ))}
                  <button type="button" onClick={applyTextHighlight}><i className="fa-solid fa-highlighter"></i> Highlight</button>
                </div>
              )}
              {(annotations[pageNumber] || []).length > 0 && (
                <div className="page-notes-badge" title={(annotations[pageNumber] || []).map((a) => a.text).join(' · ')}>
                  <i className="fa-solid fa-note-sticky"></i> {(annotations[pageNumber] || []).length} note{(annotations[pageNumber] || []).length === 1 ? '' : 's'}
                </div>
              )}
              {flags[pageNumber] && (
                <div className={`page-flag-badge flag-${flags[pageNumber]}`} title={FLAG_LABELS[flags[pageNumber]]}>
                  {FLAG_LABELS[flags[pageNumber]]}
                </div>
              )}
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
              {pageNumber >= numPages && noteMeta && noteMeta.next && onOpenNext && (
                <button
                  type="button"
                  className="viewer-upnext"
                  onClick={() => onOpenNext(noteMeta.next.file, noteMeta.next.title)}
                >
                  <i className="fa-solid fa-arrow-right"></i> Up next: {noteMeta.next.title}
                </button>
              )}
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
