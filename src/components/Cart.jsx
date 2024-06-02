// Cart.js

import React from "react";
import "../style/OrderedItem.css"; // Import your CSS file for styling
import nikebagImage from "../asset/nike-bag.jpeg";
import nikeshoesImage from "../asset/nike-shoe.png";
import StepProgressBar from "../components/progressbar";

const Cart = ({ orderDetails }) => {
  console.log(orderDetails);

  if (!orderDetails) {
    return <div>Loading order details...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="CartContainer">
      <div className="Cart-Header">
        <h3 className="Heading">Order Details</h3>
      </div>
      <h4 className="DeliveryStatus"> Delivery Status </h4>
      <div className="Progress-Bar">
        <StepProgressBar />
      </div>
      <div className="Progress-Bar1"></div>

      <div className="Cart-Header">
        <h3 className="Heading">Order Items:</h3>
      </div>
      {orderDetails.products.map((product, index) => (
        <div className="Cart-Items" key={index}>
          <div className="Cart-image-box">
            <img src={product.productImage} alt={product.productName} />
          </div>
          <div className="Cart-about">
            <h1 className="Cart-title">{product.productName}</h1>
            <h3 className="Cart-subtitle">Quantity: {product.quantity}</h3>
          </div>
          <div className="Cart-prices">
            <div className="Cart-amount">${product.price}</div>
          </div>
        </div>
      ))}

      <div className="Cart-checkout">
        <div className="Cart-total">
          <div>
            <div className="Cart-Subtotal">Sub-Total</div>
            <div className="Cart-items">2 items</div>
          </div>
          <div className="Cart-total-amount">$6.18</div>
        </div>
        <button className="Cart-button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
