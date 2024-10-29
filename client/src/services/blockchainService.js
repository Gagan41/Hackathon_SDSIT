import { ethers } from "ethers";

// Helper function to initialize provider, called only when needed
function getProvider() {
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    throw new Error("MetaMask not installed");
  }
  return new ethers.providers.Web3Provider(window.ethereum);
}

// Request account access from MetaMask
export const requestAccount = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask is required. Please install MetaMask and refresh.");
      return;
    }
    const provider = getProvider(); // Initialize provider
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return provider; // Return the provider for further usage
  } catch (error) {
    console.error("Error requesting MetaMask account:", error);
  }
};

// Send Ether transaction
export const sendEther = async (recipientAddress, amount) => {
  try {
    const provider = getProvider(); // Always get provider here
    const signer = provider.getSigner();
    const transaction = {
      to: recipientAddress,
      value: ethers.utils.parseEther(amount.toString()),
    };

    const txResponse = await signer.sendTransaction(transaction);
    console.log("Transaction hash:", txResponse.hash);

    // Wait for transaction to be mined
    const receipt = await txResponse.wait();
    console.log("Transaction was mined successfully:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error sending Ether transaction:", error);
    throw error; // Re-throw error so it can be handled in calling code
  }
};
