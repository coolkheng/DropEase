import React from 'react';
import Header from "../components/Header";
import SideNav from '../components/SideNav';

import "../style/Header.css";
import "../style/SideNav.css";
import "../style/MainContent.css";
import ProductItem from '../components/ProductItem';

function Addproduct ()  { 
    return (
        <div className="AddProduct">
            <Header />
            <SideNav />
            <div className="main-content">
                <div className="content">
                    <h1>List of Products</h1>
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
                        <ProductItem
                            title="Sample Product"
                            description="This is a sample product description."
                            imageUrl="https://via.placeholder.com/150"
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
  
export default Addproduct;
