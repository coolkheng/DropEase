// ProductItem.js

import React from 'react';
import PropTypes from 'prop-types';
import '../style/ProductItem.css'; // Import your CSS file for styling

const ProductItem = ({ title, description, imageUrl }) => {
  return (
    <div className="product-item">
      {imageUrl && <img src={imageUrl} alt={title} className="product-image" />}
      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default ProductItem;
