import React from 'react';
import PdfViewer from './PdfViewer';
import ImageViewer, { prefetchViewerManifest } from './ImageViewer';

export { prefetchViewerManifest };

// Document viewer — one component for every caller, two renderers inside.
//  - NOTES (allowDownload falsy — the default): page IMAGES ONLY
//    (ImageViewer). The browser never receives a PDF file: no download,
//    watermark + screenshot deterrents, search against the build-time
//    text index. Page images allow the browser's native Copy image +
//    drag (his order 2026-11-24) — the watermark is an HTML overlay, not
//    baked into the JPEG, so a copied image leaves without it.
//  - PYQ PAPERS (file under /pyq/): page IMAGES (ImageViewer, 2026-11-24)
//    with a Download button (the source PDF) + the Solution button
//    (PYQ only, via onShowSolution). Fast + light — the whole PDF no
//    longer loads just to read a paper.
//  - SYLLABUS + anything else with allowDownload: the real PDF
//    (PdfViewer) with Download button, text layer and full toolbar —
//    the file is meant to be kept.
//  - PYQ SOLUTIONS (/pyq-solutions/...): page images, protected viewer,
//    no download (allowDownload false).
// The caller passes allowDownload (NotesHub notes = false; PyqFinder /
// syllabus = true; SearchResults / Bookmarks per item type). Default
// (no prop) = protected notes mode.
const DocViewer = ({ file, title, onClose, context, allowDownload, onOpenSyllabus, onOpenNext, onShowSolution }) => {
  // PYQ papers are identified by path, not by caller — every caller
  // (PyqFinder, SearchResults, Bookmarks, chat) opens them the same way.
  // '/pyq-solutions/...' does NOT match this prefix ('/pyq-solutions'
  // starts with '/pyq-s', not '/pyq/'), so solutions stay protected.
  if (file && file.startsWith('/pyq/')) {
    return (
      <ImageViewer
        file={file}
        title={title}
        onClose={onClose}
        context={context}
        onOpenSyllabus={onOpenSyllabus}
        onOpenNext={onOpenNext}
        downloadUrl={file}
        onShowSolution={onShowSolution}
      />
    );
  }
  if (allowDownload) {
    return (
      <PdfViewer
        file={file}
        title={title}
        onClose={onClose}
        context={context}
        allowDownload
        onShowSolution={onShowSolution}
      />
    );
  }
  return (
    <ImageViewer file={file} title={title} onClose={onClose} context={context} onOpenSyllabus={onOpenSyllabus} onOpenNext={onOpenNext} />
  );
};

export default DocViewer;
