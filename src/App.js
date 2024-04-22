import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/Order"; // Import your OrderPage component
import OrderedItemPage from "./pages/OrderedItem";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/ordered-item/:id" element={<OrderedItemPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
