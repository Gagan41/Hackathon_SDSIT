import React, { useState } from 'react';

const view = () => {
  const [policyId, setPolicyId] = useState('');
  const [policy, setPolicy] = useState(null);

  const handleViewPolicy = () => {
    // Logic to fetch and display policy details
    setPolicy({
      userAddress: '0x2f646753f3E563A0e131f940FBf2647F5aeB7c',
      area: 500,
      crop: 'Kharif',
      type: 'Flood',
      validTill: '01 June, 2023'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white" 
         style={{ backgroundImage: 'url("https://tse2.mm.bing.net/th?id=OIP.RweGm3vyeJkr0-LLrJY-7AHaE8&pid=Api&P=0&h=180")' }} // Use your actual image path
    >
      <header className="flex justify-between w-4/5 mb-5">
        <h1 className="text-3xl font-bold">STEROIDS</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          CLAIM INSURANCE
        </button>
      </header>

      <div className="text-center mb-5">
        <h2 className="text-2xl mb-4">View your Policies</h2>
        <input
          type="text"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          placeholder="Enter Policy ID"
          className="p-2 rounded border border-gray-300 mb-4"
        />
        <button onClick={handleViewPolicy} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          VIEW
        </button>
      </div>

      {policy && (
        <div className="mt-5 bg- bg-opacity-80 p-5 rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">User Address</th>
                <th className="px-4 py-2">Area</th>
                <th className="px-4 py-2">Crop</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Valid Till</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">{policy.userAddress}</td>
                <td className="px-4 py-2">{policy.area}</td>
                <td className="px-4 py-2">{policy.crop}</td>
                <td className="px-4 py-2">{policy.type}</td>
                <td className="px-4 py-2">{policy.validTill}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default view;
