import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/ShopCategory(Customer).css";
import HeaderCustomer from "../components/Header(Customer)";

const ShopCategory = ({ category }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:4000/allstore');
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch stores:', response.status, errorMessage);
          throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        setStores(data);
        console.log(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter stores based on the category prop
  const filteredStores = stores.filter(store => store.category === category);

  // Determine the category name for display
  let categoryNames = "";
  if (category.toLowerCase() === "Apparel") {
    categoryNames = "Apparel & Accessories";
  } else if (category.toLowerCase() === "Sports") {
    categoryNames = "Sports & Entertainment";
  } else if (category.toLowerCase() === "Electronic") {
    categoryNames = "Electronics";
  }

  return (
    <div className="ShopCategory">
      <HeaderCustomer />
      <h2 className="categoryNames" style={{ fontWeight: "bolder", fontSize: "30px" }}>{categoryNames}</h2>
      {/* Map over the filtered stores and render each store item */}
      {filteredStores.map((store) => (
        <Link key={store.storeId} to={`/store/${store.storeId}`} className="shop-link">
          <div className="shopCatbox">
            <div className="shopCat-con">
              <div className="img-con">
                <img className="shopCat-img" src={store.imageUrl} alt={store.store} />
                <p className="shopCat-name">{store.store}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopCategory;