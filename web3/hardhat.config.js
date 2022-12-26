/** @type import('hardhat/config').HardhatUserConfig */
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-chai-matchers");

const ALCHEMY_API_KEY = "H3s3yj_XRFzXqvqt8vxzxinZyC4d30nX";
const GOERLI_PRIVATE_KEY = "92262f3915078dc99bb6a4b7ddebdd624b4691a70de901c9e3c6f2fbe0d5fd26";

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
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
