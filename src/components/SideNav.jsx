import React from "react";
import Logo from "../asset/logo.png";
import { Link } from 'react-router-dom';


const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="sidenav-menu">
        <li className="sidenav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="sidenav-item">
          <Link to="/orders">Orders</Link>
        </li>
        <li className="sidenav-item">
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
