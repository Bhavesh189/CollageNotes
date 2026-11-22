import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, Bookmark } from 'lucide-react';
import './styles/App.css';
import GlowBg from './components/GlowBg';
import FloatingBot from './components/FloatingBot';
import TabSelector from './components/TabSelector';
import SearchBar from './components/SearchBar';
import BackToTop from './components/BackToTop';
import NotesHub from './pages/NotesHub';
import PyqFinder from './pages/PyqFinder';
import SearchResults from './pages/SearchResults';
import AddNotesForm from './pages/AddNotesForm';
import Bookmarks from './pages/Bookmarks';
import { getBookmarks } from './lib/bookmarks';
import { pyqSubjectsFor } from './lib/subjectPyq';
import { semestersData } from './data/notesData';

const TICKER_ITEMS = [
  'Added New B.Tech Semester 2 Notes! Check them now.',
  'Document Analyzer AI integration available on the floating widget.',
  'Every semester page now starts with its official BTU syllabus — View or Download it right there.',
];

const SEM_IDS = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];

function themeFromEnv() {
  if (typeof document !== 'undefined') {
    const t = document.documentElement.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
  }
  try {
    const s = localStorage.getItem('bn-theme');
    if (s === 'dark' || s === 'light') return s;
  } catch {
    // ignore
  }
  return 'light';
}

