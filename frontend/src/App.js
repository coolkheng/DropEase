
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home'
import ShopCategory from './Pages/ShopCategory'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import { Header } from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <div >
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/apparel" element = {<ShopCategory category ="apparel"/>}/>
        <Route path="/sports" element = {<ShopCategory category ="sports"/>}/>
        <Route path="/electronics" element = {<ShopCategory category ="electronics"/>}/>
        <Route path="/cart" element = {<Cart/>}/>
        <Route path="/product" element = {<Product/>}>
          <Route path="/product" element = {<Product/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
