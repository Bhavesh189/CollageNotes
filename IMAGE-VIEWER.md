# Image viewer — notes as page images, no PDF reaches the browser

## Two viewers, one component
`src/components/DocViewer.jsx` is a thin wrapper that picks by the
`allowDownload` prop the caller already passes:
- **NOTES (allowDownload falsy — the default): `ImageViewer.jsx`.** The
  browser NEVER receives a PDF file. Page images only, from
  `public/generated/<dir>/page-001.jpg …` + a per-doc `search.json`
  (per-page text) + `public/generated/manifest.json` (file → images).
  No Download button, no text layer (nothing selectable), a diagonal
  `thebhavesh.online` watermark on every page, copy blocked, and the
  screenshot deterrents below. Search works against the per-doc index
  (page-level matches, jump to a match's page). No word highlight —
  images can't be highlighted.
- **PYQ / SYLLABUS (allowDownload true): `PdfViewer.jsx`** (react-pdf).
  The real PDF with a Download button, text layer ON (selectable, as the
  old viewer had it), no watermark, no copy block, no blur deterrent.
  PYQs are EXEMPT from the no-download rule (his order 2026-11-22):
  users can view AND download them; syllabus is treated the same way.
  The old "No Download button anywhere for notes / PYQ / syllabus"
  wording is superseded by this two-mode design.

Both viewers share: page-jump type input (clamp 1..N), prev/next,
fit-width + zoom levels (0.6–2.0), fullscreen, arrow-key paging,
resume reading (last page per file, localStorage `bn-viewer-page:`)
and zoom memory (`bn-viewer-zoom`), GA4 `view_pdf` on open, and
study-progress hooks (`recordPageView` / `recordSession` → My Study).

## Build-time render (NOTES ONLY)
- `scripts/render-notes.mjs` renders every NOTES PDF under
  `notes-source/notes/` to page images + per-page text, and calls
  `scripts/build-keywords.mjs` to build `public/generated/keywords.json`
  (the chatbot's grounded-answer index). It runs automatically as the
  `prebuild` npm script before `vite build` — including on Vercel — so a
  new note renders without manual work.
- Source NOTES PDFs moved OUT of `public/` into `notes-source/notes/`
  (committed, but NOT served — Vercel only serves `public/` + the built
  assets, so no raw file URL exists). `public/generated/` is gitignored
  build output. PYQ (302 docs) and syllabus (4 docs) stay as PDFs under
  `public/pyq/` + `public/syllabus/` and are NOT rendered.
- The script is incremental locally (skips docs whose source SHA-1 +
  settings match the manifest); on a clean Vercel checkout it renders
  everything on the first build. It writes the manifest after EVERY doc,
  so a killed run loses nothing, and `scripts/recover-manifest.mjs`
  rebuilds the manifest from on-disk images.

## Scale (measured 2026-11-22, render complete)
- NOTES ONLY: **168 PDFs, 5,894 pages, 752 MB source.** Rendered at
  scale 1.5, JPEG q80: ~105 KB/page, **~739 MB images total**, crisp on
  phone. Deterministic bytes (same input → identical JPEG), so Vercel's
  content-hash dedupe makes re-deploys cheap.
- Full render ≈ 33 min on a 2-core VM in small batches (the VM OOM-kills
  a single long run — see below), ~8–15 min on Vercel's 4-vCPU build
  machine (under the 45-min build cap). Output files ≈ 6,000 (images +
  search JSONs + manifest + keywords) — under Vercel's 16,000
  build-output guidance; no strict static-size cap.
- Render completed 2026-11-22 (batch driver, 8 rounds): 168/168 docs,
  5,894 pages. One error: `em2-unit-3.pdf` (corrupt, see below).
- OOM LESSON (2026-11-22): the render dies SIGKILL (exit 137) when run
  alongside another heavy job on this 2-core / 6 GB VM. Never run the
  full render in one go — small batches (20–30 docs per run, resume
  between runs), TMPDIR in the workspace. The worker-thread leak that
  caused the early kills is fixed (`w.terminate()` after each doc in
  `render-notes.mjs`) — native pdf.js/canvas memory is off-heap and the
  Node heap cap does not bound it.

## Instant open (his order 2026-11-22)
The viewer must feel like reading the PDF itself — the user must never
know no PDF was served:
- The manifest is prefetched on app idle (`prefetchViewerManifest`,
  called from `App.jsx`) so the first viewer open finds it cached.
- Page 1 renders the moment the manifest entry is known — the search
  index loads in the BACKGROUND and never gates the first page.
- The next 3 pages (and the previous one) preload while the user reads,
  so page turns find the image already in the browser cache.
- A page-shaped skeleton holds the page's place while an image is
  genuinely not ready yet — never a blank wait. The current page image
  carries `fetchpriority="high"`.
- Images are scale 1.5 / JPEG q80 (~105 KB/page). Measured on throttled
  mobile (CDP Slow 3G): first page visible in ~1–2 s after open, page
  turns instant from cache. A smaller variant was considered and not
  needed.

## Search
- Works against the per-doc `search.json` (page-level matches, jump to
  a match's page). No word highlight — images can't be highlighted.
- LIMIT: scanned documents have no extractable text, so search finds
  nothing in them — **74 notes docs are scans** (the other 94 typed
  notes search fine). No OCR is run. The site's title/metadata search
  is unaffected. (The old "300 of 302 PYQs are scans" line referred to
  the pre-exemption scope — PYQs are PDFs now, and their in-viewer
  search uses the PDF's own text layer.)

## Screenshot deterrents + honest limit
- The page blurs when the window loses focus or the tab is hidden
  (app-switch / screen-share), the PrintScreen key is blocked + briefly
  blurs, and long-press / right-click is disabled. A diagonal
  `thebhavesh.online` watermark is on every page.
- HONEST LIMIT: no website can block OS-level screenshots (desktop
  PrintScreen / Snipping Tool, mobile OS capture all bypass the page).
  The deterrents stop casual copying; the watermark is the real
  traceability. Never claim "screenshot-proof" in any UI copy.

## Adding a note
Drop the PDF into `notes-source/notes/<sem>/…`, add its entry to
`src/data/notesData.js` with `file: '/notes/<sem>/…'`, push — the next
build renders it. Locally: `node scripts/render-notes.mjs` (or
`--only <substring>` for one doc), then `npm run build`. PYQ/syllabus:
drop into `public/pyq/` / `public/syllabus/` as before (no render).

## Known issues (pre-existing, not introduced here)
- `notes/sem2/engineering-mathematics-2/em2-unit-3.pdf` is corrupt
  ("Invalid PDF structure") — the renderer logs it and the viewer shows a
  clean error. The old PDF viewer couldn't open it either.
- 48 entries in `notesData.js` point to files that don't exist on disk
  (mostly old Sem 1 root-level PDFs, e.g. `/cin1.pdf` — Sem 1 has 49 refs
  and ZERO files on disk). The viewer shows "not available as page
  images yet" for them instead of a PDF 404. The catalog entries were
  left in place — deleting them is a separate call.
- 15 `.docx` references in `notesData.js` have no file on disk either.
  The old Google-Docs-viewer fallback was removed with the PDF viewer;
  there is nothing to embed.
- Pages whose JPEG renders suspiciously small (<12 KB) are flagged in the
  manifest as `suspicious` — usually a blank page or a JBIG2 image that
  pdf.js skipped (pdf.js can't load its JBIG2 decoder without a wasm URL).
  If a doc shows blank pages, re-render that doc with a JBIG2-capable
  renderer (e.g. PyMuPDF) and replace its images.
