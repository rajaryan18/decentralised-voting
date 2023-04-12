//deploy script

// Deployed to: 0x2787f801Da8805256e97C1b53e6a35Eba31719e6

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