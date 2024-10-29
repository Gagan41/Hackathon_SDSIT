// models/policy.js
const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  cropType: { type: String, required: true },
  area: { type: Number, required: true },
  policyFor: { type: String, required: true },
  location: { type: String, required: true },
  premium: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Policy", policySchema);
