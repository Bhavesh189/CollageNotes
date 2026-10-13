import React, { useMemo } from 'react';
import { pyqPapers } from '../data/pyqData';
import { fileSizes, formatSize } from '../data/fileSizes';

// "Recently added" strip — newest PYQ papers first (real data, year-desc).
const RecentlyAdded = ({ onOpenPyq }) => {
  const recent = useMemo(
    () => [...pyqPapers].sort((a, b) => b.year - a.year || a.subject.localeCompare(b.subject)).slice(0, 10),
    []
  );

  if (recent.length === 0) return null;

  return (
    <section className="recent-strip" aria-label="Recently added">
      <div className="recent-strip-head">
        <h3><i className="fa-solid fa-clock-rotate-left"></i> Recently added</h3>
        <button className="recent-strip-link" onClick={onOpenPyq} type="button">
          View all PYQs <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="recent-strip-row">
        {recent.map((p) => (
          <a
            key={p.id}
            href={p.file}
            download
            className="recent-card glass"
          >
            <i className="fa-solid fa-file-lines recent-card-icon"></i>
            <span className="recent-card-title">{p.subject}</span>
            <span className="recent-card-meta">
              {p.session}
              {fileSizes[p.file] != null && <> · {formatSize(fileSizes[p.file])}</>}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
