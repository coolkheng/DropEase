import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import SideNavSupplier from "../../components/SideNavSupplier";
import "../../style/Header.css";
import "../../style/SideNav.css";
import "../../style/Products.css";
import SupplierProductItem from "../../components/SupplierProductItem";
import DropdownMenu from "../../components/UsernameDropDown"; // Check if the path is correct
import { Link } from "react-router-dom";

function FoodBeverages() {
  // Handling different size of screen
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
      {!isSmallScreen && (
        <aside className="w-full md:w-[20%]">
          <SideNavSupplier />
        </aside>
      )}

      {isSmallScreen && (
        <div className="fixed-top-bar">
          <TopBar />
        </div>
      )}

      <main
        className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
      >
        <div className="FoodBeverages">
          <Header>
            <DropdownMenu />
          </Header>

          <div className="product-main-content">
            <div className="productpage-title">
              <h1></h1>
            </div>
            <div className="product-content">
              <div className="product-list">
                <Link
                  to="/paymentpage"
                  style={{
                    textDecoration: "none",
                    textDecorationColor: "none",
                  }}
                >
                  <SupplierProductItem
                    title="12 X 550ml Spritzer Mineral Water (12 in 1)"
                    description="RM11.92       /carton"
                    imageUrl="https://www.borong.com/product-images/597c759b557c3f32f391cafe26974b370b90d8d0.jpeg"
                  />
                </Link>
                <SupplierProductItem
                  title="Milo Original Can 240ml x 24
                "
                  description="RM62.87       /carton"
                  imageUrl="https://www.borong.com/product-images/ff972ce50069ec21d9dfa96aa858705652741fea.jpg"
                />
                <SupplierProductItem
                  title="DUTCH LADY UHT Chocolate Milk (24 x 200ml) (24 Units Per Carton)
                "
                  description="RM35.80       /carton"
                  imageUrl="https://www.borong.com/product-images/93672b64d496ef0d95d3610c302df6a3dc1983b6.jpeg"
                />
                <SupplierProductItem
                  title="Maggi Curry 5x79g Maggi Kari 5x79g"
                  description="RM62.00       /carton"
                  imageUrl="https://www.borong.com/product-images/0073ebfadc4ac659fc4ab734828574cbb273e1a0.jpeg"
                />
                <SupplierProductItem
                  title="Mi Sedaap Crispy Chicken 8 x 5s' x 88g
                "
                  description="RM54.70       /carton"
                  imageUrl="https://www.borong.com/product-images/a6e0960808757d7b8a1d71017a2a869e4a7de2f3.jpg"
                />
                <SupplierProductItem
                  title="Black Wild Rice 900g (12 Units Per Carton)
                "
                  description="RM233.58       /carton"
                  imageUrl="https://www.borong.com/product-images/3bbca44c3590b093171657279c0bf674ab6afa52.jpg"
                />
                <SupplierProductItem
                  title="Black Glutinous Rice Pulut Hitam 200g
                "
                  description="RM5.40       /unit"
                  imageUrl="https://www.borong.com/product-images/c016682cd3ee23daf8a49c9f25148571153ac1ca.jpg"
                />
                <SupplierProductItem
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
      </main>
    </div>
  );
}

export default FoodBeverages;
