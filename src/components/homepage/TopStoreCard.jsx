import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </button>
    </div>
  );
};

const TopStoreCard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:4000/allstore');
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Failed to fetch stores:', response.status, errorMessage);
          throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        setStores(data);
        console.log(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Slider {...settings}>
      {stores.map((store) => (
        <div key={store.storeId} className="box">
          <div className="shop-container">
            <div className="img-container">
              <img className="shop-img" src={store.imageUrl} alt={store.store} />
            </div>
            <p className="shop-name">{store.store}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopStoreCard;
