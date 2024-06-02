import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import Products from "../components/Productss";


const Store = () => {
  const { storeId } = useParams(); // Get storeId from URL parameters

  return (
    <div>
      <div style={{marginLeft:"30px"}} className="flex justify-between items-center mt-5">
        <Header />
      </div>

      <div className="flex justify-center mt-5">
        <Hero storeId={storeId} /> {/* Pass storeId to Hero component */}
      </div>
      <div className="flex justify-center">
        <h2 className="pt-20 text-3xl font-bold">Collections</h2>
      </div>
      <div>
        <Collections storeId={storeId} /> {/* Pass storeId to Collections component */}
      </div>
      <div>
        <h2 className="flex justify-center pt-10 text-3xl font-bold">
          All Products
        </h2>
      </div>

      <div className="mb-20">
        <Products storeId={storeId} /> {/* Pass storeId to Products component */}
      </div>
    </div>
  );
};

export default Store;
