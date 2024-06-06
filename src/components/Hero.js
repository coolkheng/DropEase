import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const Hero = ({ storeId }) => { // Accept storeId as a prop
  const [slideData, setSlideData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      if (!storeId) return; // Exit if storeId is not yet available

      try {
        const response = await fetch(`http://localhost:4000/retailerBanner?storeId=${storeId}`);
        if (response.ok) {
          const banners = await response.json();
          setSlideData(banners);
        } else {
          console.error("Failed to fetch banners");
          setErrorMessage("Failed to fetch banners");
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
        setErrorMessage("Error fetching banners");
      }
    };

    fetchBanners();
  }, [storeId]); // Fetch banners whenever the store ID changes

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  if (errorMessage) return <div>{errorMessage}</div>;

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
