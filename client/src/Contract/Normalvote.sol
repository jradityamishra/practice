// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleVoting {
    // Structs

    struct Candidate {
        string name;
        uint votes;
    }
    struct Booth {
        string zoneName;
        Candidate [] candidates;
        uint votingStart;
        uint duration;
        address admin;
        uint candidatescnt;
    }

    struct Voter {
        address voterAddress;
        bool isVoted;
    }

    // Events
    event BoothCreated(string zoneName, Candidate[] candidates, uint votingStart,address superadmin, uint duration);
    event Voted(string zoneName, uint candidateIndex);
    event adminadded(address admin_,string  zoneName_);
    event candidateAdded(string candidateName_,string zoneName_,address admin_);

    // State Variables
    uint public zones = 0;
    address public superAdmin;

    // Mappings
    mapping(string => Booth) private booths;
    mapping(address => bool) public voters;
    mapping(address => bool) public isAdmin;

    // Modifiers
    modifier onlyAdmin(string memory zoneName_,address admin_) {
        require(isAdmin[admin_], "Only Admins");
        Booth storage booth = booths[zoneName_];
        require(booth.admin==admin_,"Not an admin");
        _;
    }
    modifier onlysuperAdmin() {
        require(superAdmin==msg.sender, "Only Admins");
        _;
    }

    // Main functions
     function createBooth(
        string memory zoneName_,
        string [] memory candidateNames_,
        uint votingStart_,
        uint durationinDays_
    ) external payable {
        uint duration = votingStart_ + (durationinDays_ * 1 days);
        Booth storage booth = booths[zoneName_];
        booth.zoneName = zoneName_;
        booth.votingStart = votingStart_;
        booth.duration = duration;
        booth.candidatescnt = 0;
        superAdmin=msg.sender;
        for (uint i = 0; i < candidateNames_.length; i++) {
        booth.candidates.push(Candidate(candidateNames_[i], 0));
        booth.candidatescnt++;
        }
        // emit BoothCreated(zoneName_, booth.candidates, votingStart_,msg.sender, duration);
        zones++;
    }

     function addAdmin(address admin_,string memory zoneName_) external onlysuperAdmin {
        require(isAdmin[admin_] ==false,"Already an admin ");
        Booth storage booth = booths[zoneName_];
        booth.admin=admin_;
        isAdmin[admin_]=true;
        emit adminadded(admin_,zoneName_);
    }

    function addCandidate(string memory zoneName_, string memory candidateName_,address admin_) external onlyAdmin(zoneName_,admin_) {
    Booth storage booth = booths[zoneName_];
    require(booth.candidatescnt < booth.candidates.length, "Too many candidates added.");
    booth.candidates[booth.candidatescnt].name = candidateName_;
    booth.candidates[booth.candidatescnt].votes = 0;
    booth.candidatescnt++;
    emit candidateAdded(candidateName_,zoneName_,admin_);
}

    function vote(string memory zoneName_, uint candidateIndex_) public {
        require(!voters[msg.sender], "You have already voted.");
        Booth storage booth = booths[zoneName_];
        require(candidateIndex_ < booth.candidates.length, "Invalid candidate index.");
        booth.candidates[candidateIndex_].votes++;
        voters[msg.sender] = true;
        emit Voted(zoneName_, candidateIndex_);
    }

    function GetResults(string memory zoneName_) external view onlysuperAdmin returns (Candidate[] memory)  {
    Booth storage booth = booths[zoneName_];
    return booth.candidates;
    }

    function getBoothByZoneName(string memory zoneName_) external view returns (Booth memory) {
        return booths[zoneName_];
    }
}

// ["Amaan","Meghna"]
// 0x0DbbFd3deF00C5aAd59A6427e339F0194D00f428