import React,{useState, useContext} from "react";
import { useLocation , useNavigate} from "react-router-dom";
import {CartRetailerContext} from "./cartRetailerContext";
import "../style/ProductDetails.css";
import axios from 'axios';



const SupplierProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const {addToCart} = useContext(CartRetailerContext);

  const [mainImage, setMainImage] = useState(product?.mainImages);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = async () => {
    await addToCart({ ...product, mainImage, size: selectedSize, color: selectedColor });
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer", {
        productId: product.id,
        quantity: 1, // Assuming you add one item at a time
      }, {
        headers: {
          'auth-token': token,
        }
      });
  
      if (response.data === "Added to cart") {
        console.log("Item added to cart successfully");
        navigate('/retailercart'); // Navigate only after the backend request is successful
      } else {
        console.log("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.images.map((img, index) => (
            <img 
              src={img} 
              alt={`Product ${index}`} 
              key={index}
              onClick={()=> handleImageClick(img)}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={mainImage} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1 className="productName">{product.name}</h1>
        
        <div className="productdisplay-right-decs">
          <p>{product.desc}</p>
        </div>

        <div className="productdisplay-right-prices">
          <h2 className="priceDetails">RM {product.price.toFixed(2)}</h2>
        </div>

        {product.longDesc && product.longDesc.length > 0 && (
            <div className="productdisplay-right-longDesc">
              <p>{product.longDesc}</p>
            </div>
          )}

        {product.size && product.size.length > 0 && (
            <div className="productdisplay-right-size">
              <h3>Select Size</h3>
              <div className="productdisplay-right-sizes">
                {product.size.map((size) => (
                  <button 
                    style={{ 
                      color: selectedSize === size ? "black" : "black",
                      backgroundColor: selectedSize === size ? "#f8b179" : "#f9f9fc",
                    }} 
                    onClick={() => handleSizeClick(size)}
                    key={size}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.color && product.color.length > 0 && (
            <div className="productdisplay-right-size">
              <h3>Select Color</h3>
              <div className="productdisplay-right-sizes">
                {product.color.map((color) => (
                  <button 
                  style={{ 
                    color: selectedColor === color ? "black" : "black",
                    backgroundColor: selectedColor === color ? "#f8b179" : "#f9f9fc",
                  }} 
                  onClick={() => handleColorClick(color)}
                  key={color}>
                  {color}
                </button>
                ))}
              </div>
            </div>
          )}

        <button className="addtocart-button" onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
    </>
    
  );
};

export default SupplierProductDetails;