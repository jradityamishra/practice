import mongoose from "mongoose";


const votingSchema = new mongoose.Schema({

  votingStart: {
    type: Boolean,
    required: true,
    default:false
  },
  
 
  durationDays: {
    type: Number,
    required: true,
  },
  
  
  votingEnd: {
    type: Boolean,
    required: true,
    default:false
  },
});

// Create a Mongoose model based on the schema
const Voting = mongoose.model('Voting', votingSchema);

export default Voting;