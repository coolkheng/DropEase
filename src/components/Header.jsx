import React from "react";
import "../style/Header.css";
import { FaRegCircleUser } from "react-icons/fa6";
import DropdownMenu from "./UsernameDropDown";
import { useState, useEffect } from "react";


const Header = ({ children }) => {
  const [menu, setMenu] = useState("Home");
  return (
    <div className="header">
      <div className="text-5xl cursor-pointer relative flex justify-start">
        <FaRegCircleUser />
      </div>
      <p className="capitalize text-lg font-semibold ml-2">Username</p>
      <DropdownMenu className="dropdown"></DropdownMenu>
    </div>
  );
};

export default Header;
