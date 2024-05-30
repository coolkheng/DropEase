import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = () => {
  const [slideData, setSlideData] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:4000/retailerBanner"); // Assuming this route fetches banners from MongoDB
        if (response.ok) {
          const banners = await response.json();
          setSlideData(banners);
        } else {
          console.error("Failed to fetch banners");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  return (
    <div className="w-[80%] max-height-[100px]">
      <Slider {...settings}>
        {slideData.map((item) => (
          <Slide key={item._id} img={`/banners/${item.filename}`} />
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
