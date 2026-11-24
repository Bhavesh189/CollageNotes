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
import MyStudy from './pages/MyStudy';
import TopicsAZ from './pages/TopicsAZ';
import CommandPalette from './components/CommandPalette';
import { getBookmarks } from './lib/bookmarks';
import { getSettings, getStreak } from './lib/study';
import { trackPageView } from './lib/analytics';
import { prefetchViewerManifest } from './components/DocViewer';
import { pyqSubjectsFor } from './lib/subjectPyq';
import { semestersData } from './data/notesData';
import { buildSearchIndex } from './lib/searchIndex';

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
  const [currentView, setCurrentView] = useState('notes'); // 'notes', 'pyq', 'search', 'add-notes', 'bookmarks', 'study'
  const [currentSem, setCurrentSem] = useState(() => semFromHash() || 'sem1');
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(themeFromEnv);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bmCount, setBmCount] = useState(() => getBookmarks().length);
  // Get PYQ filter: { subjects: [pyq subject names], label } or null
  const [pyqFilter, setPyqFilter] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [cheatOpen, setCheatOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);
  // PERF (2026-11-24): the notifications ticker is a never-ending
  // animation — pausing it while the tab is hidden stops the compositor
  // work (and the battery drain) when nobody is looking at it.
  const [tabHidden, setTabHidden] = useState(() => (typeof document !== 'undefined' ? document.hidden : false));
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  const [streak, setStreak] = useState(() => getStreak());
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);
  const prevViewRef = useRef('notes');

  // Warm the viewer manifest on idle so the first note opens instantly:
  // the manifest (file -> page-image dir) is fetched once per page load,
  // and a viewer open later finds it already cached instead of paying a
  // round-trip before the first page image can even be requested.
  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => prefetchViewerManifest(), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => prefetchViewerManifest(), 1500);
    return () => clearTimeout(t);
  }, []);

  // Apply theme to <html> + persist it
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('bn-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Accessibility settings (My Study → Settings): font size, reduce motion,
  // high contrast — applied as <html> attributes, re-read on every change.
  useEffect(() => {
    const apply = () => {
      const s = getSettings();
      const el = document.documentElement;
      el.setAttribute('data-font-size', s.fontSize || 'm');
      el.setAttribute('data-reduce-motion', s.reduceMotion ? 'true' : 'false');
      el.setAttribute('data-high-contrast', s.highContrast ? 'true' : 'false');
      el.setAttribute('data-dyslexia-font', s.dyslexiaFont ? 'true' : 'false');
      el.style.setProperty('--ui-line-height', String(s.lineHeight || 1.5));
      el.style.setProperty('--ui-letter-spacing', `${s.letterSpacing || 0}em`);
      setStreak(getStreak());
    };
    apply();
    window.addEventListener('bn-study-changed', apply);
    return () => window.removeEventListener('bn-study-changed', apply);
  }, []);

  // Command palette (Ctrl/⌘+K), shortcuts cheat-sheet (?), scoped search
  // (NotesHub "Search in subject only"), and shared-collection links (#col=).
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (e.key === '?' && !typing) {
        e.preventDefault();
        setCheatOpen((o) => !o);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setCheatOpen(false);
        setWhatsNewOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    const onSearchSet = (e) => {
      const q = (e && e.detail && e.detail.q) || '';
      setSearchQuery(q);
      setCurrentView('search');
    };
    window.addEventListener('bn-search-set', onSearchSet);
    const importColFromHash = () => {
      const m = (window.location.hash || '').match(/^#col=(.+)$/);
      if (!m) return;
      try {
        const data = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
        if (data && data.name && Array.isArray(data.items)) {
          window.dispatchEvent(new CustomEvent('bn-import-collection', { detail: data }));
          setCurrentView('bookmarks');
          window.history.replaceState(null, '', window.location.pathname);
        }
      } catch {
        // bad link — ignore
      }
    };
    importColFromHash();
    window.addEventListener('hashchange', importColFromHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('bn-search-set', onSearchSet);
      window.removeEventListener('hashchange', importColFromHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const randomNoteAll = () => {
    const notes = buildSearchIndex().filter((i) => i.type === 'note');
    if (notes.length === 0) return;
    const pick = notes[Math.floor(Math.random() * notes.length)];
    openNoteFromStudy(pick.file, pick.title, { semester: pick.semesterName, subject: pick.subject, source: 'random' });
  };

  // Open a note from My Study / the chatbot: navigate to the notes view
  // (right semester) then ask NotesHub to open the viewer for that file.
  const openNoteFromStudy = (file, title, context) => {
    const semName = (context && context.semester) || '';
    const semEntry = Object.entries(semestersData).find(([, s]) => s.name === semName);
    if (semEntry) setCurrentSem(semEntry[0]);
    setCurrentView('notes');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('bn-open-note', { detail: { file, title, context } }));
    }, 150);
  };

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
      // 2026-11-23 navbar fix: a page scroll closes the mobile dropdown
      // menu. The menu itself is an overlay with overscroll-behavior:
      // contain, so scrolling inside it never fires a window scroll.
      // (Calling setMenuOpen(false) when already closed is a React no-op.)
      setMenuOpen(false);
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

  // SPA pageviews for GA4: hash routes (#sem1..#sem8) + view switches are
  // not real navigations, so report them manually. The gtag config in
  // index.html sets send_page_view:false, so this effect is the ONLY source
  // of page_view events — including the first load. It fires on every
  // view/semester change (hash changes and pushState both land here via
  // state), so no separate hashchange tracking is needed. No-op until
  // VITE_GA_MEASUREMENT_ID is configured.
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.hash);
  }, [currentView, currentSem]);

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
            <img src="/logo-96.png" className="logo-mark" alt="Bhavesh Notes logo" />
            Bhavesh Notes
          </h1>
        </div>
        <SearchBar
          ref={searchInputRef}
          value={searchQuery}
          onChange={handleSearchChange}
          onEscape={() => { setSearchQuery(''); setCurrentView(prevViewRef.current); }}
          onNavigate={(v) => goToView(v)}
        />
        <div className="header-actions">
          {streak.current > 0 && (
            <button
              type="button"
              className="header-streak-chip"
              onClick={() => goToView('study')}
              title={`Best streak: ${streak.best} days — open My Study`}
              aria-label={`${streak.current}-day streak, best ${streak.best} days`}
            >
              <i className="fa-solid fa-fire"></i> {streak.current}
            </button>
          )}
          <button
            type="button"
            className="icon-btn header-icon-desktop"
            onClick={() => setWhatsNewOpen((o) => !o)}
            aria-label="What's new"
            title="What's new"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </button>
          <button
            type="button"
            className="icon-btn header-icon-desktop"
            onClick={() => setPaletteOpen(true)}
            aria-label="Jump to anything (Ctrl+K)"
            title="Jump to anything (Ctrl+K)"
          >
            <i className="fa-solid fa-terminal"></i>
          </button>
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
            className={`nav-btn ${currentView === 'study' ? 'active' : ''}`}
            onClick={() => goToView('study')}
          >
            <i className="fa-solid fa-chart-line"></i> <span className="nav-label">My Study</span>
          </button>
          <button
            className={`nav-btn ${currentView === 'topics' ? 'active' : ''}`}
            onClick={() => goToView('topics')}
          >
            <i className="fa-solid fa-arrow-down-a-z"></i> <span className="nav-label">Topics A–Z</span>
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
          {/* 2026-11-23 navbar fix: on phones these live ONLY in the dropdown
              (the header row keeps logo + theme + hamburger). Hidden on
              desktop/tablet, where the header icons + streak chip show. */}
          {streak.current > 0 && (
            <button
              className="nav-btn nav-row-mobile"
              onClick={() => goToView('study')}
            >
              <i className="fa-solid fa-fire"></i> <span className="nav-label">{streak.current}-day streak</span>
            </button>
          )}
          <button
            className="nav-btn nav-row-mobile"
            onClick={() => { setMenuOpen(false); setWhatsNewOpen((o) => !o); }}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> <span className="nav-label">What's new</span>
          </button>
          <button
            className="nav-btn nav-row-mobile"
            onClick={() => { setMenuOpen(false); setPaletteOpen(true); }}
          >
            <i className="fa-solid fa-terminal"></i> <span className="nav-label">Jump to anything</span>
          </button>
        </nav>
      </header>

      {/* Marquee Notifications Ticker — seamless loop (content duplicated) */}
      <div className="ticker-wrap glass">
        <div className="ticker-title">
          <i className="fa-solid fa-bullhorn" style={{ animation: 'bounce 1s infinite' }}></i>
          <span className="ticker-title-text">Notifications</span>
        </div>
        <div className="ticker-marquee">
          <div className={`ticker-track${tabHidden ? ' ticker-paused' : ''}`}>
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
        {currentView === 'study' && (
          <MyStudy currentSem={currentSem} onOpenNote={openNoteFromStudy} onNavigate={goToView} />
        )}
        {currentView === 'topics' && (
          <TopicsAZ onOpenNote={openNoteFromStudy} />
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

      {/* Command palette (Ctrl/⌘+K) */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={goToView}
        onOpenNote={openNoteFromStudy}
        onRandom={randomNoteAll}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />

      {/* Shortcuts cheat-sheet (?) */}
      {cheatOpen && (
        <div className="modal-backdrop" onClick={() => setCheatOpen(false)} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
          <div className="modal-panel glass" onClick={(e) => e.stopPropagation()}>
            <h3><i className="fa-solid fa-keyboard"></i> Keyboard shortcuts</h3>
            <dl className="shortcuts-list">
              <div><dt>Ctrl / ⌘ + K</dt><dd>Jump to anything</dd></div>
              <div><dt>/</dt><dd>Focus search</dd></div>
              <div><dt>?</dt><dd>This cheat-sheet</dd></div>
              <div><dt>Esc</dt><dd>Close viewer / search / dialogs</dd></div>
              <div><dt>← →</dt><dd>Previous / next page in the viewer</dd></div>
              <div><dt>F</dt><dd>Fullscreen in the viewer</dd></div>
            </dl>
            <button type="button" className="viewer-chip" onClick={() => setCheatOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* What's new */}
      {whatsNewOpen && (
        <div className="modal-backdrop" onClick={() => setWhatsNewOpen(false)} role="dialog" aria-modal="true" aria-label="What's new">
          <div className="modal-panel glass" onClick={(e) => e.stopPropagation()}>
            <h3><i className="fa-solid fa-wand-magic-sparkles"></i> What’s new</h3>
            <ul className="whatsnew-list">
              <li><strong>My Study hub</strong> — streaks, goals, revision queue, exam plan, syllabus tracker.</li>
              <li><strong>Notes as page images</strong> — faster, protected viewer with search, jump, fullscreen.</li>
              <li><strong>Reading tools</strong> — thumbnails, spread view, ruler, focus mode, highlights, page notes.</li>
              <li><strong>Collections</strong> — group notes, share them as a link, print a checklist.</li>
              <li><strong>Flashcards &amp; self-quiz</strong> — make your own, review with Again / Hard / Easy.</li>
              <li><strong>Command palette</strong> — Ctrl/⌘+K jumps to anything. <strong>?</strong> lists shortcuts.</li>
              <li><strong>Handwritten notes</strong> — typed Sem 2–3 notes re-set in real handwriting (rolling out).</li>
            </ul>
            <button type="button" className="viewer-chip" onClick={() => setWhatsNewOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Mobile bottom navigation */}
      <nav className="bottom-nav" aria-label="Quick navigation">
        <button type="button" className={currentView === 'notes' ? 'active' : ''} onClick={() => goToView('notes')} aria-label="Home">
          <i className="fa-solid fa-house"></i><span>Home</span>
        </button>
        <button type="button" className={currentView === 'search' ? 'active' : ''} onClick={() => { setCurrentView('search'); setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 0); }} aria-label="Search">
          <i className="fa-solid fa-magnifying-glass"></i><span>Search</span>
        </button>
        <button type="button" className={currentView === 'bookmarks' ? 'active' : ''} onClick={() => goToView('bookmarks')} aria-label="Bookmarks">
          <i className="fa-solid fa-bookmark"></i><span>Saved</span>
          {bmCount > 0 && <span className="bottom-nav-badge">{bmCount}</span>}
        </button>
        <button type="button" className={currentView === 'study' ? 'active' : ''} onClick={() => goToView('study')} aria-label="My Study">
          <i className="fa-solid fa-chart-line"></i><span>Study</span>
        </button>
      </nav>

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
            <button type="button" onClick={() => goToView('study')}>My Study</button>
            <button type="button" onClick={() => goToView('topics')}>Topics A–Z</button>
            <button type="button" onClick={() => goToView('add-notes')}>Add Notes</button>
          </nav>
          <nav className="footer-col" aria-label="Links">
            <h4>Links</h4>
            <a href="https://thebhavesh.online" target="_blank" rel="noopener noreferrer">Portfolio — thebhavesh.online</a>
            <button type="button" onClick={() => setWhatsNewOpen(true)}>What’s new</button>
            <button type="button" onClick={() => setCheatOpen(true)}>Keyboard shortcuts (?)</button>
          </nav>
        </div>
        <p className="footer-base">Made for students, by a student · Bhavesh Sharma · Bikaner Technical University</p>
      </footer>
    </div>
  );
}

export default App;
