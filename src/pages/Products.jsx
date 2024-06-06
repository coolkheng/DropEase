import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/SideNav"; // Assuming Navbar is your sidebar component
import TopBar from "../components/TopBar"; // Assuming TopBar is your top bar component
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import '../style/SearchBar.css'; 

import ProductItem from "../components/ProductItem";
import AddProductButton from "../components/AddProductButton";
import DropdownMenu from "../components/UsernameDropDown"; // Assuming UsernameDropDown is your dropdown menu component
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Products = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [products, setProducts] = useState([]); // State for all products
  const { storeId } = useParams(); // Get storeId from URL parameters
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
        setFilteredProducts(data); // Initialize filtered products

      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      } 
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchRetailerProducts = async () => {
      try {
        const userId = user.userId;
        console.log('userId: ', userId)
        const response = await fetch(`http://localhost:4000/retailerproduct/`, {
          userID: userId
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch products:', response.status, errorMessage);
          throw new Error('Failed to fetch products');
        }
        console.log('response in proudct page: ', response.data)
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products

      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      } 
    };

    fetchRetailerProducts();
  }, []);

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

      <main
        className={`w-full ${isSmallScreen ? "" : "md:w-[95%]"} mr-10 mt-10`}
      >
        {isSmallScreen && (
          <div className="fixed-top-bar">
            <TopBar />
          </div>
        )}

        <div className="flex justify-between items-center mt-5">
          <Header />
        </div>

        <div style={{ width: "100%", marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
                    {/* {filteredProducts.map((product) => (
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
                    ))} */}
                    <Link to="/foodbeverages">
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
