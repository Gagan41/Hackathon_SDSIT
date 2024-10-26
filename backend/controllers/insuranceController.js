const InsurancePolicy = require('../models/insurancePolicy');
const blockchainService = require('../services/blockchainService');

// Existing purchasePolicy function remains the same

exports.createPolicy = async (req, res) => {
  const { cropType, area, policyFor, location, premium } = req.body;
  try {
    const newPolicy = new InsurancePolicy({
      user: req.user.id, // Assuming a logged-in user
      crop: cropType,
      coverageAmount: premium,
      location,
      type: policyFor,
      area,
    });
    await newPolicy.save();
    const transactionHash = await blockchainService.registerPolicy(newPolicy);
    res.json({ message: 'Policy created successfully', transactionHash });
  } catch (error) {
    res.status(500).json({ error: 'Error creating policy' });
  }
};

exports.claimInsurance = async (req, res) => {
  const { date, policyId } = req.body;
  try {
    const policy = await InsurancePolicy.findById(policyId);
    if (!policy) return res.status(404).json({ error: 'Policy not found' });

    policy.status = 'claimed';
    policy.claimDate = date;
    await policy.save();

    res.json({ message: 'Claim submitted successfully', policy });
  } catch (error) {
    res.status(500).json({ error: 'Error claiming insurance' });
  }
};

exports.getPolicy = async (req, res) => {
  const { policyId } = req.params;
  try {
    const policy = await InsurancePolicy.findById(policyId);
    if (!policy) return res.status(404).json({ error: 'Policy not found' });

    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching policy details' });
  }
};
