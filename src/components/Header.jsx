import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/Header.css";
import { FaRegCircleUser } from "react-icons/fa6";
import DropdownMenu from "./UsernameDropDown";

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [store, setStore] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { storeId } = useParams();

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

    const fetchStoreData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/store/${storeId}`);
        const data = await response.json();
        if (data.success) {
          setStore(data.store);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch store data");
      }
    };

    fetchUserData();
    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  return (
    <div className="header">
      <div className="header-content">
        {store && store.imageUrl ? (
          <img className="shop-img" src={store.imageUrl} alt={store.store} />
        ) : (
          <FaRegCircleUser className="default-icon" />
        )}
        {store && (
          <p className="store-name">{store.store}</p>
        )}
      </div>

      {userRole === "retailer" && <DropdownMenu className="dropdown" />}

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default Header;