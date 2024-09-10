import { useState } from "react";
import './App.css';

const App = () => {
  const [ qrValue, setQrValue] = useState('');
  const [ preValue, setPreValue] = useState('');
  const [ showQrCode, setShowQrCode] = useState(false);

 const handleInputChange = (event) => {
  setQrValue(event.target.value.trim());
  if(!event.target.value.trim()){
    setShowQrCode(false);
    setPreValue('');
  }
 };

 const handleGenerateClick = () => {
  if(!qrValue ||preValue === qrValue)return;
  setPreValue(qrValue)
  setShowQrCode(false)

  const img = new Image();
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue};`
  img.onload = () => {
    setShowQrCode(true)
  };
 };
  
 return (
  <div className={`container ${showQrCode ? 'active' : ''}`}>
      <header>
        <h1>QR Code Generator</h1>
        <p>Paste a url or enter a text to create QR Code.</p>
      </header>

      <div className="form">
        <input 
        type="text"
        placeholder='Enter a text or a url'
        value={qrValue}
        onChange={handleInputChange} />
        <button onClick={handleGenerateClick}> Generate QR Code</button>
      </div>

      {showQrCode && (
        <div className="qr-code">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue};`}  alt="qr-code"/>
         </div> 
      )}
  </div>
 )
}

export default App;