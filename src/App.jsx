import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import GlowBg from './components/GlowBg';
import FloatingBot from './components/FloatingBot';
import AdsBanner from './components/AdsBanner';
import TabSelector from './components/TabSelector';
import SearchBar from './components/SearchBar';
import BackToTop from './components/BackToTop';
import NotesHub from './pages/NotesHub';
import PyqFinder from './pages/PyqFinder';
import SearchResults from './pages/SearchResults';
import AddNotesForm from './pages/AddNotesForm';

function App() {
  const [currentView, setCurrentView] = useState('notes'); // 'notes', 'pyq', 'search', 'add-notes'
  const [currentSem, setCurrentSem] = useState('sem1');
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const prevViewRef = useRef('notes');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollWidth(`${scrolled}%`);
      } else {
        setScrollWidth('0%');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setCurrentView(view);
  };

  return (
    <div className="app-container">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: scrollWidth }}></div>

      {/* Dynamic Glow Background */}
      <GlowBg />

      {/* Main Header / Navigation */}
      <header className="main-header glass">
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
        <nav className="nav-links">
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
            className={`nav-btn ${currentView === 'add-notes' ? 'active' : ''}`}
            onClick={() => goToView('add-notes')}
          >
            <i className="fa-solid fa-circle-plus"></i> <span className="nav-label">Add Notes</span>
          </button>
        </nav>
      </header>

      {/* Marquee Notifications Ticker */}
      <div className="ticker-wrap glass">
        <div className="ticker-title">
          <i className="fa-solid fa-bullhorn" style={{ animation: 'bounce 1s infinite' }}></i>
          <span className="ticker-title-text">Notifications</span>
        </div>
        <div className="ticker-marquee">
          <div className="ticker-text">
            🚀 Added New B.Tech Semester 2 Notes! Check them now. • 💻 Document Analyzer AI integration available on the floating widget. • 🎬 Finished studying? Stream movies for free on EnterNet below!
          </div>
        </div>
      </div>

      {/* Semester Tabs - Notes view only */}
      {currentView === 'notes' && (
        <TabSelector activeTab={currentSem} onChangeTab={setCurrentSem} />
      )}

      {/* Page Content View Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentView === 'notes' && (
          <NotesHub currentSem={currentSem} onNavigate={goToView} />
        )}
        {currentView === 'pyq' && (
          <PyqFinder />
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

      {/* Bottom Ads Banner */}
      <AdsBanner />
    </div>
  );
}

export default App;
