import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderPage from "./pages/Order"; 
import OrderedItemPage from "./pages/OrderedItem";
import Header from "./components/Header";
import SideNav from "./components/SideNav";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header/>
        <SideNav/>
        <div className="content">
          <Routes>
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/ordered-item/:id" component={OrderedItemPage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
