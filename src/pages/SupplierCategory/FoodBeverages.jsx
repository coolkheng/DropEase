import React from 'react';
import Header from '../../components/Header';
import SideNavSupplier from '../../components/SideNavSupplier';
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import ProductItem from '../../components/ProductItem';
import DropdownMenu from '../../components/UsernameDropDown'; // Check if the path is correct
import { Link } from 'react-router-dom';

function FoodBeverages() {
  return (
    <div className="FoodBeverages">
         <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNavSupplier /> {/* Ensure the component is imported correctly */}
      <div className="product-main-content">
        <div className="productpage-title">
          <h1></h1>
        </div>
        <div className="product-content">
        <div className="product-list">
            <Link to="/paymentpage" style={{textDecoration:'none', textDecorationColor:'none'}}>
            <ProductItem
                title="12 X 550ml Spritzer Mineral Water (12 in 1)"
                description="RM11.92       /carton"
                imageUrl="https://www.borong.com/product-images/597c759b557c3f32f391cafe26974b370b90d8d0.jpeg"
            />
            </Link>
            <ProductItem
                title="Milo Original Can 240ml x 24
                "
                description="RM62.87       /carton"
                imageUrl="https://www.borong.com/product-images/ff972ce50069ec21d9dfa96aa858705652741fea.jpg"
            />
            <ProductItem
                title="DUTCH LADY UHT Chocolate Milk (24 x 200ml) (24 Units Per Carton)
                "
                description="RM35.80       /carton"
                imageUrl="https://www.borong.com/product-images/93672b64d496ef0d95d3610c302df6a3dc1983b6.jpeg"
            />
            <ProductItem
                title="Maggi Curry 5x79g Maggi Kari 5x79g"
                description="RM62.00       /carton"
                imageUrl="https://www.borong.com/product-images/0073ebfadc4ac659fc4ab734828574cbb273e1a0.jpeg"
            />
            <ProductItem
                title="Mi Sedaap Crispy Chicken 8 x 5s' x 88g
                "
                description="RM54.70       /carton"
                imageUrl="https://www.borong.com/product-images/a6e0960808757d7b8a1d71017a2a869e4a7de2f3.jpg"
            />
            <ProductItem
                title="Black Wild Rice 900g (12 Units Per Carton)
                "
                description="RM233.58       /carton"
                imageUrl="https://www.borong.com/product-images/3bbca44c3590b093171657279c0bf674ab6afa52.jpg"
            />
            <ProductItem
                title="Black Glutinous Rice Pulut Hitam 200g
                "
                description="RM5.40       /unit"
                imageUrl="https://www.borong.com/product-images/c016682cd3ee23daf8a49c9f25148571153ac1ca.jpg"
            />
            <ProductItem
                title="Multu Elbow Macaroni 500gm per pack (20 Units per carton)
                "
                description="RM84.00       /carton"
                imageUrl="https://www.borong.com/product-images/34d6e6540582513de02b4c61c131b64c659cabcd.jpeg"
            />
            
            </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default FoodBeverages;
