import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CartContext } from "./cartContext";
import "../style/ProductDetails.css";
import HeaderCustomer from "../components/Header(Customer)";
import SideNav from "../components/SideNav";

const ProductDetails = () => {
  let Id = useParams();
  console.log(Id.customerId);
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { addToCart } = useContext(CartContext);

  const [mainImage, setMainImage] = useState(product?.mainImages);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const [hasSize, setHasSize] = useState(
    product.size && product.size.length > 0
  );
  const [hasColor, setHasColor] = useState(
    product.color && product.color.length > 0
  );

  const handleAddToCart = () => {
    let missingField = false;

    if (hasSize && !selectedSize) {
      alert("Please select a size.");
      missingField = true;
    }

    if (hasColor && !selectedColor) {
      alert("Please select a color.");
      missingField = true;
    }

    if (missingField) {
      return;
    }

    const authToken = localStorage.getItem("auth-token");
    addToCart(
      { ...product, mainImage, size: selectedSize, color: selectedColor },
      authToken
    );

    navigate(`/${Id.customerId}/store/${Id.storeId}/customercart`);
  };

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          const response = await fetch("http://localhost:4000/userData", {
            method: "POST",
            headers: {
              "auth-token": authToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });

          const data = await response.json();
          if (data.success) {
            setUserRole(data.data.role);
          } else {
            setUserRole(null);
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    checkUserRole();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={userRole === "retailer" ? "sidenav-visible" : ""}>
      {userRole === "customer" && <HeaderCustomer customer={Id} />}
      {userRole === "retailer" && <SideNav className="sidenav" />}

      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {product.images.map((img, index) => (
              <img
                src={img}
                alt={`Product ${index}`}
                key={index}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={mainImage}
              alt={product.name}
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1 className="productName">{product.name}</h1>
          <div className="productdisplay-right-decs">
            <p>{product.desc}</p>
          </div>
          <div className="productdisplay-right-prices">
            <h2 className="priceDetails">
              RM {Number((product.price * 1.1).toFixed(2))}
            </h2>
          </div>
          {product.longdesc && product.longdesc.length > 0 && (
            <div className="productdisplay-right-longDesc">
              <p>{product.longdesc}</p>
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
                      backgroundColor:
                        selectedSize === size ? "#f8b179" : "#f9f9fc",
                    }}
                    onClick={() => handleSizeClick(size)}
                    key={size}
                  >
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
                      backgroundColor:
                        selectedColor === color ? "#f8b179" : "#f9f9fc",
                    }}
                    onClick={() => handleColorClick(color)}
                    key={color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          {userRole === "customer" && (
            <button className="addtocart-button" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
