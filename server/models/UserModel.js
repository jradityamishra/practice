import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    profilePicture: {
      type: String,
      required:true,
      default:'none',
    },
    hasVoted:
    {
      type:Boolean,
      default:false,
      required:true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User; 
