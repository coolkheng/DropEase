import React from "react";
import "../style/ShopCategory(Customer).css";
import adlv from "../asset/adlv.png";
import nike from "../asset/Nike-Logo.jpg";
import chanel from "../asset/channel logo.jpeg";
import adidas from "../asset/Adidas-Logo.png";
import padini from "../asset/Padini-logo.png";
import brandsOutlet from "../asset/logo-brandsoutlet.jpg";
import skechers from "../asset/skechers logo.png";
import panasonic from "../asset/panasonic logo.png";
import canon from "../asset/Canon-Company-Logo.jpg";
import lg from "../asset/LG-Logo-2014-present.png";

const ShopCategory = ({ category }) => {
  // Define shop items based on the category
  let placeholderShopItems = [];
  let categoryNames = "";

  // Determine the category image based on the category
  if (category === "apparel") {
    placeholderShopItems = [
      {
        id: 1,
        name: "Acmé de la vie",
        cover: adlv,
      },

      {
        id: 2,
        name: "Padini",
        cover: padini,
      },
      {
        id: 3,
        name: "Brands Outlet",
        cover: brandsOutlet,
      },
      {
        id: 4,
        name: "Chanel",
        cover: chanel,
      },
    ];
    categoryNames = "Apparel & Accessories";
  } else if (category === "sports") {
    placeholderShopItems = [
      {
        id: 1,
        name: "NIKE",
        cover: nike,
      },
      {
        id: 2,
        name: "ADIDAS",
        cover: adidas,
      },
      {
        id: 3,
        name: "SKECHERS",
        cover: skechers,
      },
    ];
    categoryNames = "Sports & Entertainment";
  } else if (category === "electronics") {
    placeholderShopItems = [
      {
        id: 1,
        name: "LG",
        cover: lg,
      },
      {
        id: 2,
        name: "Canon",
        cover: canon,
      },
      {
        id: 3,
        name: "Panasonic",
        cover: panasonic,
      },
    ];
    categoryNames = "Electronics";
  }

  return (
    <div className="ShopCategory">
      <h2 className="categoryNames">{categoryNames}</h2>
      {/* Map over the array and render each shop item */}
      {placeholderShopItems.map((shop) => (
        <div key={shop.id} className="shopCatbox">
          <div className="shopCat-con">
            <div className="img-con">
              <img className="shopCat-img" src={shop.cover} alt="" />
              <p className="shopCat-name">{shop.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCategory;
