// controllers/policyController.js
const Policy = require("../models/policy");
const express = require("express");
const router = express.Router();

const createPolicy = async (req, res) => {
  try {
    const { cropType, area, policyFor, location, premium } = req.body;

    // Create a new policy instance
    const newPolicy = new Policy({
      cropType,
      area,
      policyFor,
      location,
      premium,
    });

    // Save the policy to the database
    await newPolicy.save();

    // Send a success response
    res
      .status(201)
      .send({
        message: "Policy created successfully",
        policyId: newPolicy._id,
      });
  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).send({ error: "Server error: unable to create policy" });
  }
};

const getPolicyById = async (req, res) => {
  try {
    const policyId = req.params.policyId; // Use this correctly
    const policy = await Policy.findById(policyId); // This finds the policy by its MongoDB ObjectId

    if (!policy) {
      return res.status(404).send({ message: "Policy not found" });
    }

    res.status(200).send(policy);
  } catch (error) {
    console.error("Error fetching policy:", error);
    res.status(500).send({ error: "Server error: unable to fetch policy" });
  }
};

router.get("/:policyId", async (req, res) => {
  const { policyId } = req.params.policyId;
  try {
    const policy = await Policy.findOne({
      $or: [{ _id: policyId }, { policyId }],
    });
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json(policy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { createPolicy, getPolicyById, router };
