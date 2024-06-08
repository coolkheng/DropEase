import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png";
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
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
    <div className="sidenav">
      <div className="h-screen left-0 top-0 sticky p-5 flex flex-col gap-8 shadow-2xl max-lg:hidden">
        <div className="logo mb-2">
          <img src={Logo} alt="Logo" className="w-full" style={{ maxWidth: "150px" }}/>
        </div>
        <ul className="sidenav-menu flex flex-col gap-4">
          <li className="sidenav-item">
            <Link 
              to={`/home/${storeId}`}
              className={activeLink === `/home/${storeId}` ? 'active' : ''} 
              onClick={() => handleLinkClick(`/home/${storeId}`)}
            >
              Store
            </Link>
          </li>
          <li className="sidenav-item">
            <Link 
              to="/edit-store" 
              className={activeLink === '/edit-store' ? 'active' : ''} 
              onClick={() => handleLinkClick('/edit-store')}
            >
              Edit Store
            </Link>
          </li>
          <li className="sidenav-item">
            <Link 
              to="/orders" 
              className={activeLink === '/orders' ? 'active' : ''} 
              onClick={() => handleLinkClick('/orders')}
            >
              Orders
            </Link>
          </li>
          <li className="sidenav-item">
            <Link 
              to={`/productspage/${storeId}`}
              className={activeLink === `/productspage/${storeId}` ? 'active' : ''} 
              onClick={() => handleLinkClick(`/productspage/${storeId}`)}
            >
              Products
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
