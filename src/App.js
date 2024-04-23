import React from "react";
import Main from "./components/main.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import OrderPage from "./pages/Order"; // Import your OrderPage component
import OrderedItemPage from "./pages/OrderedItem";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Pw from "./components/forgotpw.jsx";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/forgotpw" exact element={<Pw />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/ordered-item/:id" element={<OrderedItemPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
