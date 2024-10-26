const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InsurancePolicy", function () {
  let insurancePolicy;
  let owner;
  let addr1;

  beforeEach(async function () {
    const InsurancePolicy = await ethers.getContractFactory("InsurancePolicy");
    insurancePolicy = await InsurancePolicy.deploy();
    await insurancePolicy.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  it("should create and retrieve a policy", async function () {
    await insurancePolicy.createPolicy("Wheat", 1000);
    const policy = await insurancePolicy.policies(0);
    
    expect(policy.crop).to.equal("Wheat");
    expect(policy.amount).to.equal(1000);
    expect(policy.active).to.equal(true);
  });

  it("should trigger payout with condition met", async function () {
    await insurancePolicy.createPolicy("Wheat", 1000);
    
    // Trigger payout with the condition as true
    await insurancePolicy.triggerPayoutWithCondition(0, true);

    const policy = await insurancePolicy.policies(0);
    expect(policy.active).to.equal(false);
  });

  it("should not trigger payout when condition is not met", async function () {
    await insurancePolicy.createPolicy("Wheat", 1000);
    
    // Attempt to trigger payout with the condition as false
    await insurancePolicy.triggerPayoutWithCondition(0, false);

    const policy = await insurancePolicy.policies(0);
    expect(policy.active).to.equal(true);
  });
});
