import React, { forwardRef } from 'react';

// Prominent header search input. Parent owns value/onChange.
// Exposes focus() via ref for the "/" keyboard shortcut.
const SearchBar = forwardRef(({ value, onChange, onEscape, placeholder }, ref) => {
  return (
    <div className="header-search" role="search">
      <i className="fa-solid fa-magnifying-glass header-search-icon" aria-hidden="true"></i>
      <input
        ref={ref}
        type="text"
        className="header-search-input"
        placeholder={placeholder || 'Search notes, PYQs, subjects…  ( / )'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.target.blur();
            if (onEscape) onEscape();
          }
        }}
        aria-label="Search all notes and papers"
        autoComplete="off"
      />
      {value && (
        <button
          className="header-search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
});

export default SearchBar;
