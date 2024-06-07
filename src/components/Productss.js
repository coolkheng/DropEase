import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const Productss = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [storeId, setStoreId] = useState(null); // Initialize as null
  const [errorMessage, setErrorMessage] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch storeId first
        const token = localStorage.getItem("auth-token");
        const userDataResponse = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const userData = await userDataResponse.json();
        if (!userData.success) {
          setErrorMessage(userData.errors);
          throw new Error('Failed to fetch user data');
        }
        const storeId = userData.data.storeId;
        setStoreId(storeId);

        // Fetch retailer product data using storeId
        const retailerResponse = await fetch(`http://localhost:4000/retailerproduct/`);
        if (!retailerResponse.ok) {
          throw new Error('Failed to fetch retailer products');
        }
        const retailerData = await retailerResponse.json();
        const thisdata = retailerData.find(doc => doc.storeId === storeId);
        if (!thisdata) {
          throw new Error('Store data not found');
        }
        const keys = Object.keys(thisdata.cartData);
        const numericKeys = keys.filter(key => !isNaN(key)).map(Number);

        // Fetch all products and filter using numericKeys
        const productsResponse = await fetch('http://localhost:4000/allproduct');
        if (!productsResponse.ok) {
          const errorMessage = await productsResponse.text();
          console.error('Failed to fetch products:', productsResponse.status, errorMessage);
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        const filteredData = productsData.filter(product => numericKeys.includes(product.id));
        setProducts(filteredData);
        setFilteredProducts(filteredData);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="ml-5 pt-5"></div>
      <div className="mx-auto w-[90%] container pt-1">
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-5 gap-10 xl:gap-x-20 xl:gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              img={product.mainImages}
              name={product.name}
              desc={product.desc}
              longDesc={product.longdesc}
              rating={product.rating}
              price={product.price}
              product={product}
              color={product.color}
              size={product.sizes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productss;
