import React from "react";
import "../style/Header.css";
import DropdownMenu from "./UsernameDropDown";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  const [menu, setMenu] = useState("Home");
  return (
    <div className="header">
      <ul className="nav_menu">
        <div className="dropdown">
          <DropdownMenu />
        </div>
      </ul>
    </div>
  );
};

export default Header;
