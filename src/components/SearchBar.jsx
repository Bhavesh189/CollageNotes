import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Search, X, Mic } from 'lucide-react';
import { searchAll } from '../lib/searchIndex';
import { getSearchHistory, removeSearchHistory, recordSearch } from '../lib/study';

// Prominent header search input. Parent owns value/onChange.
// Exposes focus() via ref for the "/" keyboard shortcut.
// F3: live suggestions (top matches as you type), recent searches
// (tap to re-run, delete one), and voice search (Web Speech API).
const SearchBar = forwardRef(({ value, onChange, onEscape, onNavigate, placeholder }, ref) => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);
  const boxRef = useRef(null);

  const q = String(value || '').trim();
  const suggestions = q.length >= 2 ? searchAll({ query: q }).slice(0, 6) : [];

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const openSuggest = () => {
    setHistory(getSearchHistory());
    setOpen(true);
  };

  const runQuery = (term) => {
    recordSearch(term);
    onChange(term);
    setOpen(false);
    if (onNavigate) onNavigate('search');
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Voice search is not supported in this browser — try Chrome on Android/desktop.');
      return;
    }
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    rec.onresult = (e) => {
      const heard = e.results && e.results[0] && e.results[0][0] && e.results[0][0].transcript;
      setListening(false);
      if (heard) runQuery(heard.trim());
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  };

  return (
    <div className="header-search" role="search" ref={boxRef}>
      <Search size={18} className="header-search-icon" aria-hidden="true" />
      <input
        ref={ref}
        type="text"
        className="header-search-input"
        placeholder={placeholder || 'Search notes, PYQs, subjects…'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={openSuggest}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.target.blur();
            setOpen(false);
            if (onEscape) onEscape();
          }
          if (e.key === 'Enter' && q.length >= 2) runQuery(q);
        }}
        aria-label="Search all notes and papers"
        autoComplete="off"
      />
      {!value && (
        <kbd className="header-search-kbd" aria-hidden="true" title="Press / to search">/</kbd>
      )}
      <button
        className={`header-search-mic ${listening ? 'listening' : ''}`}
        onClick={startVoice}
        aria-label={listening ? 'Listening… tap to stop' : 'Voice search'}
        title="Voice search"
        type="button"
      >
        <Mic size={16} />
      </button>
      {value && (
        <button
          className="header-search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          <X size={16} />
        </button>
      )}
      {open && (
        <div className="header-suggest" role="listbox" aria-label="Search suggestions">
          {q.length >= 2 ? (
            suggestions.length > 0 ? (
              suggestions.map((s) => (
                <button key={s.id} type="button" className="header-suggest-row" onClick={() => runQuery(s.title)}>
                  <i className={`fa-solid ${s.type === 'pyq' ? 'fa-file-lines' : 'fa-file-pdf'}`}></i>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.semesterName} · {s.subject}</small>
                  </span>
                  <span className={`result-badge ${s.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>{s.type === 'pyq' ? 'PYQ' : 'Note'}</span>
                </button>
              ))
            ) : (
              <div className="header-suggest-empty">No quick matches — press Enter to search anyway.</div>
            )
          ) : (
            <>
              {history.length > 0 && (
                <>
                  <div className="header-suggest-head">Recent searches</div>
                  {history.map((h) => (
                    <div key={h} className="header-suggest-row">
                      <button type="button" className="header-suggest-main" onClick={() => runQuery(h)}>
                        <i className="fa-solid fa-clock-rotate-left"></i> {h}
                      </button>
                      <button
                        type="button"
                        className="header-suggest-del"
                        aria-label={`Remove ${h} from recent searches`}
                        onClick={() => {
                          removeSearchHistory(h);
                          setHistory(getSearchHistory());
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </>
              )}
              <div className="header-suggest-hint">
                Try: <button type="button" onClick={() => runQuery('sem:3 dbms')}>sem:3 dbms</button>
                {' · '}<button type="button" onClick={() => runQuery('type:pyq year:2024')}>type:pyq year:2024</button>
                {' · '}<button type="button" onClick={() => runQuery('dsa unit 2')}>dsa unit 2</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchBar;
