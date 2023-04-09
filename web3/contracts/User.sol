// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Election.sol";

contract UserInfo is ElectionInfo {
    struct User {
        uint256 userId;
        string name;
        string dob;
        bytes32 aadharHash;
        bytes32 metamaskHash;
        uint256 noOfElections;
        uint256[] elections; //will store the election ids of elections started by this particular user.
    }

    mapping(bytes32 => User) private Users;
    mapping(bytes32 => string) private login;

    uint256 public noOfUsers;

    // function hashAadhar(string memory _aadhar) private pure returns (bytes32) {
    //     return keccak256(abi.encodePacked(_aadhar));
    // }

    function initializer() public {
        noOfUsers = 1;
        numberOfElections = 0;
    }

    function hashMetamask(address _addr) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_addr));
    }

    //createuser creates a user and returns its id in User array;
    function createUser(
        string memory _name,
        string memory _dob,
        string memory _aadhar,
        address _addr,
        string memory password
    ) public returns (bytes32) {
        // Aadhar Numbers can be used for one account only
        // for(uint256 i=0;i<noOfUsers;i++) require(Users[i].aadharHash != keccak256(abi.encodePacked((_aadhar))), "Aadhars cannot be used again");
        bytes32 aadhar_hash = hashAadhar(_aadhar);
        require(Users[aadhar_hash].aadharHash != aadhar_hash, "Aadhars cannot be used again");
        User storage user = Users[aadhar_hash];

        user.name = _name;
        user.dob = _dob;
        user.aadharHash = aadhar_hash;
        user.metamaskHash = hashMetamask(_addr);
        user.noOfElections = 0;
        user.userId = noOfUsers;
        login[aadhar_hash] = password;
        noOfUsers++;

        return aadhar_hash;
    }

    function createElection(
        string memory _image_url,
        string memory _aadhar,
        string memory _name,
        uint256 _start_date,
        uint256 _end_date
    ) public returns (uint256) {
        bytes32 aadhar_hash = hashAadhar(_aadhar);
        require(Users[aadhar_hash].aadharHash == aadhar_hash, "Invalid user");
        require(_start_date < _end_date, "Start Date should be before End Date");
        User storage item = Users[aadhar_hash];
        address temp = msg.sender;
        require(
            item.metamaskHash == keccak256(abi.encodePacked(temp)),
            "Acess Denied,you aren't the owner of the election.wrong metamask address"
        );
        Users[aadhar_hash].noOfElections++;
        uint256 election_id = init(_name, _image_url, _start_date, _end_date) - 1;
        Users[aadhar_hash].elections.push(election_id);
        return election_id;
    }

    function getUser(
        string memory _aadhar,
        address _addr
    ) public view returns (User memory) {
        bytes32 aadhar_hash = hashAadhar(_aadhar);
        require(Users[aadhar_hash].aadharHash == aadhar_hash, "Invalid user");
        User storage item = Users[aadhar_hash];
        require(
            item.metamaskHash == keccak256(abi.encodePacked(_addr)),
            "Wrong metamask address"
        );
        return item;
    }

    // function getAllUsers() private view returns (User[] memory) {
    //     User[] memory allUsers = new User[](noOfUsers);

    //     for (uint256 i = 0; i < noOfUsers; i++) {
    //         User storage item = Users[i];

    //         allUsers[i] = item;
    //     }

    //     return allUsers;
    // }

    //returns the array of election ids of that specific user
    function getElections(string memory _aadhar) public view returns (uint256[] memory) {
        bytes32 aadhar_hash = hashAadhar(_aadhar);
        require(Users[aadhar_hash].aadharHash == aadhar_hash, "Invalid User");
        return Users[aadhar_hash].elections;
    }

    function checkCredentials(string memory _aadhar, string memory password) public view returns (bool) {
        bytes32 aadhar_hash = hashAadhar(_aadhar);
        if(keccak256(abi.encodePacked(login[aadhar_hash])) == keccak256(abi.encodePacked(password))) return true;
        return false;
    }
}
