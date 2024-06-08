import React, { useState, useEffect } from "react";
import "../style/Home(Customer).css";
import { NavLink } from "react-router-dom";
import FooterCustomer from "../components/Footer(Customer)";
import HeaderCustomer from "../components/Header(Customer)";
import SliderHome from "../components/homepage/SliderHome";
import FlashDeals from "../components/homepage/TopStore";
import TopCate from "../components/homepage/TopCate";
import Annocuments from "../components/homepage/Announcements";
import Wrapper from "../components/homepage/Wrapper";
import { useParams } from "react-router-dom";

const Home = () => {
  let userId = useParams();
  console.log(userId.customerId);
  return (
    <div className="Home">
      <>
        <section className="home">
          <HeaderCustomer customer={userId} />
          <div className="container d_flex">
            <SliderHome />
            <FlashDeals />
            <TopCate />
            <Wrapper />
          </div>
        </section>
      </>
      <FooterCustomer />
    </div>
  );
};

export default Home;
