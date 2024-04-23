import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apple from '../../Assets/Apple-Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';


const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </button>
    </div>
  );
};

const TopStoreCard = ({ shopItems }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const placeholderShopItems = [
    {
      id: 1,
      name: "Shop 1",
      cover: apple,
    },
    {
      id: 2,
      name: "Shop 2",
      cover: apple,
    },
    {
        id: 3,
        name: "Shop 3",
        cover: apple,
      },
      {
        id: 4,
        name: "Shop 4",
        cover: apple,
      },
  ];

  return (
    <Slider {...settings}>
      {placeholderShopItems.map((shop) => (
        <div key={shop.id} className='box'>
          <div className='shop-container'>
            <div className='img-container'>
              <img className='shop-img' src={shop.cover} alt='' />
            </div>
            <p className='shop-name'>{shop.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopStoreCard;

