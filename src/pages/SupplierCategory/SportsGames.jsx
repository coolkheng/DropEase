import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import ProductItem from '../../components/ProductItem';
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct

function SportsGames() {
  return (
    <div className="SportsGames">
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
                title="5cm(thickness) PE Foam with Official JVD Target Face (3 units Per Carton)"
                description="RM75.00  /carton"
                imageUrl="https://www.borong.com/product-images/96a48b35a3613a4f99cef005127ea2534c10494f.png"
            />
            <ProductItem
                title="Indoor Basketball Shooting Machine - (Automatic Scoring) Single Player Version

                "
                description="RM770.98       /unit"
                imageUrl="https://www.borong.com/product-images/5e00fde4eb715dfa3656664edd1250e55c4c1ebd.jpg"
            />
            <ProductItem
                title="20kg AG Adjustable Smartbell (Comes in a pair)
                "
                description="RM1200.00       /unit"
                imageUrl="https://www.borong.com/product-images/2bd529dfec39a3fcfaa0d4211a8cce863687a3bf.jpg"
            />
            <ProductItem
                title="UVEX SPORTSTYLE GREY EYEWEAR 9193280 (GREY)"
                description="RM44.00       /unit"
                imageUrl="https://www.borong.com/product-images/1681e608453f576e2705889f95166a28f53fdcfa.jpg"
            />
            <ProductItem
                title="Indoor Basketball Shooting Machine - (Automatic Scoring) Single Player Classic Version
                "
                description="RM757.44       /unit"
                imageUrl="https://www.borong.com/product-images/d368727109a04f25e775c8fb86aa77132394c427.jpg"
            />
            <ProductItem
                title="Indoor Basketball Shooting Machine - (No Scoring System) Upgraded Version
                "
                description="RM705.60      /unit"
                imageUrl="https://www.borong.com/product-images/94533f6f07a7ac2f0a673accabf7efb3d5306f32.jpg"
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

export default SportsGames;
