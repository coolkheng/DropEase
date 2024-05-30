import React from "react";
import "./App.css";
import Main from "./components/main.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import OrderPage from "./pages/Order"; // Import your OrderPage component
import OrderedItemPage from "./pages/OrderedItem";
// import Header from "./components/Header";
// import SideNav from "./components/SideNav";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Pw from "./components/forgotpw.jsx";
import Products from "./pages/Products.jsx";
import Shop from "./pages/Shop.jsx";
import Suppliers from "./pages/Supplier.jsx";
import "./App.css";
import FoodBeverages from "./pages/SupplierCategory/FoodBeverages.jsx";
import HomeKitchen from "./pages/SupplierCategory/HomeKitchen.jsx";
import OfficeStationaries from "./pages/SupplierCategory/OfficeStationaries.jsx";
import HouseholdCleaning from "./pages/SupplierCategory/HouseholdCleaning.jsx";
import SportsGames from "./pages/SupplierCategory/SportsGames.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import CustomerHome from "./pages/Home(Customer).jsx";
import CustomerCart from "./pages/Cart(Customer).jsx";
import ShopCategory from "./pages/ShopCategory(Customer).jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import EditShop from "./pages/EditShop.js";
import Women from "./pages/Women.jsx";
import Men from "./pages/Men.jsx";
import Kids from "./pages/Kids.jsx";
import Profile from "./pages/Profile.jsx";
import { CartProvider } from "./pages/cartContext";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <CartProvider>
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
            <Route path="/products" element={<Products />} />
            <Route path="/home" element={<Shop />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/foodbeverages" element={<FoodBeverages />} />
            <Route path="/homekitchen" element={<HomeKitchen />} />
            <Route
              path="/officestationaries"
              element={<OfficeStationaries />}
            />
            <Route path="/householdcleaning" element={<HouseholdCleaning />} />
            <Route path="/sportsgames" element={<SportsGames />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/customerhome" element={<CustomerHome />} />
            <Route path="/customercart" element={<CustomerCart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/edit-store" element={<EditShop />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/kids" element={<Kids />} />
            <Route
              path="/apparel"
              element={<ShopCategory category="apparel" />}
            />
            <Route
              path="/sports"
              element={<ShopCategory category="sports" />}
            />
            <Route
              path="/electronics"
              element={<ShopCategory category="electronics" />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
      {/* </div> */}
    </CartProvider>
    </Router>
  );
}
export default App;
