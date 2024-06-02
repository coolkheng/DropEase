import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
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

  const addToCart = (product, authToken) => {
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

  const decreaseQty = (product, authToken) => {if (authToken) {
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
    <CartContext.Provider value={{cartItems,addToCart, decreaseQty, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
