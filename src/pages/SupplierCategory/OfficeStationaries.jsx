import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import ProductItem from '../../components/ProductItem';
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct

function OfficeStationaries() {
  return (
    <div className="OfficeStationaries">
         <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNavSupplier /> {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <div className="productpage-title">
          <h1></h1>
        </div>
        <div className="product-content">
        <div className="product-list">
            <ProductItem
                title="IK Yellow A4 Paper 70Gsm (500 sheets reams)"
                description="RM13.00  /unit"
                imageUrl="https://www.borong.com/product-images/23d16be6e85287f3d94f0a12b6b85a043a0faf91.jpg"
            />
            <ProductItem
                title="OMEGA - Metal Ball Pen

                "
                description="RM1250.00       /carton"
                imageUrl="https://www.borong.com/product-images/70658072bf9509fdb40ba4eff776e402dfe788b2.jpg"
            />
            <ProductItem
                title="BLING - Metal Ball Pen
                "
                description="RM75.00       /carton"
                imageUrl="https://www.borong.com/product-images/a15d56bed5e3ce21b9850535b44fe0e7293a4be2.jpg"
            />
            <ProductItem
                title="Eveready Heavy Duty Battery AA 4 pcs"
                description="RM6.00       /unit"
                imageUrl="https://www.borong.com/product-images/81651d8c70617692db28f8f714b9e7ecd4d68233.jpg"
            />
            <ProductItem
                title="BUNCHO Water Color - 12 Colors
                "
                description="RM17.40       /unit"
                imageUrl="https://www.borong.com/product-images/0fc4b7e2035277612d6bb2c0fe5e86b177e89209.jpg"
            />
            <ProductItem
                title="Motorola XiR C2620 Walkie Talkie
                "
                description="RM1355.00      /unit"
                imageUrl="https://www.borong.com/product-images/ccef00e6aed5e6bb79f100e4f3856f952ba7e8d5.jpg"
            />
            <ProductItem
                title="2-HOLE PUNCH DOL-8550 (SMALL)
                "
                description="RM7.90       /unit"
                imageUrl="https://www.borong.com/product-images/f337374ab0cbba66ed3a47f0ce39d11a0beec9a3.PNG"
            />
            <ProductItem
                title="Creative Leisure Office Sofa
                "
                description="RM4022.40       /carton"
                imageUrl="https://www.borong.com/product-images/4bcbff407331bfd01c630d2974fa21fae20598b5.jpg"
            />
            
            </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default OfficeStationaries;
