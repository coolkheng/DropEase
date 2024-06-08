import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png";
import "../style/SideNav.css";
import { Link, useLocation } from "react-router-dom";

const SideNavSupplier = () => {
  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [storeId, setStoreId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setStoreId(data.data.storeId);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);


  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

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
                <Link to={`/home/${storeId}`}>Store</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/edit-store">Edit Store</Link>
              </li>
              <li className="sidenav-item">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/productspage/${storeId}`}>Products</Link>
              </li>
              <div className="divider" />
              <h2 className="category">Categories</h2>
              <li className="sidenav-item">
                <Link to={`/foodbeverages/${storeId}`}>Food&Beverages</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/homekitchen/${storeId}`}>Home&Kitchen</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/officestationaries/${storeId}`}>Office&Stationaries</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/householdcleaning/${storeId}`}>Household&Cleaning</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/sportsgames/${storeId}`}>Sports&Games</Link>
              </li>
              <li className="sidenav-item">
                <Link to={`/apparelaccessories/${storeId}`}>Apparel&Accessories</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNavSupplier;
