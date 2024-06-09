import React, { useContext, useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import DropdownMenu from "../components/UsernameDropDown";
import SideNavSupplier from "../components/SideNavSupplier";
import { CartRetailerContext } from "./cartRetailerContext";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const RetailerCart = () => {
  const [storeId, setStoreId] = useState(null);
  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartRetailerContext);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:4000/userData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        if (data.success) {
          setStoreId(data.data.storeId);
        } else {
          setErrorMessage(data.errors);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleAddToCart = async (item) => {
    await addToCart(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer", {
        productId: item.id,
        quantity: 1,
        storeId: storeId // Include storeId
      }, {
        headers: {
          'auth-token': token,
        }
      });

      if (response.data === "Added to cart") {
        console.log("Item added to cart successfully");
      } else {
        console.log("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleDecreaseQty = async (item) => {
    await decreaseQty(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer/decreaseQty", {
        productId: item.id,
        storeId: storeId // Include storeId
      }, {
        headers: {
          'auth-token': token,
        }
      });

      if (response.data === "Quantity decreased") {
        console.log("Item quantity decreased successfully");
      } else {
        console.log("Failed to decrease item quantity");
      }
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  const handleRemoveCartItem = async (itemId) => {
    console.log("Attempting to remove item with ID:", itemId);
    console.log("Current cart items before removal:", cartItems);

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer/removeFromCart", {
        productId: itemId,
        storeId: storeId // Include storeId
      }, {
        headers: {
          'auth-token': token,
        }
      });

      if (response.data === "Item removed from cart") {
        console.log("Item removed from cart successfully");
        removeFromCart(itemId);
        console.log("Current cart items after removal:", cartItems);
      } else {
        console.log("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    console.log("Handle checkout function called!");

    await clearCart();

    const stripe = await loadStripe("pk_test_51PNRN72MhvOMkL1SuBf1xlugNRrOIaWjFrNyg80sHZbgkCSwHrf50jA6oHUq04d03PaVvYlL9aZ9GAlC4i7IhtT400byNPNV9D");

    const body = {
      products: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.mainImages
      })),
      userId: localStorage.getItem("auth-token"),
      storeId: storeId // Include storeId
    };

    const headers = {
      "Content-Type": "application/json",
      'auth-token': localStorage.getItem("auth-token")
    };

    try {
      const response = await axios.post("http://localhost:4000/create-checkout-session", body, { headers });

      console.log("Response from backend:", response);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { id: sessionId } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Redirect to checkout successful");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const clearCart = async () => {
    console.log("Clear cart function called!");
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer/clear", {
        storeId: storeId // Include storeId
      }, {
        headers: {
          'auth-token': token,
        }
      });

      if (response.data.success) {
        console.log("Cart cleared successfully");
      } else {
        console.log("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
    0
  ).toFixed(2);

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
    {!isSmallScreen && (
      <aside className="w-full md:w-[20%]">
        <SideNavSupplier />
      </aside>
    )}

    {isSmallScreen && (
      <div className="fixed-top-bar">
        <TopBar />
      </div>
    )}

    <main
      className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
    >
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartItems.map((item) => {
              const productQty = (item.price * item.qty).toFixed(2);
              return (
                <div className="cart-list" key={item.id}>
                  <div className="img">
                    <img src={item.mainImages} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      RM {item.price.toFixed(2)} * {item.qty}
                      <span>RM {productQty}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCartButton"
                        onClick={() => handleRemoveCartItem(item.id)}
                      >
                        <FaXmark />
                      </button>
                    </div>
                    <div className="cartControl">
                      <button
                        className="incCart"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaPlus />
                      </button>
                      <button
                        className="desCart"
                        onClick={() => handleDecreaseQty(item)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <div className="totaldisplay">
              <h2>Cart Summary</h2>
              <div className="Total-product">
                <h4>Total Price :</h4>
                <h3>RM {totalPrice}</h3>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
    
  );
};

export default RetailerCart;
