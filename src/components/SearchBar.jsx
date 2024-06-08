import React from 'react';
import PropTypes from 'prop-types';
import '../style/SearchBar.css'; // Import your CSS file for styling

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search products..."
      className="searchbar"
    />
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
