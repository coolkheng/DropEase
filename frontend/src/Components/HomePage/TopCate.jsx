import React from "react";
import "../../Style/TopCat.css";
import TopCat from "./TopCat";

const TopCate = () => {
  return (
    <>
      <section className='TopCate background'>
        <div className='container'>
          <div className='heading d_flex'>
            <div style={{margin:'auto'}} className='heading-left row  f_flex'>
              <h2 style={{ textAlign: 'center' }}>Top Categories</h2>
            </div>
          </div>
          <TopCat />
        </div>
      </section>
    </>
  );
};

export default TopCate;
