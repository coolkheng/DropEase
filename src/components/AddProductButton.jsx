import React from 'react';
import '../style/AddProductButton.css'; // Import CSS file for button styling

const AddProductButton = ({ image, description, onClick }) => {
  return (
    <button className="add-product-button" onClick={onClick}>
      {image && <img src={image} className="add-product-button-image" />}
      <p className="product-description">{description}</p>
    </button>
  );
}

export default AddProductButton;