import React from 'react';
import Header from "../components/Header";
import SideNav from '../components/SideNav';
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/MainContent.css";
import "../style/Products.css";
import ProductItem from '../components/ProductItem';
import AddProductButton from '../components/AddProductButton';

function Products ()  { 
    return (
        <div className="Products">
            <Header />
            <SideNav />
            <div className="main-content">
                  <div className="title"> 
                    <h1>Store Products</h1>
                  </div>
                <div className="content">
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
                            image={require('../assest/add-button.png')}
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
