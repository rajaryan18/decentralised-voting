// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Election {

    //@VARIABLES
    // holds data of a particular election
    struct Voting {
        uint256 id;
        string name;
        uint256 start_date;
        uint256 end_date;
        string[] verifications;
        string[] candidates;
        uint256[] numberOfVotes;
        string[] voted;
    }
    
    // current stage of the election
    enum Phase { PRESTART, ONGOING, END }
    Phase public currPhase;

    mapping(uint256 => Voting) public votings;
    uint256 public numberOfVoting = 0;

    address ownerAddress;


    //@MODIFIERS
    // only owner modifier
    modifier onlyOwner(){
        require(msg.sender == ownerAddress);
        _;
    }

    //state check modifier
    modifier inPhase(Phase _phase){
        require(currPhase == _phase);
        _;
    }


    //@FUNCTIONS
    // to enable upgrades we need to set up Proxies hence no constructors
    function init(uint256 _id, string memory _name, uint256 _start_date, uint256 _end_date, string[] memory _verifications, string[] memory _candidates) public returns(uint256) {
        Voting storage voting = votings[numberOfVoting];
        //checks if everything is okay
        require(voting.end_date < block.timestamp, "The deadline should be date in future");
        
        voting.id = _id;
        voting.name = _name;
        voting.start_date = _start_date;
        voting.end_date = _end_date;
        voting.verifications = _verifications;
        voting.candidates = _candidates;

        ownerAddress = msg.sender;
        currPhase = Phase.PRESTART;
        numberOfVoting++;

        return numberOfVoting;
    }

    
    //to add Candidates
    function addCandidates(string memory _name, uint256 _id) public onlyOwner inPhase(Phase.PRESTART) {
        require(currPhase == Phase.PRESTART);
        votings[_id].candidates.push(_name);
    }

    //function to get all candidates of particular voting id
    function getCandidates(uint256 _id) view public returns(string[] memory, uint256[] memory) {
        return (votings[_id].candidates, votings[_id].numberOfVotes);
    }

    //function to start voting, only official can start voting (here phase changes from PRESTART to ONGOING)
    function startVoting() public onlyOwner inPhase(Phase.PRESTART) {
        currPhase = Phase.ONGOING;
    }

    //function to do vote
    //here _id is id of voting, and _name is name of candidate to whom vote is given. 
    //_aadharHash is the person who has voted and we are storing it in voted[]
    //function returns array of number of votes given to each candidate
    function doVote(uint256 _id, uint256 _candidateID, string memory _aadharHash) public inPhase(Phase.ONGOING) returns(uint256[] memory){
        for(uint256 i=0; i<votings[_id].voted.length; i++){
            //check if user has already voted
            require(keccak256(abi.encodePacked(votings[_id].voted[i])) == keccak256(abi.encodePacked(_aadharHash)), "Voter has already voted");
        }
        votings[_id].numberOfVotes[_candidateID]++;
        return votings[_id].numberOfVotes;
    }

    function endVoting() public onlyOwner inPhase(Phase.ONGOING){
        currPhase = Phase.END;
    }
    
}