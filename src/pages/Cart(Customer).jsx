import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import HeaderCustomer from "../components/Header(Customer)";
import { CartContext } from "./cartContext";
import { loadStripe } from "@stripe/stripe-js";
import "../style/Cart(Customer).css";
import axios from "axios";
import ShopCategory from "./ShopCategory(Customer)";

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart, clearCart } =
    useContext(CartContext);
  const authToken = localStorage.getItem("auth-token");
  const customerId = useParams().customerId;
  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) =>
      price + item.quantity * Number((item.product.price * 1.1).toFixed(2)),
    0
  );

  const productsData = cartItems.map((item) => ({
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    productImage: item.product.mainImages,
    category: item.product.xcategory || "Uncategorized",
  }));

  console.log(cartItems);
  console.log(productsData);

  const handleCheckout = async () => {
    console.log("Handle checkout function called!");

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
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        } // Add headers variable here
      );

      console.log("Order response from backend:", orderResponse.data);

      // Clear the cart before proceeding to checkout
      await clearCart();

      const stripe = await loadStripe(
        "pk_test_51PNRN72MhvOMkL1SuBf1xlugNRrOIaWjFrNyg80sHZbgkCSwHrf50jA6oHUq04d03PaVvYlL9aZ9GAlC4i7IhtT400byNPNV9D"
      );

      const body = {
        products: cartItems.map((item) => ({
          name: item.product.name,
          price: Number((item.product.price * 1.1).toFixed(2)),
          quantity: item.quantity,
          image: item.product.mainImages,
        })),
        userId: authToken,
      };

      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        body,
        {
          headers: {
            "auth-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { id: sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.log(result.error.message);
      }

      console.log("Proceeding to checkout with body:", body);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <HeaderCustomer customer={customerId} />
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items in Cart</h1>
            )}
            {cartItems.map((item, index) => {
              if (!item || !item.product) {
                return null;
              }

              const productQty =
                Number((item.product.price * 1.1).toFixed(2)) * item.quantity;
              return (
                <div className="cart-list" key={index}>
                  <div className="img">
                    <img
                      src={item.product.mainImages}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="cart-details">
                    <h3>{item.product.name}</h3>
                    <h4>
                      RM {Number((item.product.price * 1.1).toFixed(2))} *{" "}
                      {item.quantity}
                      <span>RM {productQty.toFixed(2)}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button
                        className="removeCartButton"
                        onClick={() =>
                          removeFromCart(item.product.id, authToken)
                        }
                      >
                        <FaTimes />
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
