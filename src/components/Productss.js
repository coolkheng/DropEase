import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Correct import for useParams
import ProductCard from "./ProductCard";

const Productss = ({ storeId, customerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch retailer product data using storeId
        console.log(`Fetching data for storeId: ${storeId}`);
        const retailerResponse = await fetch(
          `http://localhost:4000/retailerproduct/`
        );
        if (!retailerResponse.ok) {
          throw new Error("Failed to fetch retailer products");
        }
        const retailerData = await retailerResponse.json();
        console.log(`Retailer data fetched:`, retailerData);

        const storeData = retailerData.find(
          (doc) => doc.storeId.toString() === storeId
        );
        if (!storeData) {
          throw new Error(`Store data not found for storeId: ${storeId}`);
        }
        console.log(`Data for storeId ${storeId}:`, storeData);

        const productIds = Object.keys(storeData.cartData).map(Number);
        console.log(`Product IDs in cart for storeId ${storeId}:`, productIds);

        // Fetch all products and filter using productIds
        const productsResponse = await fetch(
          "http://localhost:4000/allproduct"
        );
        if (!productsResponse.ok) {
          const errorMessage = await productsResponse.text();
          console.error(
            "Failed to fetch products:",
            productsResponse.status,
            errorMessage
          );
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        console.log(`All products fetched:`, productsData);

        const filteredData = productsData.filter((product) =>
          productIds.includes(product.id)
        );
        setProducts(filteredData);
        console.log(`Filtered products:`, filteredData);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

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
              price={Number((product.price * 1.1).toFixed(2))}
              product={product}
              color={product.color}
              size={product.sizes}
              storeId={storeId}
              customerId={customerId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productss;
