"use client";

import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const slideData = [
    {
      id: 0,
      img: "/Banners/banner-1.jpg",
    },
    {
      id: 1,
      img: "/Banners/banner-2.jpg",
    },
    {
      id: 2,
      img: "/Banners/banner-3.jpg",
    },
  ];
  return (
    <div className="mt-2 w-[80%] max-height-[100px] container pt-6 lg:pt-0">
      <Slider {...settings}>
        {slideData.map((item) => (
          <Slide key={item.id} img={item.img} />
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
