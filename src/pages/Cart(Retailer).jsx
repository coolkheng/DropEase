import React, { useContext } from "react";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../components/Header";
import DropdownMenu from "../components/UsernameDropDown";
import SideNavSupplier from "../components/SideNavSupplier";
import { CartContext } from "./cartContext"; // Ensure the correct path to your CartContext
import axios from 'axios';

const RetailerCart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const handleCheckout = async () => {
    const userID = "yourUserID"; // Replace with actual user ID
    const cartItems = [
      // Replace with actual cart items from your state
    ];
  
    try {
      const response = await axios.post('/api/cartretailer', { userID, cartItems });
      console.log('Cart items saved:', response.data);
      // Handle successful checkout, e.g., navigate to a success page, clear the cart, etc.
    } catch (error) {
      console.error('Error saving cart items:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // Render cart items
  return (
    <>
         <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNavSupplier /> {/* Ensure the component is imported correctly */}
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
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaXmark />
                      </button>
                    </div>
                    <div className="cartControl">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <FaPlus />
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
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
