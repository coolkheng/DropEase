import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Hero from "../components/Hero";
import Navbar from "../components/SideNav";
import ProductCard from "../components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Productss from "../components/Productss";
 
const Shop = () => {
  return (
    <div className="min-h-[calc(100vh-90px)] md:flex hidden">
      <aside className="min-h-full w-full max-w-full customShadow">
        <div className="mt-5 flex justify-center flex-col">
          <div className="flex items-center">
            <div className="text-5xl cursor-pointer relative flex justify-start ml-5">
              <FaRegCircleUser />
            </div>
            <p className="capitalize text-lg font-semibold ml-2">Username</p>
          </div>
          <Navbar/>
        </div>
        <div className="flex justify-center">
          <Hero />
        </div>
        <div>
          <Productss/>
        </div>
      </aside>
    </div>
  );
};

export default Shop;
