import React from 'react';
import { syllabusData } from '../data/syllabusData';
import { formatSize, fileSizes } from '../data/fileSizes';
import { ViewButton, DownloadButton } from './NoteActions';

// The syllabus card — always the FIRST thing on a semester page.
// Available semesters get View (in-page) + Download; the rest get an honest
// "coming soon" card until the official document is added.
// Syllabus is downloadable (PYQ downloads removed 2026-11-26).
const SyllabusCard = ({ semId, onPreview }) => {
  const data = syllabusData[semId];
  if (!data) return null;

  if (!data.available) {
    return (
      <div className="syllabus-card syllabus-coming glass">
        <div className="syllabus-icon">
          <i className="fa-solid fa-book-open"></i>
        </div>
        <div className="syllabus-text">
          <h3>{data.title}</h3>
          <p>{data.subtitle}</p>
          <p className="syllabus-meta">Official BTU syllabus for this semester is being added — check back soon.</p>
        </div>
        <div className="syllabus-actions">
          <button type="button" className="action-btn action-disabled" disabled>
            <i className="fa-solid fa-hourglass-half"></i>
            <span>Coming soon</span>
          </button>
        </div>
      </div>
    );
  }

  const size = fileSizes[data.file] != null ? formatSize(fileSizes[data.file]) : null;

  return (
    <div className="syllabus-card glass">
      <div className="syllabus-icon">
        <i className="fa-solid fa-book-open"></i>
      </div>
      <div className="syllabus-text">
        <span className="syllabus-badge">
          <i className="fa-solid fa-graduation-cap"></i> Official Syllabus
        </span>
        <h3>{data.title}</h3>
        <p>{data.subtitle}</p>
        <p className="syllabus-meta">
          {data.source} · Session {data.session}
          {size && <> · {size} PDF</>}
        </p>
      </div>
      <div className="syllabus-actions">
        <ViewButton
          onClick={() => onPreview && onPreview({ file: data.file, title: data.title, allowDownload: true })}
          label={`View ${data.title}`}
        />
        <DownloadButton file={data.file} label={`Download ${data.title}`} kind="syllabus" />
      </div>
    </div>
  );
};

export default SyllabusCard;
