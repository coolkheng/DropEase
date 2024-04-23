import React from 'react';
import '../Style/ShopCategory.css';
import adlv from '../Assets/adlv.png';
import nike from '../Assets/Nike-Logo.jpg';
import chanel from '../Assets/channel logo.jpeg';
import adidas from '../Assets/Adidas-Logo.png';
import padini from '../Assets/Padini-logo.png'
import brandsOutlet from '../Assets/logo-brandsoutlet.jpg'
import skechers from '../Assets/skechers logo.png'
import panasonic from '../Assets/panasonic logo.png'
import canon from '../Assets/Canon-Company-Logo.jpg'
import lg from '../Assets/LG-Logo-2014-present.png'

const ShopCategory = ({ category }) => {
  // Define shop items based on the category
  let placeholderShopItems = [];
  let categoryNames ='';

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
    categoryNames='Apparel & Accessories';
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
    categoryNames='Sports & Entertainment';
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
    categoryNames='Electronics';
  }

  return (
    <div className='ShopCategory'>
      <h2 className="categoryNames">{categoryNames}</h2>
      {/* Map over the array and render each shop item */}
      {placeholderShopItems.map((shop) => (
        <div key={shop.id} className='shopCatbox'>
          <div className='shopCat-con'>
            <div className='img-con'>
              <img className='shopCat-img' src={shop.cover} alt='' />
              <p className='shopCat-name'>{shop.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCategory;
