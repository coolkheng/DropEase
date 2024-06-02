import React from 'react';
import PropTypes from 'prop-types';
import "../style/SearchResults.css"; // Make sure to create a CSS file for styling

const SearchResults = ({ results }) => {
  return (
    <div className="search-results-container">
      <h2>Search Results:</h2>
      <ul className="search-results-list">
        {results.map((result) => (
          <li key={result._id} className="search-result-item">
            <p>{result.store} - {result.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
