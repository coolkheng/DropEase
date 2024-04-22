import React from "react";

const SideNav = () => {
  return (
    <div className="sidenav">
      <ul className="sidenav-menu">
        <li className="sidenav-item">
          <a href="#home">Home</a>
        </li>
        <li className="sidenav-item">
          <a href="#orders">Orders</a>
        </li>
        <li className="sidenav-item">
          <a href="#products">Products</a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
