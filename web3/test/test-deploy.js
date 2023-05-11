//test-deploy
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
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
        const _aadhar = "6214290200";
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        const user = await HardhatUser.getUser(_aadhar);

        expect(user.name === _name);
        expect(user.dob === _dob);
        expect(user.noOfElections === 0);
    });

    it("Should Log User in with correct Credentials", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        // Create User first
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "62142902007";
        const _password1 = bcryptjs.hash('testing', 5);
        const _password2 = bcryptjs.hash('tester', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password1);
        const loggedIn = await HardhatUser.checkCredentials(_aadhar, _password1);
        const notLoggedIn = await HardhatUser.checkCredentials(_aadhar, _password2)
        expect(loggedIn == true);
        expect(notLoggedIn == false);
    })

    it("Should Not Create Accounts with same Aadhar", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["62142902078"];
        const _password = bcryptjs.hash('testing', 5);
        // create a User with the above Parameters
        await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], _password);
        // check for requires failing
        await expect(HardhatUser.createUser(_name[1], _dob[1], _aadhar[0], _password)).to.be.revertedWith("Aadhars cannot be used again");
    });

    it("Cannot Fetch Accounts with Wrong Credentials", async function() {
        const { HardhatUser, user1, user2 } = await loadFixture(deployUserFixture);
        const _name = ["Raj Aryan", "Raturi"];
        const _dob = ["18 June 2002", "19 Dec 2001"];
        const _aadhar = ["62129020078"];
        const _password = bcryptjs.hash('testing', 5);
        // create a User with the above Parameters
        await HardhatUser.createUser(_name[0], _dob[0], _aadhar[0], _password);
        await expect(HardhatUser.getUser("false number")).to.be.revertedWith("Invalid user");
    });

    it("Should not Start Election with Wrong Credentials", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "62149020078";
        const _image_url = "https://www.google.com";
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
    
        await expect(HardhatUser.createElection(_image_url, "Wrong Aadhar", _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000) + 3600, _password)).to.be.revertedWith("Invalid user");
        await expect(HardhatUser.createElection(_image_url, _aadhar, _name, Math.floor(new Date().getTime()/1000), Math.floor(new Date().getTime()/1000), _password)).to.be.revertedWith("Start Date should be before End Date");
    });

    it("Should create Elections", async function() {
        const { HardhatUser, user1 } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "62142900078";
        const _image_url = "https://www.google.com";
        const _password = bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);

        const createdElection = await HardhatUser.createElection(_image_url, _aadhar, _name, Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);
        const election = await HardhatUser.getElections(_aadhar);
        
        expect(election.length === 1);
        expect(election[0].name === _name);
        expect(createdElection.value.toNumber === election[0].id.toNumber());
    });

    it("Can Start Voting", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = await bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        await HardhatUser.createElection(_image_url, _aadhar, "GE", Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);
        await expect(HardhatUser.startVoting(1000, _aadhar, _password)).to.be.revertedWith("Invalid Election ID");
        await HardhatUser.startVoting(0, _aadhar, _password);
        // force an error with starting again
        await expect(HardhatUser.startVoting(0, _aadhar, _password)).to.be.revertedWith("Wrong phase");
        await expect(HardhatUser.startVoting(0, _aadhar, "12")).to.be.revertedWith("User not authenticated");
    });

    it("Can End Voting", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = await bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        await HardhatUser.createElection(_image_url, _aadhar, "GE", Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);
        await expect(HardhatUser.endVoting(1, _aadhar, _password)).to.be.revertedWith("Invalid Election ID");
        await expect(HardhatUser.endVoting(0, _aadhar, _password)).to.be.revertedWith("Wrong phase");
        await HardhatUser.startVoting(0, _aadhar, _password);
        await HardhatUser.endVoting(0, _aadhar, _password);
        await expect(HardhatUser.endVoting(0, _aadhar, "123")).to.be.revertedWith("User not authenticated");
    });

    it("Can Add Candidates", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = await bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        await HardhatUser.createElection(_image_url, _aadhar, "GE", Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);

        await HardhatUser.addCandidates("Raj Aryan", 0, "BJP", _image_url, _image_url, _aadhar, _password);
        await HardhatUser.startVoting(0, _aadhar, _password);
        await expect(HardhatUser.addCandidates("Aayush", 0, "BJP", _image_url, _image_url, _aadhar, _password)).to.be.revertedWith("Wrong phase");
        await expect(HardhatUser.getCandidates(5, _aadhar)).to.be.revertedWith("Invalid Election ID");
        const candidates = await HardhatUser.getCandidates(0, _aadhar);

        expect(candidates[0].name === "Raj Aryan");
    });

    it("Can Cast Votes", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = await bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        await HardhatUser.createElection(_image_url, _aadhar, "GE", Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);

        await HardhatUser.addCandidates("Raj Aryan", 0, "BJP", _image_url, _image_url, _aadhar, _password);
        await HardhatUser.addCandidates("Aayush", 0, "BJP", _image_url, _image_url, _aadhar, _password);
        await expect(HardhatUser.doVote(0, 5, _aadhar, _password)).to.be.revertedWith("Wrong phase");
        await HardhatUser.startVoting(0, _aadhar, _password);
        await expect(HardhatUser.doVote(0, 5, _aadhar, _password)).to.be.revertedWith("Invalid Candidate ID");
       
        const votes = await HardhatUser.doVote(0, 0, _aadhar, _password);

        expect(votes.length === 2);

        await expect(HardhatUser.doVote(0, 0, _aadhar, _password)).to.be.revertedWith("Voter has already voted");
    });

    it("Shows End Results", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = "Raj Aryan";
        const _dob = "18 June 2002";
        const _aadhar = "621429020078";
        const _image_url = "https://www.google.com";
        const _password = await bcryptjs.hash('testing', 5);
        // creates new User with the above Parameters
        await HardhatUser.createUser(_name, _dob, _aadhar, _password);
        await HardhatUser.createElection(_image_url, _aadhar, "GE", Math.floor(new Date().getTime()/1000) + 100000, Math.floor(new Date().getTime()/1000) + 103600, _password);

        await HardhatUser.addCandidates("Raj Aryan", 0, "NJP", _image_url, _image_url, _aadhar, _password);
        await HardhatUser.addCandidates("Aayush", 0, "BJP", _image_url, _image_url, _aadhar, _password);

        await HardhatUser.startVoting(0, _aadhar, _password);
        await HardhatUser.createUser(_name, _dob, _aadhar[0], _password);
        await HardhatUser.createUser(_name, _dob, _aadhar[1], _password);
        await HardhatUser.createUser(_name, _dob, _aadhar[2], _password);
        await HardhatUser.doVote(0, 0, _aadhar[0], _password);
        await HardhatUser.doVote(0, 0, _aadhar[1], _password);
        await HardhatUser.doVote(0, 0, _aadhar[2], _password);

        await expect(HardhatUser.getElectionResults(0)).to.be.revertedWith("Wrong phase");
        await HardhatUser.endVoting(0, _aadhar, _password);
        const result = await HardhatUser.getElectionResults(0);
        let max = 0;
        for(let i=1;i<result[0].length;i++) {
            if(result[1][max] < result[1][i]) max = i;
        }
        expect(result[1][max] === 3);
        expect(result[0][max].name === "Raj Aryan");
    });

    it("Can Return Election given it's ID", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _nam = "Raj Aryan";
        const _dob = "18 June 2002";

        const _name = ["Generale Elections", "GE"];
        const _image_url = "https://www.google.com";
        const _aadhar = [ "621429020078", "621429020077", "621429020079" ];
        const _start_date = Math.floor(new Date().getTime()/1000);
        const _end_date = Math.floor(new Date().getTime()/1000) + 3600;  
        const _password = bcryptjs.hash('testing', 5);
        await HardhatUser.createUser(_nam, _dob, _aadhar[0], _password);
        await HardhatUser.createElection(_image_url, _aadhar[0], _name[0], _start_date+100000, _end_date+100000, _password);
        await HardhatUser.createElection(_image_url, _aadhar[0], _name[1], _start_date+100000, _end_date+100000, _password);
        const election1 = await HardhatUser.getElectionById(0);
        const election2 = await HardhatUser.getElectionById(1);
        expect(election1.name == _name[0]);
        expect(election2.name == _name[1]);
    });

    it("Get Phases of all Elections", async function() {
        const { HardhatUser } = await loadFixture(deployUserFixture);
        const _name = ["Generale Elections", "GE"];
        const _image_url = "https://www.google.com";
        const _start_date = Math.floor(new Date().getTime()/1000);
        const _end_date = Math.floor(new Date().getTime()/1000) + 3600;
        const _aadhar = [ "621429020078", "621429020077", "621429020079" ];
        const _password = bcryptjs.hash('testing', 5); 
        await HardhatUser.createUser("Rahul", "18 June 2002", _aadhar[0], _password);
        await HardhatUser.createElection(_image_url, _aadhar[0], _name[0], _start_date+100000, _end_date+100000, _password);
        await HardhatUser.createElection(_image_url, _aadhar[0], _name[1], _start_date+100000, _end_date+100000, _password);
        let all_phases = await HardhatUser.getPhase();
        expect(all_phases.length == 0);
        expect(all_phases[0] == 0 && all_phases[1] == 0);

        await HardhatUser.startVoting(0, _aadhar[0], _password);
        all_phases = await HardhatUser.getPhase();
        expect(all_phases[0] == 1 && all_phases[1] == 0);

        await HardhatUser.endVoting(0, _aadhar[0], _password);
        all_phases = await HardhatUser.getPhase();
        expect(all_phases[0] == 2 && all_phases[1] == 0);
    });
});