import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/SideNav"; // Assuming Navbar is your sidebar component
import TopBar from "../components/TopBar"; // Assuming TopBar is your top bar component
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import ProductItem from "../components/ProductItem";
import AddProductButton from "../components/AddProductButton";
import DropdownMenu from "../components/UsernameDropDown"; // Assuming UsernameDropDown is your dropdown menu component
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const Products = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState(false);

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

  const toggleCreateCollectionModal = () => {
    setShowCreateCollectionModal(!showCreateCollectionModal);
  };
  
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
                  <SearchBar />
                </div>
              </div>
              <div className="product-content">
                <div className="product-list">
                  <ProductItem
                    title="Sample Product"
                    description="This is a sample product description."
                    imageUrl="https://via.placeholder.com/150"
                  />
                  <ProductItem
                    title="Sample Product"
                    description="This is a sample product description."
                    imageUrl="https://via.placeholder.com/150"
                  />
                  <ProductItem
                    title="Sample Product"
                    description="This is a sample product description."
                    imageUrl="https://via.placeholder.com/150"
                  />
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

        <footer>
          <p>&copy; 2024 My App</p>
        </footer>
      </main>
    </div>
  );
};

export default Products;
