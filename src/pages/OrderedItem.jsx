import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header"; // Import your Header component
import "../style/Header.css"; // Import your Header component style
import "../style/OrderedItem.css";
import Cart from "../components/Cart";
import { useParams } from "react-router-dom";

const OrderedItemPage = () => {
  let orderid = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const username = "Goh Kah Kheng"; // Example username

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/orders/${orderid.id}`
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <body>
      <div>
        <Header username={username} /> {/* Render the Header component */}
        <div className="ordereditem-content">
          <div className="Ordered-items">
            <Cart orderDetails={orderDetails} />
            <div />
          </div>
        </div>
      </div>
    </body>
  );
};
export default OrderedItemPage;
