import React, { useState, useEffect } from "react";

const api = {
  key: "0ab503e7fcf946b3adbcb11967fe2887",
  base: "https://api.openweathermap.org/data/2.5/",
};

const ClaimInsurance = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [amount] = useState("0.00000000000001");

  useEffect(() => {
    const getCurrentAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setEthAddress(accounts[0]);
      } else {
        alert("Please install MetaMask to connect your wallet.");
      }
    };
    getCurrentAddress();
  }, []);

  const searchPressed = () => {
    if (!search) {
      setError("Please enter a city name.");
      return;
    }

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
        setError("");

        // Automatically trigger claim for flood or drought conditions
        const temp = result.main.temp;
        const weatherCondition = result.weather[0].main.toLowerCase();

        if (
          (temp < 20 && weatherCondition.toLowerCase() === "rain") ||
          (temp > 40 && weatherCondition.toLowerCase() === "clear")
        ) {
          handleClaim();
        }
      })
      .catch((err) => {
        setError(err.message);
        setWeather({});
      });
  };

  const handleClaim = async () => {
    if (!ethAddress || !policyId) {
      alert("Please fill in all fields.");
      return;
    }

    const claimAmount = (parseFloat(amount) * Math.pow(10, 18)).toString();
    const toAddress = "0x80c43A1535Faa7789906A10585dE98a0c2e43644";

    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            to: toAddress,
            from: ethAddress,
            value: claimAmount,
            gas: "0x5208",
          },
        ],
      });
      alert("Claim submitted successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Claim submission failed. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: 'url("http://wallpapercave.com/wp/wp1886349.jpg")',
      }}
    >
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-green-900">
        <h1 className="text-4xl font-bold text-white">Pinacle Hub</h1>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center w-full pt-24 md:gap-12 gap-6">
        {/* Weather Section */}
        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg w-80 text-center">
          <h2 className="text-2xl mb-4">Weather Information</h2>

          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mt-1 mb-3 rounded bg-transparent border border-gray-300 text-white"
          />

          <label className="block text-left mt-4">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mt-1 mb-3 rounded bg-transparent border border-gray-300"
          />

          <button
            onClick={searchPressed}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:opacity-90 w-full mb-4"
          >
            Search Weather
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          {typeof weather.main !== "undefined" && (
            <div className="mt-4">
              <p className="text-lg font-semibold">{weather.name}</p>
              <p className="text-sm">Weather on: {date || "Current Date"}</p>
              <p className="text-2xl font-bold">{weather.main.temp}°C</p>
              <p>{weather.weather[0].main}</p>
              <p className="text-sm">({weather.weather[0].description})</p>
            </div>
          )}
        </div>

        {/* Claim Insurance Section */}
        <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg w-80 text-center">
          <h2 className="text-2xl mb-4">Claim Insurance</h2>

          <label className="block text-left">
            Current Metamask ETH Address:
          </label>
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
