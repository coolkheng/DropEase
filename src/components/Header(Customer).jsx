import React, { useState } from "react";
import "../style/Header(Customer).css";
import logo from "../asset/DropEase logo.png";
import search_icon from "../asset/search icon.png";
import user_icon from "../asset/user icon.png";
import cart_icon from "../asset/cart icon.png";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [menu, setMenu] = useState("home");

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle changes in the search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="header-container">
      <div className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
          <p>DropEase</p>
        </div>
        <div className="search-container">
          <img src={search_icon} alt="" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button>Search</button>
        </div>
        <div className="header-login">
          <img src={user_icon} alt="" />
          <p className="login-button">Sign In/ Sign Up</p>
          <p> | </p>
          <NavLink to="/customercart">
            <img
              onClick={() => {
                setMenu("cart");
              }}
              className={menu === "cart" ? "active" : ""}
              src={cart_icon}
              alt=""
              style={{ width: "25px", height: "auto" }}
            />
          </NavLink>

          <div className="header-cart-count">0</div>
          <button
            onClick={() => {
              setMenu("cart");
            }}
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
            onClick={() => {
              setMenu("home");
            }}
            className={menu === "home" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/customerhome">
              Home
            </NavLink>
            {menu === "home" && <hr />}
          </li>
          <li
            onClick={() => {
              setMenu("apparels");
            }}
            className={menu === "apparels" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/apparel">
              Apparel & Accessories
            </NavLink>
            {menu === "apparels" && <hr />}
          </li>
          <li
            onClick={() => {
              setMenu("sports");
            }}
            className={menu === "sports" ? "active" : ""}
          >
            <NavLink className="nav-link" to="/sports">
              Sports & Entertainment
            </NavLink>
            {menu === "sports" && <hr />}
          </li>
          <li
            onClick={() => {
              setMenu("electronics");
            }}
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
