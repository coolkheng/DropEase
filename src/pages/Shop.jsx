import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import Hero from "../components/Hero";
import Navbar from "../components/SideNav";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Productss from "../components/Productss";
import Category from "../components/Category";

const Shop = () => {
  return (
    <div className="min-h-[calc(100vh-90px)] md:flex hidden">
      <aside className="w-[20%] customShadow">
        <Navbar />
      </aside>

      <main className="w-[80%] mr-10">
        <div className="mt-5 flex justify-between items-center">
          <Header />
        </div>
        <Category />

        <div className="flex justify-center">
          <Hero />
        </div>

        <div>
          <Productss />
        </div>
      </main>
    </div>
  );
};

export default Shop;
