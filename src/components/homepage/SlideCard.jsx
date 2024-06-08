import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideCard = () => {
  const navigate = useNavigate();
  const Id = useParams();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul className="custom-dots">{dots}</ul>;
    },
  };

  const handleNavigation = (index) => {
    if (index === 0) {
      navigate(`/apparel/${Id.customerId}`);
    } else if (index === 1) {
      navigate(`/sports/${Id.customerId}`);
    } else if (index === 2) {
      navigate(`/electronics/${Id.customerId}`);
    }
  };

  return (
    <Slider {...settings} className="slider-container">
      {Sdata.map((value, index) => {
        // Generate a unique class name for each slide based on its index
        const gradientClass = `gradient-${index + 1}`;

        return (
          <div className={`slide-item ${gradientClass}`} key={index}>
            <div className="banner-container">
              <div className="detail">
                <h3>{value.desc1}</h3>
                <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>
                  {value.title}
                </h1>
                <h3>{value.desc2}</h3>
                <h5>{value.available}</h5>
                <button
                  className="btn-primary"
                  onClick={() => handleNavigation(index)}
                >
                  Shop Now
                </button>
              </div>
              <div className="img-box">
                <img src={value.cover} alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default SlideCard;
