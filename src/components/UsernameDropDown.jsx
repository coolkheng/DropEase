import React, { useState } from 'react';
import "../style/UsernameDropdown.css"

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
          <i className={`arrow-icon ${isOpen ? 'up' : 'down'}`}></i>
        </div>
        {isOpen && (
          <ul className="dropdown-content">
            <li onClick={handleOptionClick}>Edit Profile</li>
            <li onClick={handleOptionClick}>Log Out</li>
          </ul>
        )}
      </div>
    );
  };
  
export default DropdownMenu;
