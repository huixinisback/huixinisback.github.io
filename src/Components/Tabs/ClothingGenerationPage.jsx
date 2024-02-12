import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLinks from "../Navbar/NavLinks"; // Adjust the import path as needed
import '../styles/ClothingGenerationPage.css';

function ClothingGenerationPage() {
  const [temperature, setTemperature] = useState('');
  const [attribute, setAttribute] = useState('');
  const [generated, setGenerated] = useState('');

  const navigate = useNavigate();

  const generateResult = () => {
    if (!temperature) {
      alert('Please fill in the temperature field!');
      return;
    }

    let attributeMessage = attribute ? ` (${attribute})` : '';

    if (temperature === 'hot') {
      setGenerated(`Since it is a hot day, A T-shirt and shorts is advisable. Look for clothes in your gallery with these attributes (Shirt) and${attributeMessage}!`);
    } else if (temperature === 'cold') {
      setGenerated(`Since it is a cold day, A Sweater or long sleeve paired with long pants is advisable. Look for clothes in your gallery with these attributes (Sweater) or (Long-Sleeve) and${attributeMessage}!`);
    } else {
      setGenerated("Please select a valid temperature.");
    }
  };

  return (
    <div className="page-container">
      <NavLinks />
      <h1 className="title">Outfit Generation</h1>
      <div className="form-container">
        <h2 className="form-title">Choose Temperature:</h2>
        <select className="select-input" value={temperature} onChange={(e) => setTemperature(e.target.value)}>
          <option value="">Select Temperature</option>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
      </div>
      <div className="form-container">
        <h2 className="form-title">Enter Attribute:</h2>
        <input className="text-input" type="text" placeholder="Enter Attribute" value={attribute} onChange={(e) => setAttribute(e.target.value)} />
      </div>
      <div className="form-container generated-container">
        <h2 className="form-title">Generated Combination:</h2>
        <p className="generated-output">{generated}</p>
        <button className="button" onClick={generateResult}>Generate</button>
      </div>
    </div>
  );
}

export default ClothingGenerationPage;
