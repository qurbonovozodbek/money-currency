import React, { useState, useEffect } from 'react';
import { IoIosSwap } from "react-icons/io";
import Header from './components/Header';
import data from './data/data.json';
import "./App.css";
const App: React.FC = () => {
  console.log(data);
  
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currencies] = useState<string[]>(['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'KRW', 'SGD', 'NOK', 'MXN', 'INR']);


  useEffect(() => {
    setLoading(true);
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[toCurrency];
        setConvertedAmount(rate ? amount * rate : null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      });
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const clearValues = () => {
    setAmount(0);
    setConvertedAmount(null);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div>
      <Header/>
      <div className="container">
      <div className="position">
    <div className='wrapper'>

    <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>

      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
       {currencies.map(currency => (
       <option key={currency} value={currency}>{currency}</option>
       ))}
</select>
      </div>

      <div>
      <button onClick={swapCurrencies} className='swap-button'><IoIosSwap /></button>
      </div>

      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
        {currencies.map(currency => (
    <option key={currency} value={currency}>{currency}</option>
  ))}
        </select>
      </div>
      
    </div>
      <div>
        <button onClick={clearValues} className='clear-btn'>Clear</button>
      </div>
      <div className='Amount'>
        {loading ? (
          <p>Converting...</p>
        ) : (
          <div>
         <span className='amount-res'>{amount} {fromCurrency} =</span><h2 style={{opacity:"0.6"}}>{convertedAmount != null ? convertedAmount.toFixed(2) +" "+ toCurrency : 0}</h2>

          </div>
        )}
      </div>
   </div>
      </div>
    </div>
  );
};

export default App;
