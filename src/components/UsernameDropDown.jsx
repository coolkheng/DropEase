import React, { useState } from "react";
import "../style/UsernameDropdown.css";
import { Link, useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (event) => {
    event.stopPropagation();
    toggleMenu(); // Close the menu when an option is clicked
  };

  const handleClick = () => {
    toggleMenu(); // Toggle the menu when the username is clicked
  };

  return (
    <div className="dropdown-menu" onClick={handleClick}>
      <div className="username">
        <span>User</span>
        <i className={`arrow-icon ${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-content">
          <Link to="/profile">
            <li onClick={handleOptionClick}>Edit Profile</li>
          </Link>
          <Link to="/login">
            <li onClick={handleOptionClick}>Log Out</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
