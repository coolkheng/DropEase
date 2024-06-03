import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faIdCard,
  faShield,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/Wrapper.css";

const Wrapper = () => {
  const data = [
    {
      cover: faTruckFast,
      title: "Worldwide Delivery",
      decs: "We provide worldwide delivery for your convenience.",
    },
    {
      cover: faIdCard,
      title: "Safe Payment",
      decs: "We ensure secure payment options for your peace of mind.",
    },
    {
      cover: faShield,
      title: "Shop With Confidence",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: faStore,
      title: "Unified Shopping Hub",
      decs: "A single platform offering diverse stores, each with a unique range of products.",
    },
  ];

  return (
    <>
      <section style={{ marginTop: "80px",justifyContent: "center" }} className="box">
        <div className="container grid2">
          {data.map((val, index) => (
            <div className="product" key={index}>
              <div className="img icon-circle">
                <FontAwesomeIcon icon={val.cover} />
              </div>
              <h3 style={{fontWeight:"bold",marginTop:"20px"}}>{val.title}</h3>
              <p>{val.decs}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
