import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreatePolicyForm = () => {
  // State variables to manage form data
  const [cropType, setCropType] = useState("Rice");
  const [area, setArea] = useState("");
  const [policyFor, setPolicyFor] = useState("");
  const [location, setLocation] = useState("Cuttack");
  const [premium, setPremium] = useState(0);
  const [ethAddress, setEthAddress] = useState(""); // Ethereum address
  const [successMessage, setSuccessMessage] = useState("");

  // Get MetaMask address
  useEffect(() => {
    const getCurrentAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setEthAddress(accounts[0]);
      }
    };
    getCurrentAddress();
  }, []);

  // Function to handle MetaMask transaction
  const sendTransaction = async () => {
    const toAddress = "0x80c43A1535Faa7789906A10585dE98a0c2e43644";
    const amountInWei = "0x1"; // 0.00000000000001 Ether in Wei

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (area === "" || policyFor === "" || premium <= 0) {
      setSuccessMessage("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5132/api/policies/create", {
        cropType,
        area,
        policyFor,
        location,
        premium,
      });
      setSuccessMessage("Policy successfully submitted!");
      console.log(response.data);

      // Trigger MetaMask transaction after successful form submission
      await sendTransaction();
    } catch (error) {
      console.error("Failed to create policy:", error);
      setSuccessMessage("Failed to submit policy.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white font-sans"
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/1598235.jpg")', // Replace with your image path
      }}
    >
      <header className="bg-green-900 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl">Pinacle Hub</h1>
        <div className="flex gap-2">
          <Link to="/view">
            <button className="bg-white text-black px-4 py-2 rounded">
              View Policies
            </button>
          </Link>
          <Link to="/insurence">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Claim Insurance
            </button>
          </Link>
        </div>
      </header>
     
      <div className="w-full max-w-4xl p-8 mx-auto mb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-transparent text-black p-8 rounded-lg shadow-lg backdrop-blur-md"
        >
          <h2 className="text-2xl mb-4">Create New Policy</h2>
          <p className="mb-4">Connected Wallet: <strong>{ethAddress}</strong></p>
          <div className="mb-4">
            <label className="block">Crop Type</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full p-2 border border-gray-400 bg-white/30 backdrop-blur rounded text-black"
            >
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Barley">Barley</option>
              <option value="Cotton">Cotton</option>
              <option value="Soybean">Soybean</option>
              <option value="Groundnut">Groundnut</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Potato">Potato</option>
              <option value="Onion">Onion</option>
              <option value="Tomato">Tomato</option>
              <option value="Chickpeas">Chickpeas</option>
              <option value="Sunflower">Sunflower</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Jute">Jute</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Area (in Acres):</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="in Acres"
              className="w-full p-2 border border-gray-400 bg-white/30 backdrop-blur rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block">Policy For:</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="policyFor"
                  value="Flood"
                  checked={policyFor === "Flood"}
                  onChange={(e) => setPolicyFor(e.target.value)}
                  className="mr-2"
                />
                Flood
              </label>
              <label>
                <input
                  type="radio"
                  name="policyFor"
                  value="Drought"
                  checked={policyFor === "Drought"}
                  onChange={(e) => setPolicyFor(e.target.value)}
                  className="mr-2"
                />
                Drought
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block">Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-400 bg-white/30 backdrop-blur rounded text-black"
            >
              <option value="Cuttack">Cuttack</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Puri">Puri</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Indore">Indore</option>
              <option value="Surat">Surat</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Insurance Amount</label>
            <input
              type="number"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              className="w-full p-2 border border-gray-400 bg-white/30 backdrop-blur rounded text-black"
            />
          </div>
           {successMessage && (
          <p
            className={`mt-4 p-4 rounded ${
              successMessage.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
            }`}
          >
            {successMessage}
          </p>
        )}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Policy
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default CreatePolicyForm;