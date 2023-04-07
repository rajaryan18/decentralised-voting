//deploy script

// Deployed to:  0xAc308bDAb57c0c94Db9637DD5D04189ae30D9977

const { ethers, upgrades } = require('hardhat');

async function deployUser() {
    const User = await ethers.getContractFactory("UserInfo");
    const user = await upgrades.deployProxy(User);
    user.deployed();
    console.log("User Deployed to: ", user.address);
}

async function deployElection() {
    const Election = await ethers.getContractFactory("ElectionInfo");
    const electon = await upgrades.deployProxy(Election);
    electon.deployed();
    console.log("Election Deployed to: ", electon.address);
}

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address);
    // deployElection();
    deployUser();
}

main();