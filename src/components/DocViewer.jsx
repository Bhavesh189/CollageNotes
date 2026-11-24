import React from 'react';
import PdfViewer from './PdfViewer';
import ImageViewer, { prefetchViewerManifest } from './ImageViewer';

export { prefetchViewerManifest };

// Document viewer — one component for every caller, two renderers inside.
//  - NOTES (allowDownload falsy — the default): page IMAGES ONLY
//    (ImageViewer). The browser never receives a PDF file: no download,
//    no text layer, watermark + screenshot deterrents, search against the
//    build-time text index.
//  - PYQ / SYLLABUS (allowDownload true): the real PDF (PdfViewer) with
//    Download button, text layer and full toolbar — the file is meant to
//    be kept.
// The caller passes allowDownload (NotesHub notes = false; PyqFinder /
// syllabus = true; SearchResults / Bookmarks per item type). Default
// (no prop) = protected notes mode.
const DocViewer = ({ file, title, onClose, context, allowDownload, onOpenSyllabus, onOpenNext, onShowSolution }) => {
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
