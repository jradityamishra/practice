import nodemailer from 'nodemailer'
import dotenv from "dotenv";
import adhardetailShema from '../models/adhardetailShema.js';
dotenv.config();


export const mailconfirmCheckController=async(req,resp)=>{
   try{
    const {email}= req.body;
    const user = await adhardetailShema.findOne({ email: email });
    console.log(user._id);
    console.log(user.name);

    if(!user){
        return resp.status(401).json("User not found");
    }else{
        resp.status(201).send({
            success:true,
            message:"data we get",
            user
        })
    }
   }catch(error){
    console.log(error)
    resp.status(500).send({
        success:false,
        message:'Internal Server Error we not get that email',
    })
   }
}

export const mailconfirmController=async(req,resp)=>{
    const {email}=req.body
    const user = await adhardetailShema.findOne({ email: email });
        console.log(user.name,user._id)
        const name=user.name;
        const user_id=user._id;
    try{
        
        // const {name}=user.name;
        // const {user_id}=user._id;
        const transporter= nodemailer.createTransport(
            {
              host:"smtp.gmail.com",
              port:587,
              secure:false,
              requireTLS:true,
              auth:{
                  user:process.env.SMTP_SERVER,
                  pass:process.env.SMTP_PASS
              }
            }
          );
          const mailOptions={
            from:"E-vote@gmail.com",
            to:email,
            subject:'for verification yourself',
            html:"<p>Hi."+" "+name+',please click here to <a href="http://localhost:8001/mailConfirm/verify?id='+user_id+'">verify</a> your email.</p>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("email has been send",
                resp.status(200).send({
                    success:true,
                    message:info.response
                }));
            }
        })
    }catch(error)
    {console.log(error)
    resp.status(500).send({
        success:false,
        message:"Not mail send something is wrong"
    })}



}



//verify using mail

export const verifymail=async(req,resp)=>{
try{
    const id=req.query.id;
    const data=await adhardetailShema.updateOne({_id:id},
   {$set:{mailConfirm:true} })
   //resp.send("mail confirm")
   resp.render('email-verified');
}catch(error){
    console.log(error.message)
}
}