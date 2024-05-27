import React from 'react';

function CollectionSearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <i className="search-icon fas fa-search"></i>
    </div>
  );
}

export default CollectionSearchBar;
