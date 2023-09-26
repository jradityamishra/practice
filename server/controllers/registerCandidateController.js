import User from "../models/UserModel.js";
import registerCandidateModel from "../models/registerCandidateModel.js";

export const registerCandidate = async (req, resp) => {
  try {
    const { name, age, position, partyName } = req.body;
    if (!name || !age || !position || !partyName) {
      return resp.status(401).json({ message: "Please fill all the fields" })
    }
    // Create a new candidate instance


    // Save the candidate to the database
    const data = await registerCandidateModel.create({
      name: name,
      age: age,
      position: position,
      partyName: partyName
    });
    const value = await data.save();
    if (value) {
      resp.status(201).send({
        succcess: true,
        message: 'done',
        value
      })
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: error.message
    })
  }
};



//vote controller

export const voteController = async (req, resp) => {
  try {
    const { voter_id, can_id } = req.params;
    console.log(voter_id, can_id)
    setTimeout(() => console.log("Transanction happening"), 2000)
    // You can use Promise.all to run both operations concurrently
    const [candidateResponse, userResponse] = await Promise.all([
      incrementVote(can_id),
      updateUserVoterStatus(voter_id),
    ]);

    if (candidateResponse.status === 200 && userResponse.status === 200) {
      resp.status(201).send({ successful: true });
    } else {
      // Handle errors appropriately, e.g., send an error response
      resp.status(400).send({ successful: false, message: "Voting failed" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ successful: false, message: error.message });
  }
};

const updateUserVoterStatus = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { hasVoted: true });

    if (!user) {
      return { status: 404, message: "Account does not exist, please sign up" };
    }

    return { status: 200, message: "Voting status updated successfully", user };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An error occurred while updating the user's voting status",
      error: err.message,
    };
  }
};

const incrementVote = async (id) => {
  try {
    const candidate = await registerCandidateModel.findByIdAndUpdate(id, { $inc: { votes: 1 } });

    if (!candidate) {
      return { status: 404, message: "Candidate not found" };
    }

    return {
      status: 200,
      message: "Candidate vote count incremented successfully",
      candidate,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "An error occurred while incrementing candidate vote count",
      error: err.message,
    };
  }
};



export const getCandidate = async (req, resp) => {
  try {
    const data = await registerCandidateModel.find();
    if (data) {
      resp.status(200).send({
        success: true,
        message: "DATA IS GET",
        data
      })
    } else {
      resp.status(401).send({
        success: false,
        message: "something error in data"
      })
    }
  } catch (error) {
    console.log(error)
    resp.status(500).send({
      succcess: true,
      message: error.message
    })
  }
}
