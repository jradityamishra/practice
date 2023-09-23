import mongoose from "mongoose";

const registerCandiadateModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },

    partyName: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model(
  "registerCandiadateModel",
  registerCandiadateModel
);
