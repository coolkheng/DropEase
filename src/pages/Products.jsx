import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/SideNav";
import TopBar from "../components/TopBar";
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import '../style/SearchBar.css'; 
import ProductItem from "../components/ProductItem";
import AddProductButton from "../components/AddProductButton";
import SearchBar from "../components/SearchBar";

const Products = () => {
  const { storeId } = useParams(); // Extract storeId from URL
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [products, setProducts] = useState([]); // State for all products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch retailer product data using storeId
        console.log(`Fetching data for storeId: ${storeId}`);
        const retailerResponse = await fetch(`http://localhost:4000/retailerproduct/`);
        if (!retailerResponse.ok) {
          throw new Error('Failed to fetch retailer products');
        }
        const retailerData = await retailerResponse.json();
        console.log(`Retailer data fetched:`, retailerData);

        const storeData = retailerData.find(doc => doc.storeId.toString() === storeId);
        if (!storeData) {
          throw new Error(`Store data not found for storeId: ${storeId}`);
        }
        console.log(`Data for storeId ${storeId}:`, storeData);

        const productIds = Object.keys(storeData.cartData).map(Number);
        console.log(`Product IDs in cart for storeId ${storeId}:`, productIds);

        // Fetch all products and filter using productIds
        const productsResponse = await fetch('http://localhost:4000/allproduct');
        if (!productsResponse.ok) {
          const errorMessage = await productsResponse.text();
          console.error('Failed to fetch products:', productsResponse.status, errorMessage);
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        console.log(`All products fetched:`, productsData);

        const filteredData = productsData
          .filter(product => productIds.includes(product.id))
          .map(product => ({
            ...product,
            quantity: storeData.cartData[product.id] || 0
          }));
        setProducts(filteredData);
        setFilteredProducts(filteredData);
        console.log(`Filtered products:`, filteredData);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCreateCollectionModal = () => {
    setShowCreateCollectionModal(!showCreateCollectionModal);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
      {!isSmallScreen && (
        <aside className="w-full md:w-[20%] customShadow">
          <Navbar />
        </aside>
      )}

      <main className={`w-full ${isSmallScreen ? "" : "md:w-[95%]"} mr-10 mt-10`}>
        {isSmallScreen && (
          <div className="fixed-top-bar">
            <TopBar />
          </div>
        )}

        <div className="flex justify-between items-center mt-5">
          <Header />
        </div>

        <div style={{ width: "100%", marginTop: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="product-main-content">
              <div className="productpage-title">
                <p>Store Products</p>
                <div className="pt-2">
                  <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
                </div>
              </div>
              <div className="product-content">
                <div className="product-list">
                  <div className="grouped-products-container">
                    {filteredProducts.map((product) => (
                      <div key={product._id} className="grouped-products-item">
                        <ProductItem
                          img={product.mainImages}
                          name={product.name}
                          desc={product.desc} 
                          longDesc={product.longdesc}
                          rating={product.rating}
                          price={Number((product.price * 1.10).toFixed(2))}                          
                          product={product}
                          color={product.color}
                          size={product.sizes}
                          quantity={product.quantity} // Pass quantity here
                        />
                      </div>
                    ))}
                    <Link to={`/foodbeverages/${storeId}`}>
                      <AddProductButton
                       image={require("../asset/add-button.png")}
                       description="Add Products"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <p>&copy; 2024 My App</p>
        </footer>
      </main>
    </div>
  );
};

export default Products;
