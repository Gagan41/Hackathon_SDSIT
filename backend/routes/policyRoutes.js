const express = require("express");
const { createPolicy, getPolicyById } = require("../controllers/policyController");
const router = express.Router();

// POST route to create a new policy
router.post("/create", createPolicy);

// GET route to fetch a policy by ID
router.get("/:policyId", getPolicyById);

module.exports = router;
