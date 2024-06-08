import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import SideNavSupplier from "../../components/SideNavSupplier";
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct
import { Link } from 'react-router-dom';
import Suppliers from './Suppliers/Suppliers';
import SupplierProducts from "../../components/SupplierProducts";

function HomeKitchen() {

  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log('DropdownMenu component:', DropdownMenu); // Add this line for debugging
  console.log('SideNavSupplier component:', SideNavSupplier); // Add this line for debugging
  console.log('Suppliers component:', Suppliers); // Add this line for debugging


  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
    {!isSmallScreen && (
      <aside className="w-full md:w-[20%]">
        <SideNavSupplier />
      </aside>
    )}

    {isSmallScreen && (
      <div className="fixed-top-bar">
        <TopBar />
      </div>
    )}

    <main
      className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
    >
    <div className="FoodBeverages">
         <Header>
        <DropdownMenu 
        /> 
      </Header>
       {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <SupplierProducts category="homekitchen"/>
      </div>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
    </main>
    </div>
  );
}

export default HomeKitchen;