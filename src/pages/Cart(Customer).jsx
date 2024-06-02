import React, { useContext, useEffect, useState } from "react";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import HeaderCustomer from "../components/Header(Customer)";
import { CartContext } from "./cartContext"; 

const Cart = () => {
  const { addToCart, decreaseQty, removeFromCart } = useContext(CartContext);
  const authToken = localStorage.getItem('auth-token');
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });
        const data = await response.json();
        console.log("Fetched data:", data);
        if (response.ok) {
          setCartItems(data); // Assuming data is an array of cart items
          setLoading(false);
        } else {
          setErrorMessage(data.errors || "Failed to fetch cart data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setErrorMessage("Failed to fetch cart data");
        setLoading(false);
      }
    };
  
    fetchCart();
  }, [authToken]);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  console.log("Cart items state:", cartItems);

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.product.price,
    0
  );

  // Render cart items
  return (
    <>
      <HeaderCustomer />
      <section className="cart-items">
        <div className="container-cart">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items in Cart</h1>
            )}
            {cartItems.map((item, index) => {
              const productQty = item.product.price * item.quantity;
              return (
                <div className="cart-list" key={index}>
                  <div className="img">
                    <img src={item.product.mainImages} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.product.name}</h3>
                    <h4>
                      RM {item.product.price} * {item.quantity}
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
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
