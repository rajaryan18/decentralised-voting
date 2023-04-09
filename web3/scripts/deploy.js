//deploy script

// Deployed to:  0x36Ad3CeA12bC28E0a7fd1EB2D1C6eB3b0dcE0cae

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