import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import DropdownMenu from '../../components/UsernameDropDown'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import Suppliers from './Suppliers/Suppliers';
import SupplierProducts from '../../components/SupplierProducts';
import TopBar from '../../components/TopBar';

function FoodBeverages() {
  console.log('DropdownMenu component:', DropdownMenu); // Debugging
  console.log('SideNavSupplier component:', SideNavSupplier); // Debugging
  console.log('Suppliers component:', Suppliers); // Debugging
  
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

  return (
    <>
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
        <main className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-20 mt-10`}>
          <SupplierProducts category="food&beverage"/>
        </main>
      </div>
      <footer className="w-full text-center py-4">
        <p>&copy; 2024 My App</p>
      </footer>
    </>
  );
}

export default FoodBeverages;
