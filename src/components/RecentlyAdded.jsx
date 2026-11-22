import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pyqPapers } from '../data/pyqData';
import { fileSizes, formatSize } from '../data/fileSizes';

// "Recently added" strip — newest PYQ papers first (real data, year-desc).
// Horizontal scroller with arrow buttons, edge fade and uniform card heights;
// the scrollbar itself is hidden so the strip never looks cut off.
const RecentlyAdded = ({ onOpenPyq }) => {
  const recent = useMemo(
    () => [...pyqPapers].sort((a, b) => b.year - a.year || a.subject.localeCompare(b.subject)).slice(0, 10),
    []
  );
  const rowRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  if (recent.length === 0) return null;

  const scrollBy = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.7), behavior: 'smooth' });
  };

  return (
    <section className="recent-strip" aria-label="Recently added">
      <div className="recent-strip-head">
        <h3><i className="fa-solid fa-clock-rotate-left"></i> Recently added</h3>
        <div className="recent-strip-actions">
          <button
            type="button"
            className="recent-nav-btn"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Scroll recently added backwards"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="recent-nav-btn"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Scroll recently added forwards"
          >
            <ChevronRight size={18} />
          </button>
          <button className="recent-strip-link" onClick={onOpenPyq} type="button">
            View all PYQs <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div className="recent-strip-row" ref={rowRef} onScroll={updateArrows}>
        {recent.map((p) => (
          <a
            key={p.id}
            href={p.file}
            download
            className="recent-card glass"
            title={`${p.subject} — ${p.session}`}
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
