import React from "react"
import TopStoreCard from "./TopStoreCard"
import "../../Style/TopStore.css"

const TopStore = ({placeholderShopItems}) => {
  return (
    <div className="flsh-container">
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <h2>Top Stores</h2>
          </div>
          <TopStoreCard placeholderShopItems={placeholderShopItems} />
        </div>
      </section>
    </div>
  )
}

export default TopStore