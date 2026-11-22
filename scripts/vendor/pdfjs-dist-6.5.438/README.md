# Vendored pdf.js 6.5.438 (render-time only)

This directory holds the MINIMAL set of pdfjs-dist 6.5.438 needed by the
build-time render scripts (`scripts/render-notes.mjs` and friends):

- `legacy/build/pdf.mjs` (1.1 MB) — self-contained ESM build, no static
  imports. It is the only pdf.js file the render scripts load.
- `legacy/build/pdf.worker.mjs` (2.4 MB) — the worker module. pdf.js's
  Node "fake worker" setup loads this file at `getDocument` time (it must
  sit next to `pdf.mjs`); without it the render fails with "Setting up
  fake worker failed: Cannot find module .../pdf.worker.mjs".
- `standard_fonts/` (816 KB) — the standard 14 fonts, referenced via
  `standardFontDataUrl` so text renders without system fonts.

## Why vendored (do not "clean this up" by pointing at node_modules)

The app and the renderer need DIFFERENT pdf.js versions, and npm can only
hoist one:

- The app (`react-pdf` 9.2.1, `PdfViewer.jsx`) needs pdfjs-dist **4.8.69**
  (the version react-pdf 9.2.1 was built against). With 6.5.438 hoisted,
  the PDF viewer mounts but `onLoadSuccess` never fires — the worker
  protocol changed. So `package.json` pins `pdfjs-dist: ^4.8.69`.
- The renderer (Node + `@napi-rs/canvas`) needs pdfjs-dist **6.5.438**.
  With 4.8.69, `page.render()` SEGFAULTS (exit 139, inside the render
  call — verified 2026-11-23 on this VM). 6.5.438 renders all 168 notes
  cleanly (5,894 pages, deterministic bytes).

Vendoring the 4.2 MB that the renderer actually uses is the fix: the
renderer imports this copy, the app keeps using the npm-installed 4.8.69,
and neither can break the other again. If pdf.js is ever upgraded, re-verify
BOTH paths (browser viewer load + Node canvas render) before changing
either version.

Source: `npm pack pdfjs-dist@6.5.438` (tarball 9 MB, full package 38 MB —
only `legacy/build/pdf.mjs` + `standard_fonts/` are kept here).
