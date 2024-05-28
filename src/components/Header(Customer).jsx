import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../asset/DropEase logo.png";
import search_icon from "../asset/search icon.png";
import user_icon from "../asset/user icon.png";
import cart_icon from "../asset/cart icon.png";
import "../style/Header(Customer).css";

export const Header = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("");

  useEffect(() => {
    console.log("Location changed:", location.pathname);

    let newMenu = "home";
    if (location.pathname.includes("/apparel")) {
      newMenu = "apparels";
    } else if (location.pathname.includes("/sports")) {
      newMenu = "sports";
    } else if (location.pathname.includes("/electronics")) {
      newMenu = "electronics";
    } else if (location.pathname.includes("/customercart")) {
      newMenu = "cart";
    }

    // Only update the state if the menu is different
    if (menu !== newMenu) {
      setMenu(newMenu);
      console.log("Menu state updated:", newMenu);
    }
  }, [location.pathname, menu]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-logo">
          <img src={logo} alt="DropEase Logo" />
          <p>DropEase</p>
        </div>
        <div className="search-container">
          <img src={search_icon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button>Search</button>
        </div>
        <div className="header-login">
          <NavLink to="/login">
            <img src={user_icon} alt="User Icon" />
          </NavLink>
          <NavLink to="/login">
            <p className="login-button">Sign In/ Sign Up</p>
          </NavLink>
          <NavLink to="/customercart">
            <img
              onClick={() => setMenu("cart")}
              className={menu === "cart" ? "active" : ""}
              src={cart_icon}
              alt="Cart Icon"
              style={{ width: "25px", height: "auto" }}
            />
          </NavLink>
          <div className="header-cart-count">0</div>
          <button
            onClick={() => setMenu("cart")}
            className={menu === "cart" ? "active" : ""}
          >
            <NavLink
              className="nav-link"
              to="/customercart"
              style={{ color: "black" }}
            >
              Shopping Cart
            </NavLink>
          </button>
        </div>
      </div>
      <div className="navbar">
        <ul className="nav-menu">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/customerhome">
              Home
            </NavLink>
            {menu === "home" && <hr />}
          </li>
          <li
            onClick={() => setMenu("apparels")}
            className={menu === "apparels" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/apparel">
              Apparel & Accessories
            </NavLink>
            {menu === "apparels" && <hr />}
          </li>
          <li
            onClick={() => setMenu("sports")}
            className={menu === "sports" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/sports">
              Sports & Entertainment
            </NavLink>
            {menu === "sports" && <hr />}
          </li>
          <li
            onClick={() => setMenu("electronics")}
            className={menu === "electronics" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/electronics">
              Electronics
            </NavLink>
            {menu === "electronics" && <hr />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
