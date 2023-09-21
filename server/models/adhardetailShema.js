import mongoose from "mongoose"

const adhardetailShema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    fathersName:{
        type:String,
        required:true
    },
    adharNo:{
        type: Number,
        required:true,
        unquie:true
    },
    mobileNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    photo:{
        type:Buffer,
        contentType:{String}
    },
    mailConfirm:{
        type :Boolean ,
         default:false
    },
    faceReconition:{
        type :Boolean ,
         default:false
    }
},{timestamps:true})
export default mongoose.model("adhar",adhardetailShema)
