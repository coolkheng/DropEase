import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, authToken) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });

    if (authToken) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id })
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const decreaseQty = (product, authToken) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );

    if (authToken) {
      fetch('http://localhost:4000/decreasequantity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id })
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message))
        .catch((error) => console.error("Error decreasing quantity:", error));
    }
  };

  const removeFromCart = (productId, authToken) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

    if (authToken) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
      })
        .then((response) => response.json())
        .then((data) => console.log(data.message))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, decreaseQty, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
