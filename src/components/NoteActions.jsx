import React from 'react';
import { Bookmark } from 'lucide-react';
import { formatSize, fileSizes } from '../data/fileSizes';

// Icon-only bookmark toggle (bundled lucide icon — never a CDN font).
// Renders a filled bookmark when active. onClick receives the click event;
// callers that render it inside a clickable row must stopPropagation.
export const BookmarkButton = ({ active, onClick, label }) => (
  <button
    type="button"
    className={`action-btn action-bookmark ${active ? 'active' : ''}`}
    onClick={(e) => { e.stopPropagation(); if (onClick) onClick(e); }}
    title={label || (active ? 'Remove bookmark' : 'Bookmark this')}
    aria-label={label || (active ? 'Remove bookmark' : 'Bookmark this')}
    aria-pressed={!!active}
  >
    <Bookmark size={16} fill={active ? 'currentColor' : 'none'} aria-hidden="true" />
  </button>
);

// Explicit View action used on every note row across the site
// (NotesHub, SearchResults, PyqFinder). View opens the in-page DocViewer.
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

// Open-in-new-tab variant for external links (no forced file save possible).
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
