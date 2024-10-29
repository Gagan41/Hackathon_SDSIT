import React, { useState } from 'react';

const ClaimInsurance = () => {
  const [date, setDate] = useState('');
  const [ethAddress, setEthAddress] = useState('0x2c06633B8684Eb7E23642015d7Dd0a8');
  const [policyId, setPolicyId] = useState(0);

  const handleClaim = () => {
    // Logic for claiming insurance goes here
    alert('Claim submitted');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: 'url("http://wallpapercave.com/wp/wp1886349.jpg")' }}
    >
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-green-900">
        <h1 className="text-4xl font-bold text-white">Pinacle Hub</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          CLAIM INSURANCE
        </button>
      </header>

      <div className="flex flex-col items-center justify-center w-full pt-24">
        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg w-80 text-center">
          <h2 className="text-2xl mb-4">Claim Insurance</h2>

          <label className="block text-left">Date of Flood/Drought:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mt-1 mb-3 rounded bg-transparent border border-gray-300"
          />

          <label className="block text-left">Current Metamask ETH Address:</label>
          <input
            type="text"
            value={ethAddress}
            readOnly
            className="w-full p-2 mt-1 mb-3 rounded bg-transparent border border-gray-300"
          />

          <label className="block text-left">Your Policy:</label>
          <input
            type="number"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="w-full p-2 mt-1 mb-3 rounded bg-transparent border border-gray-300"
          />

          <button
            onClick={handleClaim}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            CLAIM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimInsurance;