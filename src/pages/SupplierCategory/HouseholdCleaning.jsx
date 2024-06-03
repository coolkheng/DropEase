import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import SupplierProductItem from '../../components/SupplierProductItem';
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct

function HouseholdCleaning() {
  return (
    <div className="HouseholdCleaning">
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
            <SupplierProductItem
                title="Dettol Liquid Hand Wash 250g"
                description="RM10.70  /unit"
                imageUrl="https://www.borong.com/product-images/766d90b2efdc95d1b108d4c1fb89370436cfd113.jpg"
            />
            <SupplierProductItem
                title="Kuat Harimau WHITE TEC Detergent 750 gm*
                "
                description="RM7.20       /unit"
                imageUrl="https://www.borong.com/product-images/a18a7422e8060912722ce34b0a0ce44068c0fe92.jpg"
            />
            <SupplierProductItem
                title="Labour Apple Dishwashing Liquid 900ml
                "
                description="RM4.80       /unit"
                imageUrl="https://www.borong.com/product-images/d880d11aac82e755f855d1c095a2ed7569ae14ca.jpg"
            />
            <SupplierProductItem
                title="Softlan SPRING FRESH 3 litre Softener"
                description="RM19.10       /unit"
                imageUrl="https://www.borong.com/product-images/7d4182e446059ecb94222808a1f5985a930dc74f.jpg"
            />
            <SupplierProductItem
                title="Sunlight Extra GENTLE GRAPEFRUIT & ROSE HIP Dishwashing 1000ml
                "
                description="RM8.20      /unit"
                imageUrl="https://www.borong.com/product-images/b0b4393595b14c6a59607d61096c9b3cb9547102.jpeg"
            />
            <SupplierProductItem
                title="Top SUPER WHITE Anti Malodour Powder Detergent 2.3kg
                "
                description="RM20.40      /unit"
                imageUrl="https://www.borong.com/product-images/ec9179c6710980b03a4610866817fa2e988eadf7.jpg"
            />
            <SupplierProductItem
                title="Vinda Deluxe Box Pack Facial Tissue 100s x 4
                "
                description="RM16.20       /unit"
                imageUrl="https://www.borong.com/product-images/65b671fee13cc69a3d4210cd627bbaef6f2c5e3e.jpg"
            />
            <SupplierProductItem
                title="[BEST SELLER] (MR.DIY) Anti-Rust Lubricant Spray (333ml)
                "
                description="RM145.65       /carton"
                imageUrl="https://www.borong.com/product-images/ae64dae1a672e1e95451cc011e58cd2765b0d854.jpg"
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

export default HouseholdCleaning;
