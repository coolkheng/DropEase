import React from "react"
import ban1 from '../../Assets/banner-1.png'
import ban2 from '../../Assets/banner-2.png'

const Annocuments = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
  }
  const mystyle1 = {
    width: "68%",
    height: "340px",
  }
  return (
    <>
      <section className='annocument background'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='container d_flex'>
          <div className='img' style={mystyle}>
            <img src={ban1} width='100%' height='100%' />
          </div>
          <div className='img' style={mystyle1}>
            <img src={ban2} width='100%' height='100%' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Annocuments