
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'; // Import the Home component
import CropInsuranceSystem from './components/insurence';
import Policy from './components/policy';
import View from './components/view'; 
import Insurence from './components/insurence';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />
        
        {/* Crop Insurance System main page */}
        <Route path="/insurance-system" element={<CropInsuranceSystem />} />
        
        {/* Create Policy page */}
        <Route path="/policy" element={<Policy />} />
        <Route path="/view" element={<View />} /> 
        <Route path="/insurence" element={<Insurence />} />

      </Routes>
    </Router>
  );
}

export default App;
