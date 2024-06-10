import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import Products from "../components/Productss";
import HeaderCustomer from "./Header(Customer)";

const Store = () => {
  let Id = useParams(); // Get storeId from URL parameter
  const storeId = useParams().storeId;
  console.log(Id);
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log();
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
  });

  return (
    <div>
      {userRole === "customer" && <HeaderCustomer customer={Id} />}
      <div
        style={{ marginLeft: "30px" }}
        className="flex justify-between items-center mt-5"
      ></div>

      <div className="flex justify-center mt-5">
        <Hero storeId={storeId} />
      </div>
      <div>
        <h2
          style={{ marginTop: "80px" }}
          className="flex justify-center pt-10 text-3xl font-bold"
        >
          All Products
        </h2>
      </div>

      <div className="mb-20">
        <Products storeId={storeId} />
      </div>
    </div>
  );
};

export default Store;
