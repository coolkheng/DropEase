import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchResults = ({ results, customer }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      {results.map((result) => (
        <Link
          key={result.storeId}
          to={`/${customer}/store/${result.storeId}`}
          className="shop-link"
        >
          <div className="shopCatbox">
            <div className="shopCat-con">
              <div className="img-con">
                <img
                  className="shopCat-img"
                  src={result.imageUrl}
                  alt={result.store}
                />
                <p className="shopCat-name">{result.store}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
