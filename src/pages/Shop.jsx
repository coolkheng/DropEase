import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Store from "../components/store";

const Shop = () => {
  const [storeId, setStoreId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          setStoreId(data.data.storeId);
          navigate(`/home/${data.data.storeId}`); // Navigate to the store page based on storeId
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
      {!isSmallScreen && (
        <aside className="w-full md:w-[20%]">
          <SideNav />
        </aside>
      )}

      {isSmallScreen && (
        <div className="fixed-top-bar">
          <TopBar />
        </div>
      )}
      <main
        className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
      >
        <Store />
      </main>
    </div>
  );
};

export default Shop;
