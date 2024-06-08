import React, { useContext, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import HeaderCustomer from "../components/Header(Customer)";
import { CartContext } from "./cartContext";
import "../style/Cart(Customer).css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
  let Id = useParams();
  const { cartItems, addToCart, decreaseQty, removeFromCart } =
    useContext(CartContext);
  const handleAddToCart = async (item) => {
    await addToCart(item);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post(
        "http://localhost:4000/addtocart",
        {
          productId: item.id,
          quantity: 1,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

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
      const response = await axios.post(
        "http://localhost:4000/decreasequantity",
        {
          productId: item.id,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data === "Quantity decreased") {
        console.log("Item quantity decreased successfully");
      } else {
        console.log("Failed to decrease item quantity");
      }
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  const totalPrice = cartItems
    .reduce((price, item) => price + (item.qty ?? 0) * (item.price ?? 0), 0)
    .toFixed(2);

  const handleCheckout = async () => {
    console.log("Handle checkout function called!");

    await clearCart();

    const stripe = await loadStripe(
      "pk_test_51PNRN72MhvOMkL1SuBf1xlugNRrOIaWjFrNyg80sHZbgkCSwHrf50jA6oHUq04d03PaVvYlL9aZ9GAlC4i7IhtT400byNPNV9D"
    );

    const body = {
      products: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.mainImages,
      })),
      userId: localStorage.getItem("auth-token"),
    };

    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        body,
        { headers }
      );

      console.log("Response from backend:", response);

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { id: sessionId } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
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
      const response = await axios.post(
        "http://localhost:4000/clear",
        {},
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        console.log("Cart cleared successfully");
      } else {
        console.log("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleRemoveCartItem = async (itemId) => {
    console.log("Attempting to remove item with ID:", itemId);
    console.log("Current cart items before removal:", cartItems);

    try {
      const token = localStorage.getItem("auth-token");
      const response = await axios.post(
        "http://localhost:4000/removeFromCart",
        {
          productId: itemId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

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
      <HeaderCustomer customer={Id} />
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
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
                      RM {(item.price ?? 0).toFixed(2)} * {item.qty ?? 0}
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
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
