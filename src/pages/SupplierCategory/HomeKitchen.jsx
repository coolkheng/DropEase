import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import ProductItem from '../../components/ProductItem';
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct

function HomeKitchen() {
  return (
    <div className="HomeKitchen">
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
                title="Stainless Steel Whistling Tea Kettle Tea set Tea Pot Stovetop Anti-hot Handle and Loud Whistle 3L with 4pcs stainless steel Mugs"
                description="RM59.00  /unit"
                imageUrl="https://www.borong.com/product-images/65bc3f474b36ca9d2f379d4cc118b80799adc51e.jpg"
            />
            <ProductItem
                title="(MR.DIY) Microfiber Multi-Colour Square Towels (5pcs)

                "
                description="RM67.72       /carton"
                imageUrl="https://www.borong.com/product-images/939a3f9ca2957db40b416e146f7271966764195b.jpg"
            />
            <ProductItem
                title="HIGHPOWER Aluminium Foil Tape HP1466 (48mm x 30m)
                "
                description="RM540.00       /carton"
                imageUrl="https://www.borong.com/product-images/29034fc2d9298acb5d3663c3c101099a64e03ec9.jpg"
            />
            <ProductItem
                title="[IdEA] 2 Tier 16cm Stainless Steel Tiffin Food Carrier"
                description="RM29.90       /unit"
                imageUrl="https://www.borong.com/product-images/0d8abadc83a6a211f71033c1883118dd32fcf752.jpg"
            />
            <ProductItem
                title="(MR.DIY) Aluminium Foil (45cm x 7.62m)
                "
                description="RM204.00       /carton"
                imageUrl="https://www.borong.com/product-images/9e6fce4c574d0b4f12071152d8a137c76c15bd92.jpg"
            />
            <ProductItem
                title="Cili Kitchen Roll 6's
                "
                description="RM12.69      /unit"
                imageUrl="https://www.borong.com/product-images/7e3c69f29b16878eaa6846b51665782b1b5d140a.jpg"
            />
            <ProductItem
                title="Plastic Gloves HDPE Disposable (Universal Size) - 100 pcs per packet
                "
                description="RM4.50       /unit"
                imageUrl="https://www.borong.com/product-images/2b26745ff0971d46e2799823ba22c2d0d3956933.jpg"
            />
            <ProductItem
                title="BON-EATO - Eco Cutlery Set
                "
                description="RM900.00       /carton"
                imageUrl="https://www.borong.com/product-images/ecf26815d6d263e2e8dd35403ddb5f59f4377521.jpg"
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

export default HomeKitchen;
