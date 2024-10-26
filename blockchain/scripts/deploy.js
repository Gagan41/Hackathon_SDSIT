// scripts/deploy.js
async function main() {
  // Load the InsurancePolicy contract and deploy it
  const InsurancePolicy = await ethers.getContractFactory("InsurancePolicy");
  console.log("Deploying the InsurancePolicy contract...");

  const insurancePolicy = await InsurancePolicy.deploy();
  console.log("Deployment response:", insurancePolicy); // Log the response

  // Check if deployment was successful
  if (!insurancePolicy || !insurancePolicy.address) {
    console.error("Deployment failed: insurancePolicy object is not valid.");
    return;
  }

  console.log("Waiting for deployment...");
  await insurancePolicy.deployed();

  console.log("InsurancePolicy deployed to:", insurancePolicy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
