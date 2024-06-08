import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import Products from "../components/Productss";
import HeaderCustomer from "./Header(Customer)";



const Store = () => {
  const { storeId } = useParams(); // Get storeId from URL parameters
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
  });

  return (
    <div>
      {userRole === "customer" && <HeaderCustomer/>}
      <div style={{marginLeft:"30px"}} className="flex justify-between items-center mt-5">
        <Header />
      </div>


      <div className="flex justify-center mt-5">
        <Hero storeId={storeId} /> {/* Pass storeId to Hero component */}
      </div>
      <div>
        <h2 style={{marginTop:"80px"}} className="flex justify-center pt-10 text-3xl font-bold">
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
