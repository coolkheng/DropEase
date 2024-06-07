import React, { useEffect, useState } from "react";
import SupplierProductCard from "./SupplierProductCard";
import ProductCard from "./ProductCard";

const SupplierProducts = ({ category }) => {
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
        // Filter products by category
        const filteredProducts = data.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="ml-5 pt-5"></div>
      <div className="mx-auto w-[90%] container pt-1">
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 xl:gap-x-20 xl:gap-y-10">
          {products.map((product) => (
            <SupplierProductCard
              key={product._id}
              img={product.mainImages}
              name={product.name}
              desc={product.desc}
              longDesc={product.longDesc}
              rating={product.rating}
              price={product.price.toFixed(2)}
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

export default SupplierProducts;
