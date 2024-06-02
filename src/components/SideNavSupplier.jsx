import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png";
import "../style/SideNav.css";
import { Link } from "react-router-dom";

const SideNavSupplier = () => {
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

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
      {!isSmallScreen && (
        <div className="sidenav w-full md:w-[20%]">
          <div className="h-screen left-0 top-0 sticky p-5 flex flex-col gap-8 shadow-2xl max-lg:hidden">
            <div className="logo">
              {/* Insert your logo component or image here */}
              <img src={Logo} alt="Logo" />
            </div>
            <ul className="sidenav-menu">
              <li className="sidenav-item">
                <Link to="/home">Store</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/edit-store">Edit Store</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/products">Products</Link>
              </li>
              <div className="divider" />
              <h2 className="category">Categories</h2>
              <li className="sidenav-item">
                <Link to="/foodbeverages">Food&Beverages</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/homekitchen">Home&Kitchen</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/officestationaries">Office&Stationaries</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/householdcleaning">Household&Cleaning</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/sportsgames">Sports&Games</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNavSupplier;
