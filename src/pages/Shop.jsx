import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Store from "../components/store";

const Shop = () => {
  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
      <main className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}>
        
      <Store/>
      </main>
    </div>
  );
};

export default Shop;
