import React from 'react';
import PropTypes from 'prop-types';
import '../style/ProductItem.css'; // Import your CSS file for styling

const ProductItem = ({ product }) => {
  if (!product) return null;

  const { name, price, mainImages } = product;

  return (
    <div className="product-item">
      {mainImages && <img src={mainImages} alt={name} className="product-image" />}
      <div className="productitem-content">
        <h2 className="product-title">{name}</h2>
        <b className="product-price">Selling : RM {price}</b>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mainImages: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
