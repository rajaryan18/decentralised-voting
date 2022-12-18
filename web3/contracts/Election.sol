// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Election {
    // holds data of a particular election
    uint256 public id;
    string public name;
    address public owner;
    string public start_date;
    string public end_date;
    string[] public verifications;
    string[] public candidates;
    // current stage of the election
    enum Phase { PRESTART, ONGOING, END }
    Phase public currPhase;
    // candidate id (index of the candidates array) mapped to the number of votes
    mapping(uint256 => uint256) public votes;

    // to enable upgrades we need to set up Proxies hence no constructors
    function init(uint256 _id, string memory _name, string memory _start_date, string memory _end_date, string[] memory _verifications, string[] memory _candidates) external {
        id = _id;
        name = _name;
        owner = msg.sender;
        start_date = _start_date;
        end_date = _end_date;
        verifications = _verifications;
        candidates = _candidates;
        currPhase = Phase.PRESTART;
    }

    // to add new candidates
    function addCandidates(string memory _name) external returns(uint256) {
        // No changes once Election begins
        require(currPhase == Phase.PRESTART);
        candidates.push(_name);
        // id is the index starting from 1
        return candidates.length;
    }
}