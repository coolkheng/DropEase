import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import HeaderCustomer from "../components/Header(Customer)";
import { CartContext } from "./cartContext";
import "../style/Cart(Customer).css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Cart = () => {
  let Id = useParams();
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);
  const authToken = localStorage.getItem('auth-token');

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * Number((item.product.price * 1.10).toFixed(2)),
    0
  );

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

    const userId = localStorage.getItem("auth-token");

    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };

    const productsData = cartItems.map((item) => ({
      productName: item.name,
      price: item.price,
      quantity: item.qty,
      productImage: item.mainImages,
      category: item.category || "Uncategorized",
    }));

    const orderData = {
      products: productsData,
      customer: {
        name: "Customer Name", // Replace with actual customer data
        email: "customer@example.com", // Replace with actual customer data
      },
      orderDate: new Date(),
      payment_status: "Paid", // You may adjust this based on your business logic
      delivery_status: "Ready to Ship", // You may adjust this based on your business logic
    };

    // Make an HTTP request to your backend API to create the order
    try {
      const orderResponse = await axios.post(
        "http://localhost:4000/insert_orders",
        orderData,
        { headers }
      );

      console.log("Order response from backend:", orderResponse.data);
    } catch (error) {
      console.error("Checkout error:", error);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session-customer",
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


  // Render cart items
  return (
    <>
      <HeaderCustomer customer={Id}/>
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items in Cart</h1>
            )}
            {cartItems.map((item, index) => {
              // Check if item and item.product exist
              if (!item || !item.product) {
                return null;
              }

              const productQty = Number((item.product.price * 1.10).toFixed(2)) * item.quantity;
              return (
                <div className="cart-list" key={index}>
                  <div className="img">
                    <img src={item.product.mainImages} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.product.name}</h3>
                    <h4>
                      RM {Number((item.product.price * 1.10).toFixed(2))} * {item.quantity}
                      <span>RM {productQty}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCartButton"
                        onClick={() => removeFromCart(item.product.id, authToken)}
                      >
                        <FaXmark />
                      </button>
                    </div>
                    <div className="cartControl">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item.product, authToken)}
                      >
                        <FaPlus />
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item.product, authToken)}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total">
            <div className="totaldisplay">
              <h2>Cart Summary</h2>
              <div className="Total-product">
                <h4>Total Price :</h4>
                <h3>RM {totalPrice.toFixed(2)}</h3>
              </div>
              <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
