import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CropInsuranceSystem = () => {
  const [ethAddress, setEthAddress] = useState(""); // State for Ethereum address

  // Function to handle MetaMask transaction
  const sendTransaction = async () => {
    const toAddress = "0x80c43A1535Faa7789906A10585dE98a0c2e43644";
    const amountInWei = "0x1"; // 0.00000000000001 Ether in Wei

    if (!ethAddress) {
      alert("Ethereum address is not available. Please connect to MetaMask.");
      return;
    }

    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ethAddress,
            to: toAddress,
            value: amountInWei,
            gas: "0x5208", // 21000 GWEI
          },
        ],
      });
      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Failed to submit transaction.");
    }
  };

  // Request user's Ethereum account
  useEffect(() => {
    const getCurrentAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setEthAddress(accounts[0]);
      }
    };
    getCurrentAddress();
  }, []);

  return (
    <div className="text-center font-sans">
      {/* Header Section */}
      <header className="bg-green-900 py-2 flex justify-between items-center px-4">
        <h1 className="text-white text-2xl">Pinacle Hub</h1>

        <Link to="https://metamask.io/">
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded hover:opacity-90">
            Create Wallet
          </button>
        </Link>
      </header>

      {/* Main Background Section */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp9212011.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl mb-8">
            Blockchain Based Crop Insurance System
          </h2>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mb-8">
            <Link to="/policy">
              <button className="px-6 py-3 text-lg bg-yellow-400 text-black hover:opacity-90 rounded">
                Go to Create Policy
              </button>
            </Link>
            <Link to="/view">
              <button className="px-6 py-3 text-lg bg-white text-black hover:opacity-90 rounded">
                View Policy
              </button>
            </Link>
            <Link to="/insurence">
              <button className="px-6 py-3 text-lg bg-yellow-400 text-black hover:opacity-90 rounded">
                Claim Insurance
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInsuranceSystem;