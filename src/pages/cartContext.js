import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const authToken = localStorage.getItem('auth-token');
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch cart items on initial load and whenever authToken changes
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

  // Function to update cart items and calculate total price
  const updateCart = async () => {
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

  const addToCart = async (product, authToken) => {
    try {
      const response = await fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id })
      });
      const data = await response.json();
      console.log(data.message);
      updateCart(); // Update cart after adding to cart
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseQty = async (product, authToken) => {
    try {
      const response = await fetch('http://localhost:4000/decreasequantity', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id })
      });
      const data = await response.json();
      console.log(data.message);
      updateCart(); // Update cart after decreasing quantity
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (productId, authToken) => {
    try {
      const response = await fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
      });
      const data = await response.json();
      console.log(data.message);
      updateCart(); // Update cart after removing from cart
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQty, removeFromCart, loading, errorMessage }}>
      {children}
    </CartContext.Provider>
  );
};

