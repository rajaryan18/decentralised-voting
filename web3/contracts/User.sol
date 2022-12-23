// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Election.sol";

contract UserInfo is Election {
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

    uint256 public noOfUsers = 0;

    // function hashAadhar(string memory _aadhar) private pure returns (bytes32) {
    //     return keccak256(abi.encodePacked(_aadhar));
    // }

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
        string memory _aadhar,
        string memory _name,
        uint256 _start_date,
        uint256 _end_date
    ) public {
        User storage item = Users[_userid];
        address temp = msg.sender;
        require(
            item.aadharHash == keccak256(abi.encodePacked(_aadhar)),
            "Wrong aadhar number"
        );
        require(
            item.metamaskHash == keccak256(abi.encodePacked(temp)),
            "Wrong metamask address"
        );
        Users[_userid].noOfElections++;

        Users[_userid].elections.push(init(_name, _start_date, _end_date) - 1);
    }

    function getUser(
        uint256 _id,
        string memory _aadhar,
        address _addr
    ) public view returns (User memory) {
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
        return Users[_id].elections;
    }
}
