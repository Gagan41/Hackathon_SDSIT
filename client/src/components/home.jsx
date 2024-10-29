import React, { useState } from "react";
import { Link } from 'react-router-dom';

const api = {
  key: "0ab503e7fcf946b3adbcb11967fe2887",
  base: "https://api.openweathermap.org/data/2.5/",
};

const CropInsuranceSystem = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  // Function to handle search and fetch weather data
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
        setError(""); // Clear any previous error
      })
      .catch((err) => {
        setError(err.message);
        setWeather({}); // Clear weather on error
      });
  };

  return (
    <div className="text-center font-sans">
      {/* Header Section */}
      <header className="bg-green-900 py-2 flex justify-between items-center px-4">
        <h1 className="text-white text-2xl">STEROIDS</h1>
        
        <Link to="https://metamask.io/">
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded hover:opacity-90">
            Create Wallet
          </button>
        </Link>
      </header>

      {/* Main Background Section */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp9212011.jpg")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl mb-8">Blockchain Based Crop Insurance System</h2>
          
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

          {/* Weather Display */}
          <div className="mt-4 p-6 bg-gray-800 bg-opacity-80 rounded-lg text-center w-80">
            <h3 className="text-xl mb-4">Weather Information</h3>
            <input
              type="text"
              placeholder="Enter city/town..."
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 w-full rounded mb-4 text-black"
            />
            <button
              onClick={searchPressed}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:opacity-90 w-full"
            >
              Search
            </button>

            {/* Display Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Display Weather Information if available */}
            {typeof weather.main !== "undefined" ? (
              <div className="mt-4">
                <p className="text-lg font-semibold">{weather.name}</p>
                <p className="text-2xl font-bold">{weather.main.temp}°C</p>
                <p>{weather.weather[0].main}</p>
                <p className="text-sm">({weather.weather[0].description})</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropInsuranceSystem;