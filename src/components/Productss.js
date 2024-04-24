import React from "react";
import ProductCard from "./ProductCard";

const Productss = () => {
  const productsData = [
    {
      img: "/Products/heels.jpeg",
      title: "Heels",
      desc: "Light pink heels",
      rating: 4,
      price: "45.00",
    },
    {
      img: "/Products/Long skirt.jpg",
      title: "Long Skirt",
      desc: "Long Skirt - Olive",
      rating: 5,
      price: "35.00",
    },
    {
      img: "/Products/Men's dress shirts.jpg",
      title: "Shirts",
      desc: "Men's Dress Shirts - Formal",
      rating: 4,
      price: "55.00",
    },
    {
      img: "/Products/Shoes.jpeg",
      title: "Shoes",
      desc: "White Shoes",
      rating: 3,
      price: "38.00",
    },
    {
      img: "/Products/watches.jpeg",
      title: "Watch",
      desc: "Women Watch",
      rating: 5,
      price: "75.00",
    },
    {
      img: "/Products/whiteShirt.jpg",
      title: "Shirt",
      desc: "White Shirt - Cotton",
      rating: 4,
      price: "25.00",
    },
  ];

  return (
    <div>
        <div className="ml-5 pt-16">
      <h2 className="font-medium text-2xl pb-4">Products</h2>
    </div>
      <div className="mx-auto w-[90%] container pt-1">
        <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-5 gap-10 xl:gap-x-20 xl:gap-y-10">
  {productsData.map((item, index) => (
    <ProductCard
      key={index}
      img={item.img}
      title={item.title}
      desc={item.desc}
      rating={item.rating}
      price={item.price}
    />
  ))}
</div>

      </div>
    </div>
  );
};

export default Productss;
