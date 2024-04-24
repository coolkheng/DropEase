import React from 'react';
import Header from "../components/Header"; // Check if the path is correct
import SideNav from '../components/SideNav'; // Check if the path is correct
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import ProductItem from '../components/ProductItem';
import AddProductButton from '../components/AddProductButton';
import DropdownMenu from '../components/UsernameDropDown'; // Check if the path is correct

function Products() {
  return (
    <div className="Products">
      <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNav /> {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <div className="productpage-title">
          <h1>Store Products</h1>
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
           <AddProductButton
                image={require('../asset/add-button.png')}
                description="Add Products"
            />
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
