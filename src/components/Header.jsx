import React, { useEffect } from "react";
import "../style/Header.css";
import { FaRegCircleUser } from "react-icons/fa6";
import DropdownMenu from "./UsernameDropDown";
import { useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState("Home");
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserRole(data.data.role);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="header">
      <div className="text-5xl cursor-pointer relative flex justify-start">
        <FaRegCircleUser />
        <p className="capitalize text-lg font-semibold ml-3 mt-3">Username</p>
      </div>

      {userRole === "retailer" && <DropdownMenu className="dropdown" />}
    </div>
  );
};

export default Header;
