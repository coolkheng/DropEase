import React, { useContext } from "react";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import DropdownMenu from "../components/UsernameDropDown";
import SideNavSupplier from "../components/SideNavSupplier";
import { CartContext } from "./cartContext";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const RetailerCart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);

  const handleAddToCart = async (item) => {
    await addToCart(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer", {
        productId: item.id,
        quantity: 1,
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

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleCheckout = async () => {
    const stripe = await loadStripe("pk_test_51PNRN72MhvOMkL1SuBf1xlugNRrOIaWjFrNyg80sHZbgkCSwHrf50jA6oHUq04d03PaVvYlL9aZ9GAlC4i7IhtT400byNPNV9D");
  
    const body = {
      products: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.mainImages
      }))
    };
  
    const headers = {
      "Content-Type": "application/json"
    };
  
    try {
      const response = await fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { id: sessionId } = await response.json();  // Ensure complete JSON is parsed
  
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId
      });
  
      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  

  const handleRemoveCartItem = async (itemId) => {
    console.log("Attempting to remove item with ID:", itemId);
    console.log("Current cart items before removal:", cartItems);

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer/removeFromCart", {
        productId: itemId,
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

  return (
    <>
      <Header>
        <DropdownMenu />
      </Header>
      <SideNavSupplier />
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartItems.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <div className="img">
                    <img src={item.mainImages} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      RM {item.price} * {item.qty}
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
                <h3>RM {totalPrice}.00</h3>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RetailerCart;