/** @type import('hardhat/config').HardhatUserConfig */
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
