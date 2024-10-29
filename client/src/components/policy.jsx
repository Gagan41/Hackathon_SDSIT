import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreatePolicyForm = () => {
  // State variables to manage form data
  const [cropType, setCropType] = useState("Rice");
  const [area, setArea] = useState("");
  const [policyFor, setPolicyFor] = useState("");
  const [location, setLocation] = useState("Cuttack");
  const [premium, setPremium] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", { cropType, area, policyFor, location, premium });
    if (area === "" || policyFor === "" || premium <= 0) {
      setSuccessMessage("Please fill in all fields correctly.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5132/api/policies/create",
        {
          cropType,
          area,
          policyFor,
          location,
          premium,
        }
      );
      console.log(response.data);
      setSuccessMessage("Policy successfully submitted!"); // Set success message
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to create policy:", error);
      setSuccessMessage("Failed to submit policy.");
    }
  };

  return (
    <div
      className="font-sans min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp1886383.jpg")', // Replace with your image path
      }}
    >
      <div className="flex justify-between items-center p-4 bg-green-900 bg-opacity-70">
        <h1 className="text-white text-2xl">Pinacle Hub</h1>
        <div className="flex gap-2">
          <Link to="/view">
            <button className="bg-white text-green-900 px-4 py-2 rounded">
              View Policies
            </button>
          </Link>
          <Link to="/insurence">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Claim Insurance
            </button>
          </Link>
        </div>
      </div>
      <form
        className="bg-transparent bg-opacity-80 p-10 rounded-lg shadow-lg mx-4 mt-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Create New Policy</h2>
        <div className="mb-4">
          <label className="block">Crop Type</label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Select below"
            className="w-full p-2 border border-gray-300 rounded"
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
            placeholder="Select below"
            className="w-full p-2 border border-gray-300 rounded"
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
    </div>
  );
};

export default CreatePolicyForm;
