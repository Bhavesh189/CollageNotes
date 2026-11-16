import React from 'react';
import { formatSize, fileSizes } from '../data/fileSizes';

// Explicit View + Download actions used on every note row across the site
// (NotesHub, SearchResults, PyqFinder). View opens the in-page DocViewer;
// Download is a plain anchor so the browser saves the file.
export const ViewButton = ({ onClick, label }) => (
  <button
    type="button"
    className="action-btn action-view"
    onClick={onClick}
    title={label || 'View in browser'}
    aria-label={label || 'View in browser'}
  >
    <i className="fa-solid fa-eye"></i>
    <span>View</span>
  </button>
);

export const DownloadButton = ({ file, label }) => (
  <a
    href={file}
    download
    className="action-btn action-download"
    onClick={(e) => e.stopPropagation()}
    title={label || 'Download file'}
    aria-label={label || 'Download file'}
  >
    <i className="fa-solid fa-download"></i>
    <span>Download</span>
  </a>
);

// Open-in-new-tab variant for external links (no forced download possible).
export const OpenButton = ({ file, label }) => (
  <a
    href={file}
    target="_blank"
    rel="noopener noreferrer"
    className="action-btn action-view"
    onClick={(e) => e.stopPropagation()}
    title={label || 'Open link'}
    aria-label={label || 'Open link'}
  >
    <i className="fa-solid fa-arrow-up-right-from-square"></i>
    <span>Open</span>
  </a>
);

export const ComingSoonButton = () => (
  <button type="button" className="action-btn action-disabled" disabled title="Not uploaded yet">
    <i className="fa-solid fa-hourglass-half"></i>
    <span>Coming soon</span>
  </button>
);

export { formatSize, fileSizes };
