import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faIdCard, faShield, faHeadset } from "@fortawesome/free-solid-svg-icons";
import "../../Style/Wrapper.css";

const Wrapper = () => {
  const data = [
    {
      cover: faTruckFast,
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: faIdCard,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: faShield,
      title: "Shop With Confidence",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: faHeadset,
      title: "24/7 Support",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ];

  return (
    <>
      <section style={{justifyContent:'center'}} className='box'>
        <div className='container grid2'>
          {data.map((val, index) => (
            <div className='product' key={index}>
              <div className='img icon-circle'>
                <FontAwesomeIcon icon={val.cover} />
              </div>
              <h3>{val.title}</h3>
              <p>{val.decs}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
