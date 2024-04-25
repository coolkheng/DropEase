import React from "react";
import Header from "../components/Header"; // Check if the path is correct
import SideNav from "../components/SideNav"; // Check if the path is correct
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import ProductItem from "../components/ProductItem";
import AddProductButton from "../components/AddProductButton";
import DropdownMenu from "../components/UsernameDropDown"; // Check if the path is correct
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

function Products() {
  return (
    <div className="Products">
      <Header>
        <DropdownMenu />
      </Header>
      <SideNav /> {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <div className="productpage-title">
          <p>Store Products</p>
          <SearchBar />
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
            <Link to="/suppliers">
              <AddProductButton
                image={require("../asset/add-button.png")}
                description="Add Products"
              />
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default Products;