function semFromHash() {
  const m = (window.location.hash || '').match(/^#sem([1-8])$/);
  return m ? `sem${m[1]}` : null;
}

function App() {
  const [currentView, setCurrentView] = useState('notes'); // 'notes', 'pyq', 'search', 'add-notes', 'bookmarks'
  const [currentSem, setCurrentSem] = useState(() => semFromHash() || 'sem1');
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(themeFromEnv);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bmCount, setBmCount] = useState(() => getBookmarks().length);
  // Get PYQ filter: { subjects: [pyq subject names], label } or null
  const [pyqFilter, setPyqFilter] = useState(null);
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);
  const prevViewRef = useRef('notes');

  // Apply theme to <html> + persist it
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bn-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Scroll progress + sticky-header shadow
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollWidth(`${scrolled}%`);
      } else {
        setScrollWidth('0%');
      }
      if (headerRef.current) {
        headerRef.current.classList.toggle('scrolled', window.scrollY > 8);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Semester deep links: #sem3 etc. — readable on load, back/forward works
  useEffect(() => {
    const onHash = () => {
      const sem = semFromHash();
      if (sem) {
        setCurrentSem(sem);
        setCurrentView('notes');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Bookmark count badge stays fresh
  useEffect(() => {
    const refresh = () => setBmCount(getBookmarks().length);
    window.addEventListener('bn-bookmarks-changed', refresh);
    return () => window.removeEventListener('bn-bookmarks-changed', refresh);
  }, []);
  useEffect(() => {
    setBmCount(getBookmarks().length);
  }, [currentView]);

  // "/" focuses search, Escape exits search view (global, ignored while typing in inputs)
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        if (currentView !== 'search') prevViewRef.current = currentView;
        setCurrentView('search');
        setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 0);
      } else if (e.key === 'Escape' && currentView === 'search' && !typing) {
        setSearchQuery('');
        setCurrentView(prevViewRef.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentView]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim().length >= 1 && currentView !== 'search') {
      prevViewRef.current = currentView;
      setCurrentView('search');
    }
    if (value.trim().length === 0 && currentView === 'search') {
      setCurrentView(prevViewRef.current);
    }
  };

  const goToView = (view) => {
    if (view !== 'search') prevViewRef.current = view;
    if (view !== 'pyq') setPyqFilter(null);
    setMenuOpen(false);
    setCurrentView(view);
  };

  const goToSem = (semId) => {
    setCurrentSem(semId);
    setCurrentView('notes');
    setMenuOpen(false);
    try {
      window.history.pushState(null, '', `#${semId}`);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0 });
  };

  const handleSemTab = (semId) => {
    setCurrentSem(semId);
    try {
      window.history.pushState(null, '', `#${semId}`);
    } catch {
      // ignore
    }
  };

  const goToPyqFor = (subjectId, subjectName) => {
    const subjects = pyqSubjectsFor(subjectId);
    if (subjects.length === 0) return;
    setPyqFilter({ subjects, label: subjectName });
    setCurrentView('pyq');
    window.scrollTo({ top: 0 });
  };

  const tickerText = TICKER_ITEMS.join('  •  ') + '  •  ';

  return (
    <div className="app-container">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: scrollWidth }}></div>

      {/* Dynamic Glow Background */}
      <GlowBg />

      {/* Main Header / Navigation */}
      <header className="main-header glass" ref={headerRef}>
        <div className="logo-section">
          <h1>
            Bhavesh Notes <span className="logo-dot"></span>
          </h1>
        </div>
        <SearchBar
          ref={searchInputRef}
          value={searchQuery}
          onChange={handleSearchChange}
          onEscape={() => { setSearchQuery(''); setCurrentView(prevViewRef.current); }}
        />
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <button
            className={`nav-btn ${currentView === 'notes' ? 'active' : ''}`}
            onClick={() => goToView('notes')}
          >
            <i className="fa-solid fa-graduation-cap"></i> <span className="nav-label">Notes Dashboard</span>
          </button>
          <a
            href="https://bhavesh189.github.io/Result-Website/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn"
          >
            <i className="fa-solid fa-square-poll-vertical"></i> <span className="nav-label">See Result</span>
          </a>
          <button
            className={`nav-btn ${currentView === 'pyq' ? 'active' : ''}`}
            onClick={() => goToView('pyq')}
          >
            <i className="fa-solid fa-file-lines"></i> <span className="nav-label">PYQ Papers</span>
          </button>
          <button
            className={`nav-btn ${currentView === 'bookmarks' ? 'active' : ''}`}
            onClick={() => goToView('bookmarks')}
          >
            <Bookmark size={16} /> <span className="nav-label">Bookmarks</span>
            {bmCount > 0 && <span className="nav-badge" aria-label={`${bmCount} bookmarks`}>{bmCount}</span>}
          </button>
          <button
            className={`nav-btn ${currentView === 'add-notes' ? 'active' : ''}`}
            onClick={() => goToView('add-notes')}
          >
            <i className="fa-solid fa-circle-plus"></i> <span className="nav-label">Add Notes</span>
          </button>
          <a
            href="https://thebhavesh.online"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn"
          >
            <i className="fa-solid fa-user"></i> <span className="nav-label">Portfolio</span>
          </a>
        </nav>
      </header>

      {/* Marquee Notifications Ticker — seamless loop (content duplicated) */}
      <div className="ticker-wrap glass">
        <div className="ticker-title">
          <i className="fa-solid fa-bullhorn" style={{ animation: 'bounce 1s infinite' }}></i>
          <span className="ticker-title-text">Notifications</span>
        </div>
        <div className="ticker-marquee">
          <div className="ticker-track">
            <span className="ticker-chunk">🚀 {tickerText}</span>
            <span className="ticker-chunk" aria-hidden="true">🚀 {tickerText}</span>
          </div>
        </div>
      </div>

      {/* Semester Tabs - Notes view only */}
      {currentView === 'notes' && (
        <TabSelector activeTab={currentSem} onChangeTab={handleSemTab} />
      )}

      {/* Page Content View Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentView === 'notes' && (
          <NotesHub currentSem={currentSem} onNavigate={goToView} onNavigatePyq={goToPyqFor} />
        )}
        {currentView === 'pyq' && (
          <PyqFinder
            initialSubjects={pyqFilter ? pyqFilter.subjects : null}
            initialLabel={pyqFilter ? pyqFilter.label : null}
            onClearInitialSubjects={() => setPyqFilter(null)}
          />
        )}
        {currentView === 'bookmarks' && (
          <Bookmarks onBrowseNotes={() => goToView('notes')} />
        )}
        {currentView === 'search' && (
          <SearchResults
            query={searchQuery}
            onQueryChange={handleSearchChange}
            onClear={() => { setSearchQuery(''); setCurrentView(prevViewRef.current); }}
          />
        )}
        {currentView === 'add-notes' && (
          <AddNotesForm />
        )}
      </main>

      {/* Floating DocAna Bot Widget */}
      <FloatingBot />

      {/* Back to top */}
      <BackToTop />

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>Bhavesh Notes</strong>
            <p>B.Tech CSE notes, official syllabus &amp; PYQs, free for every student.</p>
          </div>
          <nav className="footer-col" aria-label="Semesters">
            <h4>Semesters</h4>
            {SEM_IDS.map((id) => (
              <button key={id} type="button" onClick={() => goToSem(id)}>
                {semestersData[id] ? semestersData[id].name : id}
              </button>
            ))}
          </nav>
          <nav className="footer-col" aria-label="Browse">
            <h4>Browse</h4>
            <button type="button" onClick={() => goToView('pyq')}>PYQ Papers</button>
            <button type="button" onClick={() => goToView('bookmarks')}>Bookmarks{bmCount > 0 ? ` (${bmCount})` : ''}</button>
            <button type="button" onClick={() => goToView('add-notes')}>Add Notes</button>
          </nav>
          <nav className="footer-col" aria-label="Links">
            <h4>Links</h4>
            <a href="https://thebhavesh.online" target="_blank" rel="noopener noreferrer">Portfolio — thebhavesh.online</a>
            <a href="https://bhavesh189.github.io/Result-Website/" target="_blank" rel="noopener noreferrer">See Result</a>
          </nav>
        </div>
        <p className="footer-base">Made for students, by a student · Bikaner Technical University</p>
      </footer>
    </div>
  );
}

export default App;
