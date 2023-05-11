//deploy script

// Deployed to: 0xf5A37A95F9BBB7F02dAB15a1A322454cfD7b7777

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