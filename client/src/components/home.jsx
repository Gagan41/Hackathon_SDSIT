import React from "react";
import { Link } from 'react-router-dom';

const CropInsuranceSystem = () => {
  return (
    <div className="text-center font-sans">
      <header className="bg-green-900 py-2 flex justify-between items-center px-4">
        <h1 className="text-white text-2xl">Pinacle Hub</h1>
        
        <Link to="https://metamask.io/">
          <button className="px-4 py-2 bg-yellow-400 text-black text-sm rounded hover:opacity-90">
            Create Wallet
          </button>
        </Link>
      </header>

      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("https://wallpapercave.com/wp/wp9212011.jpg")' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl mb-8">Blockchain Based Crop Insurance System</h2>
          
          <div className="flex gap-4">
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