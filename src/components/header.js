import React from "react";
import Logo from "../assest/logo.png";

const Header = ({ username }) => {
  return (
    <div className="header">
      <div className="logo">
        {/* Insert your logo component or image here */}
        <img src={Logo} alt="Logo" />
      </div>
      <div className="username">{username}</div>
    </div>
  );
};

export default Header;
