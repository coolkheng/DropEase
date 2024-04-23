import React,{useState} from 'react';
import '../Style/Home.css';
import { NavLink } from 'react-router-dom';
import SliderHome from '../Components/HomePage/SliderHome';
import FlashDeals from '../Components/HomePage/TopStore'
import TopCate from '../Components/HomePage/TopCate';
import Annocuments from '../Components/HomePage/Announcements';
import Wrapper from '../Components/HomePage/Wrapper';
const Home = () => {


  return (
    <div className='Home'>
        <>
      <section className='home'>
        <div className='container d_flex'>
            <SliderHome/>
            <FlashDeals/>
            <TopCate/>
            <Annocuments/>
            <Wrapper/>
        </div>
      </section>
    </>
        
    </div>
  );
};

export default Home;
