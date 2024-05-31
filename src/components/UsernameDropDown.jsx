import React, { useState } from "react";
import "../style/UsernameDropdown.css";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="dropdown-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="username" style={{color: "white"}}>
        <span>User</span>
        <i className={`arrow-icon ${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <ul className="dropdown-content">
          <Link to="/profile" onClick={handleOptionClick}>
            <li>Edit Profile</li>
          </Link>
          <Link to="/login" onClick={handleOptionClick}>
            <li>Log Out</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
