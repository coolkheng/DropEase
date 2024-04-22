// Cart.js

import React from "react";
import "../style/OrderedItem.css"; // Import your CSS file for styling
import appleImage from "../assest/nike-bag.jpeg";
import grapesImage from "../assest/nike-shoe.png";

const Cart = () => {
  return (
    <div className="CartContainer">
      <div className="Header">
        <h3 className="Heading">Order Details</h3>
      </div>

      <div className="Cart-Items">
        <div className="image-box">
          <img src={appleImage} style={{ height: "120px" }} alt="Apple Juice" />
        </div>
        <div className="about">
          <h1 className="title">Nike bag</h1>
          <h3 className="subtitle">Quantity :2</h3>
        </div>
        <div className="prices">
          <div className="amount">$2.99</div>
        </div>
      </div>

      <div className="Cart-Items">
        <div className="image-box">
          <img
            src={grapesImage}
            style={{ height: "120px" }}
            alt="Grapes Juice"
          />
        </div>
        <div className="about">
          <h1 className="title">Nike Shoes</h1>
          <h3 className="subtitle">Quantity:1</h3>
        </div>
        <div className="prices">
          <div className="amount">$3.19</div>
        </div>
      </div>

      <hr />

      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal">Sub-Total</div>
            <div className="items">2 items</div>
          </div>
          <div className="total-amount">$6.18</div>
        </div>
        <button className="button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
