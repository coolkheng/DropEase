import React from 'react';
import PropTypes from 'prop-types';
import '../style/SupplierProductItem.css'; // Import your CSS file for styling

const ProductItem = ({ title, description, imageUrl }) => {
  return (
    <div className="supplier-product-item">
      {imageUrl && <img src={imageUrl} alt={title} className="supplier-product-image" />}
      <div className="supplier-productitem-content">
        <h2 className="supplier-product-title">{title}</h2>
        <p className="supplier-product-description">{description}</p>
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
