import React from "react";
import Header from "./components/Header";
import "./style/Header.css";
import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Cartr from "./pages/Cart(Retailer)";
import SupplierProductDetails from "./pages/SupplierProductDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header username="Your Username" />
      {/* Include the Header component */}
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Product' element={<Product/>}>
          <Route path='/ProductId' element={<Product/>}/>
        </Route>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/retailercart" element={<Cartr />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      </BrowserRouter>
      <main>
        <p>This is the main content of the app.</p>
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default App;
