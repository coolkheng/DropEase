import React from "react";
import Header from "../components/Header"; // Import your Header component
import StepProgressBar from "../components/progressbar";
import "../style/Header.css"; // Import your Header component style
import "../style/OrderedItem.css";
import Cart from "../components/Cart";

const OrderedItemPage = () => {
  const username = "Goh Kah Kheng"; // Example username

  return (
    <div>
      <Header username={username} /> {/* Render the Header component */}
      <div className="content">
        <div className="progressbar">
          <h1>Delivery Status</h1>
          <p>
            <StepProgressBar />
          </p>
        </div>

        <div className="Ordered-items">
          <Cart />
          <div />
        </div>
      </div>
    </div>
  );
};
export default OrderedItemPage;
