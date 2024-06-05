import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "../style/GroupedProductItems.css";

const GroupedProductItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproduct');
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch products:', response.status, errorMessage);
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grouped-products-container">
      {products.map((product) => (
        <div key={product._id} className="grouped-products-item">
          <ProductItem
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
        </div>
      ))}
    </div>
  );
};

export default GroupedProductItems;
