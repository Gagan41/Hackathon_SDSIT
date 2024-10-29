import React, { useState } from "react";

const CreatePolicyForm = () => {
  // State variables to manage form data
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState("");
  const [policyFor, setPolicyFor] = useState("");
  const [location, setLocation] = useState("Cuttack");
  const [premium, setPremium] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      cropType,
      area,
      policyFor,
      location,
      premium,
    });
  };

  return (
    <div className="font-sans min-h-screen bg-cover bg-center"
         style={{
           backgroundImage: 'url("https://wallpapercave.com/wp/wp1886383.jpg")', // Replace with your image path
         }}
    >
      <div className="flex justify-between items-center p-4 bg-green-900 bg-opacity-70">
        <h1 className="text-white text-2xl">Pinacle Hub</h1>
        <div className="flex gap-2">
          <button className="bg-white text-green-900 px-4 py-2 rounded">
            View Policies
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Claim Insurance
          </button>
        </div>
      </div>
      <form
        className="bg-transparent bg-opacity-80 p-10 rounded-lg shadow-lg mx-4 mt-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Create New Policy</h2>
        <div className="mb-4">
          <label className="block">Crop Type:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="cropType"
                value="Rabi"
                checked={cropType === "Rabi"}
                onChange={(e) => setCropType(e.target.value)}
              />
              Rabi
            </label>
            <label>
              <input
                type="radio"
                name="cropType"
                value="Kharif"
                checked={cropType === "Kharif"}
                onChange={(e) => setCropType(e.target.value)}
              />
              Kharif
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block">Area (in Acres):</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="in Acres"
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Cuttack">Cuttack</option>
            <option value="Bhubaneswar">Bhubaneswar</option>
            <option value="Puri">Puri</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Premium to Pay (in ETH):</label>
          <input
            type="number"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Policy
        </button>
      </form>
    </div>
  );
};

export default CreatePolicyForm;