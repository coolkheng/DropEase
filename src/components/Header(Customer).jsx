import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../asset/DropEase logo.png";
import search_icon from "../asset/search icon.png";
import user_icon from "../asset/user icon.png";
import cart_icon from "../asset/cart icon.png";
import "../style/Header(Customer).css";
import { CartContext } from "../pages/cartContext"; // Corrected import
import SearchResults from "./SearchResults"; // Import the new component

export const HeaderCustomer = ({ customer }) => {
  console.log(customer);
  const location = useLocation();
  const { cartItems } = useContext(CartContext); // Corrected context usage
  const [menu, setMenu] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    console.log("Location changed:", location.pathname);

    let newMenu = "home";
    if (location.pathname.includes(`/apparel`)) {
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

  // Calculate total quantity from cart items
  const totalQuantity = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 0; // Ensure quantity is defined
    return total + quantity;
  }, 0);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/searchstore?q=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="header-login">
          <NavLink to="/login">
            <img src={user_icon} alt="User Icon" />
          </NavLink>
          <NavLink to="/login">
            <p className="login-button">Sign Out</p>
          </NavLink>
          <NavLink
            to={`/${customer.customerId}/store/${customer.storeId}/customercart`}
          >
            <img
              onClick={() => setMenu("cart")}
              className={menu === "cart" ? "active" : ""}
              src={cart_icon}
              alt="Cart Icon"
              style={{ width: "25px", height: "auto" }}
            />
          </NavLink>
          <div className="header-cart-count">{totalQuantity}</div>
          <p
            onClick={() => setMenu("cart")}
            className={menu === "cart" ? "active" : ""}
          >
            <NavLink
              className="nav-link"
              to={`/${customer.customerId}/store/${customer.storeId}/customercart`}
              style={{ color: "black" }}
            >
              Shopping Cart
            </NavLink>
          </p>
        </div>
      </div>
      <div className="navbar">
        <ul className="nav-menu">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            <NavLink
              className="nav-link"
              to={`/customerhome/${customer.customerId}`}
            >
              Home
            </NavLink>
            {menu === "home" && <hr />}
          </li>
          <li
            onClick={() => setMenu("apparels")}
            className={menu === "apparels" ? "active" : ""}
          >
            <NavLink
              className="nav-link"
              to={`/apparel/${customer.customerId}`}
            >
              Apparel & Accessories
            </NavLink>
            {menu === "apparels" && <hr />}
          </li>
          <li
            onClick={() => setMenu("sports")}
            className={menu === "sports" ? "active" : ""}
          >
            <NavLink className="nav-link" to={`/sports/${customer.customerId}`}>
              Sports & Entertainment
            </NavLink>
            {menu === "sports" && <hr />}
          </li>
          <li
            onClick={() => setMenu("electronics")}
            className={menu === "electronics" ? "active" : ""}
          >
            <NavLink
              className="nav-link"
              to={`/electronics/${customer.customerId}`}
            >
              Electronics
            </NavLink>
            {menu === "electronics" && <hr />}
          </li>
        </ul>
      </div>
      {searchResults.length > 0 && <SearchResults results={searchResults} />}
    </div>
  );
};

export default HeaderCustomer;
