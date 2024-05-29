import React, { useContext } from "react";
import "../style/Cart(Customer).css";
import { FaXmark } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import HeaderCustomer from "../components/Header(Customer)";
import { CartContext } from "./cartContext"; // Ensure the correct path to your CartContext

const Cart = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useContext(CartContext);

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price,
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
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartItems.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <div className="img">
                    <img src={item.img} alt="" />
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
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
