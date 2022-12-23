// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Election {
    //@VARIABLES
    // holds data of a particular election
    // current stage of the election
    enum Phase {
        PRESTART,
        ONGOING,
        END
    }
    struct Voting {
        string name;
        uint256 start_date;
        uint256 end_date;
        string[] candidates;
        uint256[] numberOfVotes;
        bytes32[] voted;
        Phase currPhase;
        address ownerAddress;
    }

    

    mapping(uint256 => Voting) public votings;
    uint256 public numberOfVoting = 0;

    

    //@MODIFIERS
    // only owner modifier
    modifier onlyOwner(uint _id) {
        require(msg.sender == votings[_id].ownerAddress);
        _;
    }

    //state check modifier
    modifier inPhase(Phase _phase, uint256 _id) {
        require(votings[_id].currPhase == _phase);
        _;
    }



    //@FUNCTIONS

    //function to hash aadhar
    function hashAadhar(string memory _aadhar) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_aadhar));
    }

    // to enable upgrades we need to set up Proxies hence no constructors
    function init(
        string memory _name,
        uint256 _start_date,
        uint256 _end_date
    ) public returns (uint256) {
        Voting storage voting = votings[numberOfVoting];
        //checks if everything is okay
        require(
            _start_date > block.timestamp,
            "The start date should be date in future"
        );
        require(
            _end_date > _start_date,
            "The end date should be ahead of the start date"
        );

        voting.name = _name;
        voting.start_date = _start_date;
        voting.end_date = _end_date;
        voting.ownerAddress = msg.sender;
        voting.currPhase = Phase.PRESTART;
        numberOfVoting++;

        return numberOfVoting;
    }

    //to add Candidates
    function addCandidates(string memory _name, uint256 _id)
        public
        onlyOwner(_id)
        inPhase(Phase.PRESTART, _id)
    {
        votings[_id].candidates.push(_name);
    }

    //function to get all candidates of particular voting id
    function getCandidates(uint256 _id)
        public
        view
        returns (string[] memory, uint256[] memory)
    {
        return (votings[_id].candidates, votings[_id].numberOfVotes);
    }

    //function to start voting, only official can start voting (here phase changes from PRESTART to ONGOING)
    function startVoting(uint256 _id) public onlyOwner(_id) inPhase(Phase.PRESTART, _id) {
        votings[_id].currPhase = Phase.ONGOING;
    }

    //function to do vote
    //here _id is id of voting, and _candidateID is ID of candidate to whom vote is given.
    //_aadharHash is the person who has voted and we are storing it in voted[]
    //function returns array of number of votes given to each candidate
    function doVote(
        uint256 _id,
        uint256 _candidateID,
        string memory _aadhar
    ) public inPhase(Phase.ONGOING, _id) returns (uint256[] memory) {
        for (uint256 i = 0; i < votings[_id].voted.length; i++) {
            //check if user has already voted
            require(
                keccak256(abi.encodePacked(votings[_id].voted[i])) ==
                    keccak256(abi.encodePacked(_aadhar)),
                "Voter has already voted"
            );
        }
        votings[_id].numberOfVotes[_candidateID]++;
        votings[_id].voted.push(hashAadhar(_aadhar));
        return votings[_id].numberOfVotes;
    }

    //function to end voting
    function endVoting(uint256 _id) public onlyOwner(_id) inPhase(Phase.ONGOING, _id) {
        votings[_id].currPhase = Phase.END;
    }
}
