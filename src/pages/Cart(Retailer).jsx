import React, { useContext } from "react";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import DropdownMenu from "../components/UsernameDropDown";
import SideNavSupplier from "../components/SideNavSupplier";
import { CartContext } from "./cartContext";
import axios from 'axios';

const RetailerCart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);

  // Function to handle adding items to the cart and send request to the backend
  const handleAddToCart = async (item) => {
    await addToCart(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer", {
        productId: item.id,
        quantity: 1, // Assuming you add one item at a time
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

  // Function to handle decreasing item quantity in the cart and send request to the backend
  const handleDecreaseQty = async (item) => {
    await decreaseQty(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post("http://localhost:4000/cartretailer/decreaseQty", {
        productId: item.id, // Include productId in the request body
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
  

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      console.log("Cart Items:", cartItems);
      const cartItemsPayload = cartItems.map(item => ({
        productId: item.id,
        quantity: item.qty
      }));
      const response = await axios.post("http://localhost:4000/cartretailer/checkout", {
        items: cartItemsPayload,
      }, {
        headers: {
          'auth-token': token,
        }
      });
  
      if (response.data.success) {
        alert("Checkout successful!");
      } else {
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again later.");
    }
  };

    // Function to handle removing item from the cart and send request to the backend
    const handleRemoveCartItem = async (itemId) => {
      console.log("Attempting to remove item with ID:", itemId);
      console.log("Current cart items before removal:", cartItems);
    
      try {
        const token = localStorage.getItem("auth-token");
        const response = await axios.post("http://localhost:4000/cartretailer/removeFromCart", {
          productId: itemId, // Send productId to the backend
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
    
    

  // Render cart items
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
                        onClick={() => handleDecreaseQty(item)} // Updated function call
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