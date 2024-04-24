import React from 'react';
import Header from "../components/Header"; // Check if the path is correct
import SideNavSupplier from '../components/SideNavSupplier';
import SideNav from '../components/SideNav';
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Products.css";
import ProductItem from '../components/ProductItem';
import DropdownMenu from '../components/UsernameDropDown'; // Check if the path is correct

function Suppliers() {
  return (
    <div className="Suppliers">
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
        <ProductItem
                title="12 X 550ml Spritzer Mineral Water (12 in 1)"
                description="RM11.92       /carton"
                imageUrl="https://www.borong.com/product-images/597c759b557c3f32f391cafe26974b370b90d8d0.jpeg"
            />
            <ProductItem
                title="Milo Original Can 240ml x 24
                "
                description="RM62.87       /carton"
                imageUrl="https://www.borong.com/product-images/ff972ce50069ec21d9dfa96aa858705652741fea.jpg"
            />
            <ProductItem
                title="Stainless Steel Whistling Tea Kettle Tea set Tea Pot Stovetop Anti-hot Handle and Loud Whistle 3L with 4pcs stainless steel Mugs"
                description="RM59.00  /unit"
                imageUrl="https://www.borong.com/product-images/65bc3f474b36ca9d2f379d4cc118b80799adc51e.jpg"
            />
            <ProductItem
                title="(MR.DIY) Microfiber Multi-Colour Square Towels (5pcs)

                "
                description="RM67.72       /carton"
                imageUrl="https://www.borong.com/product-images/939a3f9ca2957db40b416e146f7271966764195b.jpg"
            />
            <ProductItem
                title="HIGHPOWER Aluminium Foil Tape HP1466 (48mm x 30m)
                "
                description="RM540.00       /carton"
                imageUrl="https://www.borong.com/product-images/29034fc2d9298acb5d3663c3c101099a64e03ec9.jpg"
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
             <ProductItem
                title="Labour Apple Dishwashing Liquid 900ml
                "
                description="RM4.80       /unit"
                imageUrl="https://www.borong.com/product-images/d880d11aac82e755f855d1c095a2ed7569ae14ca.jpg"
            />
            <ProductItem
                title="Softlan SPRING FRESH 3 litre Softener"
                description="RM19.10       /unit"
                imageUrl="https://www.borong.com/product-images/7d4182e446059ecb94222808a1f5985a930dc74f.jpg"
            />
            <ProductItem
                title="Sunlight Extra GENTLE GRAPEFRUIT & ROSE HIP Dishwashing 1000ml
                "
                description="RM8.20      /unit"
                imageUrl="https://www.borong.com/product-images/b0b4393595b14c6a59607d61096c9b3cb9547102.jpeg"
            />
              <ProductItem
                title="UVEX SPORTSTYLE GREY EYEWEAR 9193280 (GREY)"
                description="RM44.00       /unit"
                imageUrl="https://www.borong.com/product-images/1681e608453f576e2705889f95166a28f53fdcfa.jpg"
            />
            <ProductItem
                title="Indoor Basketball Shooting Machine - (Automatic Scoring) Single Player Classic Version
                "
                description="RM757.44       /unit"
                imageUrl="https://www.borong.com/product-images/d368727109a04f25e775c8fb86aa77132394c427.jpg"
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

export default Suppliers;
