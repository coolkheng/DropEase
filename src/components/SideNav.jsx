import React from "react";
import Logo from "../asset/logo.png";


const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="sidenav-menu">
        <li className="sidenav-item">
          <a href="home">Home</a>
        </li>
        <li className="sidenav-item">
          <a href="orders">Orders</a>
        </li>
        <li className="sidenav-item">
          <a href="products">Products</a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
