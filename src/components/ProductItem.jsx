import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../style/ProductItem.css'; // Import your CSS file for styling

const ProductItem = ({ img, name, desc, rating, price, product, quantity }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };


  return (
    <div className="product-item">
      {img && <img src={img} alt={name} className="product-image" />}
      <div className="productitem-content">
        <h2 className="product-title">{name}</h2>
        <b className="product-price">Selling : RM {price}</b>
        <b className="product-price">Quantity : {quantity}</b>
      </div>
    </div>
  );
};

export default ProductItem;
