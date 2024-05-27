import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Collections from "../components/Collections";
import Productss from "../components/Productss";

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

      <main
        className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
      >
        <div className="flex justify-between items-center mt-5">
          <Header />
        </div>

        <div className="flex justify-center mt-5">
          <Hero />
        </div>
        <div className="flex justify-center">
          <h2 className="pt-20 text-3xl font-bold">Collections</h2>
        </div>
        <div>
          <Collections />
        </div>
        <div>
          <h2 className="pt-10 font-medium text-2xl">All Products</h2>
        </div>

        <div>
          <Productss />
        </div>
      </main>
    </div>
  );
};

export default Shop;
