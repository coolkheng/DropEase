import React from "react";
import ProductCard from "./ProductCard";

const Productss = () => {
  const productsData = [
    {
      id: 1,
      img: "/Products/heelsMain.jpg",
      title: "Miu Miu High Heels",
      desc: "Red High Heels",
      rating: 4,
      price: "899.00",
      images: ["/Products/heels1.jpg","/Products/heels2.jpg","/Products/heels3.jpg","/Products/heels4.jpg"], 
      mainImage: "/Products/heelsMain.jpg",
      sizes: ["34", "35","36", "37","38","39"],
      color:["Red", "Black","Gold"]
    },
    {
      id: 2,
      img: "/Products/dressMain.jpg",
      title: "Aella Bardot Ruffle Dress",
      desc: "Dress - Black",
      longDesc:"The ultimate little black dress. The Aella dress features a bardot bodycon mini fit with a tiered ruffle skirt in a stretchy jersey material. ",
      rating: 5,
      price: "345.00",
      images: ["/Products/dress1.jpg","/Products/dress2.jpg","/Products/dress3.jpg"],
      mainImage: "/Products/dressMain.jpg",
      sizes: ["S", "M", "L","XL"]
    },
    {
      id: 3,
      img: "/Products/hatMain.jpg",
      title: "Bucket Hat",
      desc: "Hat - Women",
      longDesc:"",
      rating: 3,
      price: "345.00",
      images: ["/Products/hat1.jpg","/Products/HatMain.jpg"],
      mainImage: "/Products/hatMain.jpg",
      color:["Butterfly","Cherry"]
    },
    {
      id: 4,
      img: "/Products/dressMain.jpg",
      title: "Aella Bardot Ruffle Dress",
      desc: "Dress - Black",
      longDesc:"The ultimate little black dress. The Aella dress features a bardot bodycon mini fit with a tiered ruffle skirt in a stretchy jersey material. ",
      rating: 5,
      price: "345.00",
      images: ["/Products/dress1.jpg","/Products/dress2.jpg","/Products/dress3.jpg"],
      mainImage: "/Products/dressMain.jpg",
      sizes: ["S", "M", "L","XL"]
    },
    {
      id:5,
      img: ["/Products/watchMain.jpg"],
      title: "Breda Watch - Jane",
      desc: "Women Watch",
      longDesc:"Inspired by days spent in the sun by the water and followed by evenings of indulgence.",
      rating: 5,
      price: "75.00",
      images: ["/Products/watchMain.jpg","/Products/watch1.jpg","/Products/watch2.jpg","/Products/watch3.jpg"],
      mainImage:"/Products/watchMain.jpg",
      sizes: ""
    },
    {
      id: 6,
      img: "/Products/dressMain.jpg",
      title: "Aella Bardot Ruffle Dress",
      desc: "Dress - Black",
      longDesc:"The ultimate little black dress. The Aella dress features a bardot bodycon mini fit with a tiered ruffle skirt in a stretchy jersey material. ",
      rating: 5,
      price: "345.00",
      images: ["/Products/dress1.jpg","/Products/dress2.jpg","/Products/dress3.jpg"],
      mainImage: "/Products/dressMain.jpg",
      sizes: ["S", "M", "L","XL"]
    },
  ];

  return (
    <div>
      <div className="ml-5 pt-5"></div>
      <div className="mx-auto w-[90%] container pt-1">
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-5 gap-10 xl:gap-x-20 xl:gap-y-10">
          {productsData.map((item, index) => (
            <ProductCard
            key={index}
            img={item.img}
            title={item.title}
            desc={item.desc}
            longDesc={item.longDesc}
            rating={item.rating}
            price={item.price}
            product={item}
            color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productss;
