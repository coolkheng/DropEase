import React from 'react';
import '../style/SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
      />
      <i className="search-icon fas fa-search"></i>
    </div>
  );
}

export default SearchBar;
