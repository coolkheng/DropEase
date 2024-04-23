import React from "react";
import "../Style/Cart.css";
import shoes from '../Assets/nikeShoes.png';
import { FaXmark } from "react-icons/fa6";
import { FaPlus,FaMinus } from "react-icons/fa";


const Cart = ({ addToCart, decreaseQty }) => {
  const sampleCartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 20,
      qty: 2,
      cover: shoes,
    },
    {
      id: 2,
      name: "Product 2",
      price: 25,
      qty: 1,
      cover: shoes,
    },
    {
      id: 3,
      name: "Product 3",
      price: 30,
      qty: 3,
      cover: shoes,
    },
  ];

  // Calculate total price of items
  const totalPrice = sampleCartItems.reduce((price, item) => price + item.qty * item.price, 0);

  // Render cart items
  return (
    <>
      <section className='cart-items'>
        <div className='container-cart'>
          <div className='cart-details'>
            {sampleCartItems.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}
            {sampleCartItems.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className='cart-list' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>RM {item.price}.00 * {item.qty}<span>RM {productQty}.00</span></h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCartButton'>
                        <FaXmark/>
                      </button>
                    </div>
                    <div className='cartControl'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <FaPlus/>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <FaMinus/>
                      </button>
                    </div>
                  </div>
                  <div className='cart-item-price'></div>
                </div>
              );
            })}
          </div>
          <div className='cart-total'>
            <div className="totaldisplay">
              <h2>Cart Summary</h2>
              <div className='Total-product'>
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
