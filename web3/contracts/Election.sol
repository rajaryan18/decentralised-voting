// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ElectionInfo {
    //@VARIABLES
    // holds data of a particular election
    // current stage of the election
    enum Phase {
        PRESTART,
        ONGOING,
        END
    }
    // struct for candidates. Store images on IPFS and upload links here
    struct Candidate {
        string name;
        string party;
        string image_url;
        string party_image_url;
    }

    struct Election {
        string name;
        uint256 start_date;
        uint256 end_date;
        uint256 noOfCandidates;
        Candidate[] candidates;
        uint256[] numberOfVotes;
        string image_url;
        uint256 totalVoted;
        // bytes32[] voted;
        mapping(bytes32 => bool) voted;
        Phase currPhase;
        address ownerAddress;
    }

    struct returnElection {
        string name;
        uint256 start_date;
        uint256 end_date;
        uint256 noOfCandidates;
        Candidate[] candidates;
        string image_url;
        uint256 totalVoted;
        Phase currPhase;
    }

    mapping(uint256 => Election) public elections;
    uint256 public numberOfElections;
    //@MODIFIERS
    // only owner modifier
    modifier onlyOwner(uint256 _electionid) {
        require(_electionid < numberOfElections, "Invalid Election ID");
        require(
            msg.sender == elections[_electionid].ownerAddress,
            "Acess Denied,you aren't the owner of the election.wrong metamask address"
        );
        _;
    }

    //state check modifier
    modifier inPhase(Phase _phase, uint256 _electionid) {
        require(_electionid < numberOfElections, "Invalid Election ID");
        require(elections[_electionid].currPhase == _phase, "Wrong phase");
        _;
    }

    //@FUNCTIONS

    //function to hash aadhar
    function hashAadhar(string memory _aadhar) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_aadhar));
    }

    // to enable upgrades we need to set up Proxies hence no constructors
    //both start and end date should be in unix format in seconds elapsed
    function init(
        string memory _name,
        string memory _image_url,
        uint256 _start_date,
        uint256 _end_date
    ) public returns (uint256) {
        Election storage voting = elections[numberOfElections];
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
        voting.totalVoted = 0;
        voting.noOfCandidates = 0;
        numberOfElections++;
        voting.image_url = _image_url;

        return numberOfElections;
    }

    //to add Candidates
    function addCandidates(string memory _name, uint256 _electionid, string memory _party, string memory _image_url, string memory _party_image_url)
        public
        onlyOwner(_electionid)
        inPhase(Phase.PRESTART, _electionid)
    {
        Candidate memory temp;
        temp.name = _name;
        temp.party = _party;
        temp.image_url = _image_url;
        temp.party_image_url = _party_image_url;
        elections[_electionid].candidates.push(temp);
        elections[_electionid].numberOfVotes.push(0);
        elections[_electionid].noOfCandidates++;
    }

    function getCandidates(uint256 _electionid) public view onlyOwner(_electionid) returns(Candidate[] memory) {
        require(_electionid < numberOfElections, "Invalid Election ID");
        return elections[_electionid].candidates;
    }

    //function to get all the candidates ,their respective no of votes and the phase of the election
    function getElectionResults(uint256 _electionid)
        public
        inPhase(Phase.END, _electionid)
        view
        returns (
            Candidate[] memory,
            uint256[] memory
        )
    {
        return (
            elections[_electionid].candidates,
            elections[_electionid].numberOfVotes
        );
    }

    //function to start voting, only official can start voting (here phase changes from PRESTART to ONGOING)
    function startVoting(uint256 _electionid)
        public
        onlyOwner(_electionid)
        inPhase(Phase.PRESTART, _electionid)
    {
        elections[_electionid].currPhase = Phase.ONGOING;
    }

    //function to do vote
    //here _id is id of voting, and _candidateID is ID of candidate to whom vote is given.
    //_aadharHash is the person who has voted and we are storing it in voted[]
    //function returns array of number of votes given to each candidate
    function doVote(
        uint256 _electionid,
        uint256 _candidateID,
        string memory _aadhar
    ) public inPhase(Phase.ONGOING, _electionid) returns (uint256[] memory) {
        require(_candidateID < elections[_electionid].noOfCandidates && _candidateID >= 0, "Invalid Candidate ID");
        require(!elections[_electionid].voted[keccak256(abi.encodePacked(_aadhar))], "Voter has already voted");
        elections[_electionid].numberOfVotes[_candidateID]++;
        elections[_electionid].voted[hashAadhar(_aadhar)] = true;
        elections[_electionid].totalVoted++;
        return elections[_electionid].numberOfVotes;
    }

    //function to end voting
    function endVoting(uint256 _electionid)
        public
        onlyOwner(_electionid)
        inPhase(Phase.ONGOING, _electionid)
    {
        elections[_electionid].currPhase = Phase.END;
    }

    // function to copy strings
    function copyBytes(bytes memory _bytes) private pure returns (bytes memory) {
        bytes memory copy = new bytes(_bytes.length);
        uint256 max = _bytes.length + 31;
        for (uint256 i=32; i<=max; i+=32)
        {
            assembly { mstore(add(copy, i), mload(add(_bytes, i))) }
        }
        return copy;
    }

    function getElectionById(uint256 _id) public view returns (returnElection memory) {
        require(_id < numberOfElections, "Invalid Election ID");
        returnElection memory temp;
        temp.name = string(copyBytes(bytes(elections[_id].name)));
        temp.start_date = elections[_id].start_date;
        temp.end_date = elections[_id].end_date;
        temp.candidates = new Candidate[](elections[_id].noOfCandidates);
        for(uint256 i=0;i<elections[_id].noOfCandidates;i++) {
            temp.candidates[i].name = string(copyBytes(bytes(elections[_id].candidates[i].name)));
            temp.candidates[i].party = string(copyBytes(bytes(elections[_id].candidates[i].party)));
            temp.candidates[i].image_url = string(copyBytes(bytes(elections[_id].candidates[i].image_url)));
            temp.candidates[i].party_image_url = string(copyBytes(bytes(elections[_id].candidates[i].party_image_url)));
        }
        temp.image_url = string(copyBytes(bytes(elections[_id].image_url)));
        temp.noOfCandidates = elections[_id].noOfCandidates;
        temp.currPhase = elections[_id].currPhase;
        temp.totalVoted = elections[_id].totalVoted;
        return temp;
    }

    function getAllElections() public view returns (returnElection[] memory) {
        returnElection[] memory allElections = new returnElection[](numberOfElections);
        for(uint256 i=0;i<numberOfElections;i++) {
            allElections[i] = getElectionById(i);
        }
        return allElections;
    }
}