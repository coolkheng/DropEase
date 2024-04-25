import React, { useState } from 'react';
import "../style/PaymentPage.css";
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import DropdownMenu from '../components/UsernameDropDown';
import ProductItem from '../components/ProductItem';
import Products from './Products';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform payment processing logic here
    console.log('Payment processed successfully!');
  };

  return (
    <div className='PaymentPage'>
      <Header>
        <DropdownMenu 
        /> 
      </Header>
      <SideNav />
        <section>
          <div className='container'>
      <div className='item1'>
      <h2>Order Summary</h2>
      <div className='firstProduct'>
        <div className='firstItem'>
          <img src='https://www.borong.com/product-images/597c759b557c3f32f391cafe26974b370b90d8d0.jpeg' className='firstImage'/>  
        </div>
        <div className='firstName'>
        <h5>12 X 550ml Spritzer Mineral Water (12 in 1)</h5>
        <p>RM11.92</p>
        </div>

      </div>
      <div className="firstProduct">
        <div className='firstItem'>
          <img src='https://www.borong.com/product-images/23d16be6e85287f3d94f0a12b6b85a043a0faf91.jpg' className='firstImage'/>
        </div>
          <div className='firstName'>
           <h5>IK Yellow A4 Paper 70Gsm (500 sheets reams)</h5>
            <p>RM13.00</p>
        </div>
      </div>

      <div className="firstProduct">
        <div className='firstItem'>
          <img src='https://www.borong.com/product-images/23d16be6e85287f3d94f0a12b6b85a043a0faf91.jpg' className='firstImage'/>
        </div>
          <div className='firstName'>
           <h5>IK Yellow A4 Paper 70Gsm (500 sheets reams)</h5>
            <p>RM13.00</p>
        </div>
      </div>
      <div>
        <h3>Product Total:</h3>
      </div>
      <p className='price'>RM120</p>
      
      </div>
     
      </div>
      </section>
    <div className='payment-content'>
    <div className="payment-container">
      <h2>Item Payment</h2>
      <div className="payment-form">
        <div className="payment-method">
          <h3>Select Payment Method:</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => handlePaymentMethodChange('creditCard')}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="E-wallet"
                checked={paymentMethod === 'E-wallet'}
                onChange={() => handlePaymentMethodChange('E-wallet')}
              />
              E-wallet
            </label>
          </div>
        </div>
        {paymentMethod === 'creditCard' && (
          <form onSubmit={handleSubmit}>
            <div className="card-details">
              <h3>Enter Card Details:</h3>
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="form-group">
                <label>Card Holder:</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="form-group">
                <label>Expiry Date:</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="form-group">
                <label>CVV:</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                />
              </div>
            </div>
            <button type="submit">Pay Now</button>
          </form>
        )}
        {paymentMethod === 'E-wallet' && (
          <div className="paypal-payment">
            <p>Please proceed to E-wallet to complete your payment.</p>
            <button onClick={handleSubmit}>Proceed to E-wallet</button>
          </div>
        )}
      </div>
    </div>
   
    </div>
    <footer className='footer'>
        <p>&copy; 2024 My App</p>
      </footer>
   
    </div>
  );
};

export default PaymentPage;
