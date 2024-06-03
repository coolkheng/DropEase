import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct
import { Link } from 'react-router-dom';
import Suppliers from './Suppliers/Suppliers';
import SupplierProducts from '../../components/SupplierProducts';
import Productss from '../../components/Productss';

function FoodBeverages() {

  console.log('DropdownMenu component:', DropdownMenu); // Add this line for debugging
  console.log('SideNavSupplier component:', SideNavSupplier); // Add this line for debugging
  console.log('Suppliers component:', Suppliers); // Add this line for debugging


  return (
    <div className="FoodBeverages">
         <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNavSupplier /> {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <SupplierProducts category="food&beverage"/>
      </div>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default FoodBeverages;