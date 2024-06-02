import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png";
import { Link, useLocation } from "react-router-dom";

const TopBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [storeId, setStoreId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    <div className="topbar flex justify-between items-center mt-5 h-12 shadow-xl lg:hidden">
      <div className="logo">
        <img src={Logo} alt="Logo" className="w-full" />
      </div>
      <div className="menu-container flex-1 flex justify-center">
        <ul className="topbar-menu flex gap-8">
          <li className="topbar-item">
            <Link
              to={`/home/${storeId}`}
              className={activeLink === `/home/${storeId}` ? "active" : ""}
              onClick={() => handleLinkClick(`/home/${storeId}`)}
            >
              Store
            </Link>
          </li>
          <li className="topbar-item">
            <Link
              to="/edit-store"
              className={activeLink === "/edit-store" ? "active" : ""}
              onClick={() => handleLinkClick("/edit-store")}
            >
              Edit Store
            </Link>
          </li>
          <li className="topbar-item">
            <Link
              to="/orders"
              className={activeLink === "/orders" ? "active" : ""}
              onClick={() => handleLinkClick("/orders")}
            >
              Orders
            </Link>
          </li>
          <li className="topbar-item">
            <Link
              to="/products"
              className={activeLink === "/products" ? "active" : ""}
              onClick={() => handleLinkClick("/products")}
            >
              Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="placeholder" />
    </div>
  );
};

export default TopBar;
