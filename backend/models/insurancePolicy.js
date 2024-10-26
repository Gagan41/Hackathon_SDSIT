const mongoose = require('mongoose');

const insurancePolicySchema = new mongoose.Schema({
  user: String,
  crop: String,
  coverageAmount: Number,
  location: String,
  status: { type: String, default: 'active' },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  payoutAmount: Number,
  type: String,  // Policy type (e.g., 'Flood', 'Drought')
  area: Number,  // Area in acres
  claimDate: Date, // Date of claim
});

module.exports = mongoose.model('InsurancePolicy', insurancePolicySchema);
