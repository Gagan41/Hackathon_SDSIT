const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const PolicyContract = await ethers.getContractFactory("PolicyContract");

  // Deploy the contract with a higher gas limit
  const gasLimit = 94232; // Set this to the minimum needed from the error
  const policyContract = await PolicyContract.deploy({ gasLimit });
  console.log(policyContract);

  // Output the contract address
  console.log("PolicyContract deployed to:", policyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
