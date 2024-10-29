import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const View = () => {
  const [policyId, setPolicyId] = useState("");
  const [policy, setPolicy] = useState(null);
  const [error, setError] = useState(null); // State to hold any error messages

  const handleViewPolicy = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5132/api/policies/${policyId}`
      );
      console.log(response.data);
      setPolicy(response.data); // Set the fetched policy data to state
      setError(null); // Reset error if fetch is successful
    } catch (error) {
      console.error("Error fetching policy:", error);
      setPolicy(null); // Clear the policy if there’s an error
      setError("Policy not found. Please enter a valid Policy ID."); // Set error message
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'url("https://tse1.mm.bing.net/th?id=OIP.WjOUxz1BGFCzb0cqi23eAAHaEo&pid=Api&P=0&h=180")',
      }}
    >
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-green-900">
        <h1 className="text-3xl font-bold text-white">Pinacle Hub</h1>
        <Link to="/insurence">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            CLAIM INSURANCE
          </button>
        </Link>
      </header>
      <div className="text-center mb-5">
        <h2 className="text-2xl mb-4 text-black">View your Policies</h2>
        <input
          type="text"
          value={policyId}
          onChange={(e) => setPolicyId(e.target.value)}
          placeholder="Enter Policy ID"
          className="p-2 rounded border border-gray-300 mb-4 text-black" // Sets input text color to black
        />
        <button
          onClick={handleViewPolicy}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          VIEW
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message if exists */}
      {policy && (
        <div className="mt-5 bg-white bg-opacity-80 p-5 rounded-lg shadow-lg">
          <table className="min-w-full text-black">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">User Address</th>
                <th className="px-4 py-2">Insurance Amount</th>
                <th className="px-4 py-2">Area</th>
                <th className="px-4 py-2">Crop</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Created On</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">{policy.location || "N/A"}</td>
                <td className="px-4 py-2">{policy.premium || "N/A"}</td>
                <td className="px-4 py-2">{policy.area}</td>
                <td className="px-4 py-2">{policy.cropType || "N/A"}</td>
                <td className="px-4 py-2">{policy.policyFor || "N/A"}</td>
                <td className="px-4 py-2">{policy.createdAt || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default View;
