// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract voting{
    ///////////// 
    ///Structs///
    /////////////

    struct Candidate{
        string  name;
        uint128 votes;
        string zone;
    }

    struct Voter{
        address voterAddress;
        bool  voted;
    }

    struct Admin{
        string zone;
    }

    //State Variables////
    /////////////////////
    
    address public superAdmin;
    uint votingStart;
    uint votingEnd;
    string public zone;
    Candidate[] public candidates;

    ///MAPPINGS///
    //////////////
    mapping(address voteradr => bool isvoted) public voters;
    mapping(address adminadr => bool isadmin) public admins;
    mapping(address => string) public adminZones;
    mapping(string name=>uint Index)public candidateno;

    constructor(string memory _zone){
        superAdmin=msg.sender;
        zone=_zone;
    }

    //////////////
    //Modifiers//
    //////////////
    modifier onlyadmin(address admin_){
        require(admins[admin_],"Only Admins");
        _;
    }
   modifier onlysuperAdmin{
       require(superAdmin==msg.sender,"Only Superadmin ");
       _;
   }
       
    ////Main Functions///
    /////////////////////
    function addAdmin(address _admin) public payable onlysuperAdmin {
        adminZones[_admin] = zone;
        admins[_admin]=true;
    }

    function addCandidate(string memory partyName,address admin) public onlyadmin(admin_) {
        require(!getVotingStatus(),"Voting is going on Can't add now !");
        candidates.push(Candidate({
                name: _partyName,
                votes: 0,
                zone: adminZones[msg.sender]
        }));
        candidateno[_partyName]=candidates.length+1;
    }

    ///Working functions///
    ///////////////////////
    function initiateVoting(string[] memory _candidateNames, uint256 _durationInminutes) external{ 
        require(_candidateNames.length>=2,"Atleast two Candidates should be there in Election ");
        for (uint128 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                votes: 0,
                zone:adminZones[msg.sender]
            }));
            candidateno[_candidateNames[i]]=i;
        }
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInminutes * 1 minutes);
    }

    function vote(uint _candidateIndex,address voter) public {
        require(block.timestamp>votingStart,"Voting hasn't started !");
        require(block.timestamp<votingEnd,"Voting Ended !");
        require(msg.sender!=address(0),"Invalid Address");
        require(voters[voter]==false,"Already Voted Can't vote Twice!");
        candidates[_candidateIndex].votes++;
        voters[voter]=true;
    }


    function showResults() external view onlysuperAdmin returns (Candidate[] memory) {
        require(!getVotingStatus(),"Voting is still On ");
        return candidates;
    }

      function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }
}

contract VotingFactory{

    address public owner;
    address[] public deployedContracts;
    voting newContract;

    struct Candidate{
        string  name;
        uint128 votes;
        string zone;
    }
    //////////////
    ///mappings///
    //////////////
    mapping(address => string) public contractZones;
    mapping(string =>address)public zonesContract;
    mapping(address superadminadr => bool issuperadmin) public superadmins;
    

    constructor(){
        owner=msg.sender;
    }

    //////////////////
    //////Modifier////
    //////////////////
     modifier onlysuperadmin {
        require(superadmins[msg.sender],"Only Super Admins");
        _;
    }
    modifier onlyOwner {
        require(msg.sender==owner,"Only Owner");
        _;
    }

    ///Main Functions///
    //////////////////////

    function createVotingContract(string memory _zone) public payable  {
        newContract = new voting(_zone);
        deployedContracts.push(address(newContract));
        contractZones[address(newContract)] = _zone;
        zonesContract[_zone]=address(newContract);
    }

    function AddSuperAdminVF(address superAdmin) public payable{
        require(!superadmins[msg.sender],"Already a superAdmin");
        superadmins[superAdmin]=true;
    }

    function AddCandidateVF(string memory _partyname) public{
        newContract.addCandidate(_partyname,msg.sender);
    }

    function addadminVF(address _admin) public {
        newContract.addAdmin(_admin);
    }


    function initiateVotingVF(string[] memory _candidateNames, uint256 _durationInDays) public {
        newContract.initiateVoting(_candidateNames,_durationInDays);
    }

    function voteVF(uint _candidateIndex,address voter) public  {
      newContract.vote(_candidateIndex,voter);
    } 
    
    function getStatus() public view returns(bool){
        return newContract.getVotingStatus();
    }

    function showResultsVF() public view returns (voting.Candidate[] memory) {
        return newContract.showResults();
    }
}


//0xfbDaBD3eb616dd601264F7983DCA1Ed935DDcD44