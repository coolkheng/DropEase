// Cart.js

import React from "react";
import "../style/OrderedItem.css"; // Import your CSS file for styling
import nikebagImage from "../asset/nike-bag.jpeg";
import nikeshoesImage from "../asset/nike-shoe.png";
import StepProgressBar from "../components/progressbar";

const Cart = () => {
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
      <div className="Cart-Items">
        <div className="Cart-image-box">
          <img
            src={nikebagImage}
            style={{ height: "120px" }}
            alt="Apple Juice"
          />
        </div>
        <div className="Cart-about">
          <h1 className="Cart-title">Nike bag</h1>
          <h3 className="Cart-subtitle">Quantity :2</h3>
        </div>
        <div className="Cart-prices">
          <div className="Cart-amount">$2.99</div>
        </div>
      </div>

      <div className="Cart-Items">
        <div className="Cart-image-box">
          <img
            src={nikeshoesImage}
            style={{ height: "120px" }}
            alt="Grapes Juice"
          />
        </div>
        <div className="Cart-about">
          <h1 className="Cart-title">Nike Shoes</h1>
          <h3 className="Cart-subtitle">Quantity:1</h3>
        </div>
        <div className="Cart-prices">
          <div className="Cart-amount">$3.19</div>
        </div>
      </div>

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
