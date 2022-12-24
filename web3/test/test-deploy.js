//test-deploy
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("User Contract", function() {
    // fixture to use for User.sol contract
    async function deployUserFixture() {
        const User = await ethers.getContractFactory("UserInfo");
        // get 3 users to use later
        const [ user1, user2, user3 ] = await ethers.getSigners();

        // deploy the User contract
        const HardhatUser = await User.deploy();
        await HardhatUser.deployed();
        // return fixtures to use in tests
        return { User, HardhatUser, user1, user2, user3 };
    }

    it("Should create new User", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address);
        const userId = createdUser.value.toNumber();
        const user = await HardhatUser.getUser(userId, _aadhar, user1.address);

        expect(user.name === _name);
        expect(user.dob === _dob);
        expect(user.noOfElections === 0);
    });

    it("Should Not Create Accounts with same Aadhar", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["621429020078"];
        // create a User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], user1.address);
        
        // check for requires failing
        await expect(HardhatUser.createUser(_name[1], _dob[1], _aadhar[0], user2.address)).to.be.revertedWith("Aadhars cannot be used again");
    });

    it("Cannot Fetch Accounts with Wrong Credentials", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["621429020078"];
        // create a User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], user1.address);
        await expect(HardhatUser.getUser(0, "false number", user1.address)).to.be.revertedWith("Wrong aadhar number");
        await expect(HardhatUser.getUser(0, _aadhar[0], user2.address)).to.be.revertedWith("Wrong metamask address");
        await expect(HardhatUser.getUser(1, _aadhar[0], user1.address)).to.be.revertedWith("Invalid userID");
    });

    it("Should not Start Election with Wrong Credentials", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address);
        const userId = createdUser.value.toNumber();

        await expect(HardhatUser.createElection(2, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600)).to.be.revertedWith("Invalid userID");
        await expect(HardhatUser.createElection(userId, "Wrong Aadhar", _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600)).to.be.revertedWith("Wrong aadhar number");
        await expect(HardhatUser.createElection(userId, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000))).to.be.revertedWith("Start Date should be before End Date");
    });

    it("Should create Elections", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address);
        const userId = createdUser.value.toNumber();

        const createdElection = await HardhatUser.createElection(userId, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600);
        const election = await HardhatUser.getElections(userId);
        
        expect(election.length === 1);
        expect(createdElection.value.toNumber === election[0].toNumber());
    });
});

// describe("EletionInfo Contract", function() {
//     describe()
// });