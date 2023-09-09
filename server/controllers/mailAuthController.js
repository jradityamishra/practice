import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

export const mailconfirmController=async(req,resp)=>{
    const {name,email}=req.body
    try{
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
            html:"<p>Hi."+" "+name+',please click here to <a href="http://localhost:5000/user/verify?id=">verify</a> your email.</p>'
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