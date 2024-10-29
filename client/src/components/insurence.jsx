import React, { useState, useEffect } from 'react';

const ClaimInsurance = () => {
  const [date, setDate] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [policyId, setPolicyId] = useState('');
  const [amount] = useState('0.00000000000001'); // Default amount to send

  useEffect(() => {
    const getCurrentAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setEthAddress(accounts[0]);
      }
    };

    getCurrentAddress();
  }, []);

  const handleClaim = async () => {
    if (!ethAddress || !policyId) {
      alert('Please fill in all fields.');
      return;
    }

    const claimAmount = (parseFloat(amount) * Math.pow(10, 18)).toString(); // Convert to Wei
    const toAddress = '0x80c43A1535Faa7789906A10585dE98a0c2e43644';

    // Trigger MetaMask to send the transaction
    try {
      const transactionParameters = {
        to: toAddress,
        from: ethAddress,
        value: claimAmount, // Amount in Wei
        gas: '0x5208', // 21000 GWEI
      };

      // Send transaction via MetaMask
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      alert('Claim submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Claim submission failed. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: 'url("http://wallpapercave.com/wp/wp1886349.jpg")' }}
    >
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-green-900">
        <h1 className="text-4xl font-bold text-white">Pinacle Hub</h1>
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

          <label className="block text-left">Your Policy ID:</label>
          <input
            type="text"
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
