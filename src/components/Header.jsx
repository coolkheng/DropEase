import React from 'react';
import "../style/Header.css"
import DropdownMenu from './UsernameDropDown';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ children }) => {
  const [menu,setMenu] = useState("Home");
  return (
    <div className="header">
      <ul className="nav_menu">
                <li onClick={()=>{setMenu("Home")}}>Home{menu==="Home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Product From Suppliers")}}><Link to="/suppliers" style={{textDecoration:'none'}}>Products From Suppliers</Link>{menu==="Product From Suppliers"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Your Store")}}><Link to="/products" style={{textDecoration: 'none'}}>Your Store</Link>{menu==="Your Store"?<hr/>:<></>}</li>
               
                
                <div className="dropdown">
        <DropdownMenu />
      </div>
                
            </ul>
          
    </div>
  );
};

export default Header;
