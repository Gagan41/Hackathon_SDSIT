const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const authMiddleware = require('../middlewares/authMiddleware');
const validatePolicyData = require('../middlewares/policyValidator');
const { createPolicy: createPolicyInPolicyController } = require('../controllers/policyController'); // Renaming to avoid confusion

// Purchase Policy Route
router.post('/purchase', authMiddleware, (req, res, next) => {
  const validation = validatePolicyData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  next();
}, insuranceController.purchasePolicy);

// Create Policy Route
router.post('/create', authMiddleware, (req, res, next) => {
  const validation = validatePolicyData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  next();
}, insuranceController.createPolicy);

// Claim Insurance Route
router.post('/claim', authMiddleware, insuranceController.claimInsurance);

// View Policy Route
router.get('/view/:policyId', authMiddleware, insuranceController.getPolicy);

// Create Policy Route
router.post('/policies', authMiddleware, (req, res, next) => {
  const validation = validatePolicyData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  next();
}, createPolicyInPolicyController); // Use the correct createPolicy function

module.exports = router;
