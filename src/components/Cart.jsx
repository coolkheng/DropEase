// Cart.js

import React from "react";
import "../style/OrderedItem.css"; // Import your CSS file for styling
import ProgressBar from "../components/progressbar";

const Cart = ({ orderDetails }) => {
  console.log(orderDetails);

  if (!orderDetails) {
    return <div>Loading order details...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="CartOrder">
      <div className="Delivery">
        <h4 className="DeliveryStatus"> Delivery Status </h4>
        <div className="Progress-Bar">
          <ProgressBar orderDetails={orderDetails} />
        </div>
      </div>

      <div className="CartContainer">
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
            <div className="Price-Description">
              <div className="Cart-Subtotal">Sub-Total</div>
              <div className="Cart-items">2 items</div>
            </div>
            <div className="Cart-total-amount">$6.18</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
