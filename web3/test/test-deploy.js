//test-deploy
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { createHmac } = require('crypto');
const bcryptjs = require('bcryptjs');

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
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address, _password);
        const userId = createdUser.value.toNumber();
        const user = await HardhatUser.getUser(userId, _aadhar, user1.address);

        expect(user.name === _name);
        expect(user.dob === _dob);
        expect(user.noOfElections === 0);
    });

    it("Should Log User in with correct Credentials", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        // Create User first
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _password1 = bcryptjs.hash('testing', 5);
        const _password2 = bcryptjs.hash('tester', 5);
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address, _password1);
        const userId = createdUser.value.toNumber();
        const loggedIn = await HardhatUser.checkCredentials(userId, _password1);
        const notLoggedIn = await HardhatUser.checkCredentials(userId, _password2)
        expect(loggedIn == true);
        expect(notLoggedIn == false);
    })

    it("Should Not Create Accounts with same Aadhar", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["621429020078"];
        const _password = bcryptjs.hash('testing', 5);
        // create a User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], user1.address, _password);
        
        // check for requires failing
        await expect(HardhatUser.createUser(_name[1], _dob[1], _aadhar[0], user2.address, _password)).to.be.revertedWith("Aadhars cannot be used again");
    });

    it("Cannot Fetch Accounts with Wrong Credentials", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["621429020078"];
        const _password = bcryptjs.hash('testing', 5);
        // create a User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], user1.address, _password);
        await expect(HardhatUser.getUser(0, "false number", user1.address)).to.be.revertedWith("Wrong aadhar number");
        await expect(HardhatUser.getUser(0, _aadhar[0], user2.address)).to.be.revertedWith("Wrong metamask address");
        await expect(HardhatUser.getUser(1, _aadhar[0], user1.address)).to.be.revertedWith("Invalid userID");
    });

    it("Should not Start Election with Wrong Credentials", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address, _password);
        const userId = createdUser.value.toNumber();

        await expect(HardhatUser.createElection(2, _image_url, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600)).to.be.revertedWith("Invalid userID");
        await expect(HardhatUser.createElection(userId, _image_url, "Wrong Aadhar", _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600)).to.be.revertedWith("Wrong aadhar number");
        await expect(HardhatUser.createElection(userId, _image_url, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000))).to.be.revertedWith("Start Date should be before End Date");
    });

    it("Should create Elections", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        const createdUser = await HardhatUser.createUser(_name, _dob, _aadhar, user1.address, _password);
        const userId = createdUser.value.toNumber();

        const createdElection = await HardhatUser.createElection(userId, _image_url, _aadhar, _name, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);
        const election = await HardhatUser.getElections(userId);
        
        expect(election.length === 1);
        expect(createdElection.value.toNumber === election[0].toNumber());
    });
});

describe("Election Contract", function() {
    async function deployElectionFixture() {
        const Election = await ethers.getContractFactory("ElectionInfo");

        // deploy the election contract
        const HardhatElection = await Election.deploy();
        await HardhatElection.deployed();
        // return fixtures to use in tests
        return { Election, HardhatElection };
    }

    it("Create Elections", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _name = "Generale Elections";
        const _image_url = "https://www.google.com";
        const _start_date = Math.floor(new Date().getTime()/1000);
        const _end_date = Math.floor(new Date().getTime()/1000) + 3600;
        // checks all the requirements
        await expect(HardhatElection.init(_name,_image_url, _start_date-100000, _end_date)).to.be.revertedWith("The start date should be date in future");
        await expect(HardhatElection.init(_name, _image_url, _start_date+100000, _start_date+100000)).to.be.revertedWith("The end date should be ahead of the start date");
        // check if electon has been created
        const election = await HardhatElection.init(_name, _image_url, _start_date+100000, _end_date+100000);
        const eid = election.value.toNumber();

        expect(eid === 1);
    });

    it("Can Start Voting", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _image_url = "https://www.google.com";
        await HardhatElection.init("Raj Aryan", _image_url, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);
        await expect(HardhatElection.startVoting(1)).to.be.revertedWith("Invalid Election ID");
        await HardhatElection.startVoting(0);
        // force an error with starting again
        await expect(HardhatElection.startVoting(0)).to.be.revertedWith("Wrong phase");
    });

    it("Can End Voting", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _image_url = "https://www.google.com";
        await HardhatElection.init("Raj Aryan", _image_url, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);
        await expect(HardhatElection.endVoting(1)).to.be.revertedWith("Invalid Election ID");
        await expect(HardhatElection.endVoting(0)).to.be.revertedWith("Wrong phase");
        await HardhatElection.startVoting(0);
        await HardhatElection.endVoting(0);
    });

    it("Can Add Candidates", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _image_url = "https://www.google.com";
        await HardhatElection.init("Raj Aryan", _image_url, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);

        await HardhatElection.addCandidates("Raj Aryan", 0, "BJP", _image_url, _image_url);
        await HardhatElection.startVoting(0);
        await expect(HardhatElection.addCandidates("Aayush", 0, "BJP", _image_url, _image_url)).to.be.revertedWith("Wrong phase");
        await expect(HardhatElection.getCandidates(5)).to.be.revertedWith("Invalid Election ID");
        const candidates = await HardhatElection.getCandidates(0);

        expect(candidates[0].name === "Raj Aryan");
    });

    it("Can Cast Votes", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _image_url = "https://www.google.com";
        await HardhatElection.init("Raj Aryan", _image_url, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);

        const _aadhar = [ "621429020078", "621429020077", "621429020079" ];
        await HardhatElection.addCandidates("Raj Aryan", 0, "BJP", _image_url, _image_url);
        await HardhatElection.addCandidates("Aayush", 0, "BJP", _image_url, _image_url);
        await expect(HardhatElection.doVote(0, 5, _aadhar[0])).to.be.revertedWith("Wrong phase");
        await HardhatElection.startVoting(0);
        await expect(HardhatElection.doVote(0, 5, _aadhar[0])).to.be.revertedWith("Invalid Candidate ID");
       
        const votes = await HardhatElection.doVote(0, 0, _aadhar[0]);

        expect(votes.length === 2);

        await expect(HardhatElection.doVote(0, 0, _aadhar[0])).to.be.revertedWith("Voter has already voted");
    });

    it("Shows End Results", async function() {
        const { HardhatElection } = await loadFixture(deployElectionFixture);
        const _image_url = "https://www.google.com";
        await HardhatElection.init("Raj Aryan", _image_url, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600);

        const _aadhar = [ "621429020078", "621429020077", "621429020079" ];
        await HardhatElection.addCandidates("Raj Aryan", 0, "NJP", _image_url, _image_url);
        await HardhatElection.addCandidates("Aayush", 0, "BJP", _image_url, _image_url);

        await HardhatElection.startVoting(0);
        await HardhatElection.doVote(0, 0, _aadhar[0]);
        await HardhatElection.doVote(0, 0, _aadhar[1]);
        await HardhatElection.doVote(0, 0, _aadhar[2]);

        await expect(HardhatElection.getElectionResults(0)).to.be.revertedWith("Wrong phase");
        await HardhatElection.endVoting(0);
        const result = await HardhatElection.getElectionResults(0);
        let max = 0;
        for(let i=1;i<result[0].length;i++) {
            if(result[1][max] < result[1][i]) max = i;
        }
        expect(result[1][max] === 3);
        expect(result[0][max].name === "Raj Aryan");
    });
});