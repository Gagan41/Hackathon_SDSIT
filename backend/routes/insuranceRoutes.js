// insuranceRoutes.js
const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const authMiddleware = require('../middlewares/authMiddleware');
const validatePolicyData = require('../middlewares/policyValidator');

router.post('/purchase', authMiddleware, (req, res, next) => {
  const validation = validatePolicyData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  next();
}, insuranceController.purchasePolicy);

router.post('/create', authMiddleware, (req, res, next) => {
  const validation = validatePolicyData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  next();
}, insuranceController.createPolicy);

router.post('/claim', authMiddleware, insuranceController.claimInsurance);
router.get('/view/:policyId', authMiddleware, insuranceController.getPolicy);

module.exports = router;
