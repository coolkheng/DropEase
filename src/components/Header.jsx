import React from 'react';
import "../style/Header.css"
import DropdownMenu from './UsernameDropDown';

const Header = ({ children }) => {
  return (
    <div className="header">
      <DropdownMenu></DropdownMenu>
    </div>
  );
};

export default Header;
