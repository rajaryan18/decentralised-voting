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

    mapping(uint256 => User) private Users;

    uint256 public noOfUsers;

    // function hashAadhar(string memory _aadhar) private pure returns (bytes32) {
    //     return keccak256(abi.encodePacked(_aadhar));
    // }

    function initializer() public {
        noOfUsers = 0;
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
        address _addr
    ) public returns (uint256) {
        // Aadhar Numbers can be used for one account only
        for(uint256 i=0;i<noOfUsers;i++) require(Users[i].aadharHash != keccak256(abi.encodePacked((_aadhar))), "Aadhars cannot be used again");
        User storage user = Users[noOfUsers];

        user.name = _name;
        user.dob = _dob;
        user.aadharHash = hashAadhar(_aadhar);
        user.metamaskHash = hashMetamask(_addr);
        user.noOfElections = 0;
        user.userId = noOfUsers;
        noOfUsers++;

        return noOfUsers - 1;
    }

    function createElection(
        uint256 _userid,
        string memory _image_url,
        string memory _aadhar,
        string memory _name,
        uint256 _start_date,
        uint256 _end_date
    ) public {
        require(_userid < noOfUsers, "Invalid userID");
        require(_start_date < _end_date, "Start Date should be before End Date");
        User storage item = Users[_userid];
        address temp = msg.sender;
        require(
            item.aadharHash == keccak256(abi.encodePacked(_aadhar)),
            "Wrong aadhar number"
        );
        require(
            item.metamaskHash == keccak256(abi.encodePacked(temp)),
            "Acess Denied,you aren't the owner of the election.wrong metamask address"
        );
        Users[_userid].noOfElections++;

        Users[_userid].elections.push(init(_name, _image_url, _start_date, _end_date) - 1);
    }

    function getUser(
        uint256 _id,
        string memory _aadhar,
        address _addr
    ) public view returns (User memory) {
        require(_id < noOfUsers, "Invalid userID");
        User storage item = Users[_id];
        require(
            item.aadharHash == keccak256(abi.encodePacked(_aadhar)),
            "Wrong aadhar number"
        );
        require(
            item.metamaskHash == keccak256(abi.encodePacked(_addr)),
            "Wrong metamask address"
        );
        return item;
    }

    function getAllUsers() private view returns (User[] memory) {
        User[] memory allUsers = new User[](noOfUsers);

        for (uint256 i = 0; i < noOfUsers; i++) {
            User storage item = Users[i];

            allUsers[i] = item;
        }

        return allUsers;
    }

    //returns the array of election ids of that specific user
    function getElections(uint256 _id) public view returns (uint256[] memory) {
        require(_id < noOfUsers, "Invalid UserID");
        return Users[_id].elections;
    }
}
