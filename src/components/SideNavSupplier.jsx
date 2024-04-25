import React from "react";
import Logo from "../asset/logo.png";
import "../style/SideNav.css";
import { Link } from "react-router-dom";



const SideNavSupplier = () => {
  return (
    <div className="sidenav">
      <div className="logo">
        {/* Insert your logo component or image here */}
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
  );
};

export default SideNavSupplier;
