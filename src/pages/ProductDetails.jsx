import React from "react";
import "../style/ProductDetails.css";
import nikeProd1 from "../asset/nikeProduct1.png";
import nikeProd2 from "../asset/nikeProduct2.jpeg";
import nikeProd3 from "../asset/nikeProduct3.png";
import nikeProd4 from "../asset/nikeProduct4.png";
import nikeProd5 from "../asset/nikeProduct5.jpeg";

const ProductDetails = () => {
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={nikeProd1} alt="" />
          <img src={nikeProd2} alt="" />
          <img src={nikeProd3} alt="" />
          <img src={nikeProd4} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={nikeProd5} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1 className="productName">Nike Pro 365</h1>
        <div className="productdisplay-right-prices">
          <h2 className="priceDetails">RM 349.00</h2>
        </div>
        <div className="productdisply-right-decs">
          <p>
            The Nike Pro 365 Shorts wrap you in stretchy fabric featuring
            Dri-FIT Technology, to keep you feeling supported and dry during
            intense workouts. This product is made from at least 50% recycled
            polyester fibres.
          </p>
        </div>
        <div className="productdisplay-right-size">
          <h3>Select size</h3>
          <div className="productdisplay-right-sizes">
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
        </div>
        <button className="addtocart-button">ADD TO CART</button>
      </div>
    </div>
  );
};
export default ProductDetails;
