import registerCandidateModel from "../models/registerCandidateModel.js";
import Voting from "../models/VoteModel.js";

export const getResults = async (req, res, next) => {
  try {
    const candidates = await registerCandidateModel.find().sort({ votes: -1 });
    const candidatesWithVoteCount = candidates.map((candidate) => ({
      name: candidate.name,
      voteCount: candidate.votes,
    }));

    let candidateWithMaxVotes = candidates[0];

    res.json({
      candidatesWithVoteCount,
      candidateWithMaxVotes,
    });
  } catch (err) {
    next(err);
  }
};

export const createVoting = async (req, res) => {
  try {
    const { votingStart, endDate,votingEnd } = req.body;

    // Create a new voting model instance
    const newVoting = new Voting({
      votingStart,
      votingEnd,
      endDate
      
    });

    // Save the new voting model to the database
    await newVoting.save();

    res.status(201).json(newVoting);
  } catch (error) {
    res.status(500).json({ error: "Error creating voting model" });
  }
};
export const getVotingStatus = async (req, res) => {
  try {
    const voting = await Voting.findById("650e06b06e7ca183f841be9c");

    if (!voting) {
      return res.status(404).json({ error: "Voting model not found" });
    }

    res.status(200).json({ voting });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const startVoting = async (req, res) => {
  try {
    const voting = await Voting.findById("650e06b06e7ca183f841be9c");

    if (!voting) {
      return res.status(404).json({ error: "Voting model not found" });
    }

    // Update the votingStart property to true
    voting.votingStart = true;

    // Save the updated voting model
    await voting.save();

    res.status(200).json({ message: "Voting has started" });
  } catch (error) {
    res.status(500).json({ error: "Error starting voting" });
  }
};

export const endVoting = async (req, res) => {
  try {
    // Find the voting model by some identifier (e.g., ID)
    const { id } = req.params;
    const voting = await Voting.findById("650e06b06e7ca183f841be9c");

    if (!voting) {
      return res.status(404).json({ error: "Voting model not found" });
    }

    // Update the votingEnd property to true
    voting.votingEnd = true;
    voting.votingStart = false;
    // Save the updated voting model
    await voting.save();

    res.status(200).json({ message: "Voting has ended" });
  } catch (error) {
    res.status(500).json({ error: "Error ending voting" });
  }
};
