import mongoose from "mongoose";

const votingSchema = new mongoose.Schema({
  votingStart: {
    type: Boolean,
    required: true,
    default: false,
  },
  votingEnd:{
    type: Boolean,
    required: true,
    default: false,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const Voting = mongoose.model("Voting", votingSchema);

export default Voting;
