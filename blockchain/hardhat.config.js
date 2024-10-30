require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/256ab74d45c54eeba2305af8133a2cb1",
      accounts: [`0x3d443d143adee4b707930137d4086e3ccca84c5342a063f86213f279620b1827`],
      timeout: 100000 
    },
  },
};
