//import main from "../recognition/main.py"

import { spawn } from "child_process"
import { fileURLToPath } from 'url';
import path from 'path';
import adhardetailShema from "../models/adhardetailShema.js";
//import {} from "../recognition/"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const faceRecognitionController=async(req,resp)=>{
    try{
        const value = req.body;

        //get image from database
        //const data=await adhardetailShema.findOne(value);
        //const photo=Buffer.from(data.photo).toString('ascii');
        
        console.log(value)
        const pythonScriptPath = path.join(__dirname,'..', 'recognition', 'main.py');
        const py=spawn('python',[pythonScriptPath,value.adharNo])
        //resp.send(py);  
        //resp.send(photo)
        py.stdout.on('data', (data) => {
            console.log(`Python Script Output: ${data}`);
          });
      
          py.stderr.on('data', (data) => {
            console.error(`Python Script Error: ${data}`);
          });
          py.on('close', (code) => {
            console.log(`Python Script Exited with Code ${code}`);
            // Send a response to the client, indicating success or failure
            if (code === 0) {
              resp.status(200).send({
                success:true,
                sucess:"face recongition successfully",
                code

              })
            } else {
              resp.status(500).send({
                success: false,
                message: 'Face recognition failed'
              });
            }
        });
    }catch(error)
    {console.log(error)
    resp.status(500).send({
        success:false,
        message:"Internal Server Error"
    })}
}


export const postDatafromCv=async(req,resp)=>{
  try{
    const value=req.body;
    //get image from database
        const data=await adhardetailShema.findOne(value);
        const photo=Buffer.from(data.photo).toString('ascii');
        // console.log(photo)
        resp.status(200).send({
          sucess:true,
          message:"get data from databse and send to pythone file",
          photo
        })
  }catch(error){console.log(error)}
}

//RESULT WE GET FROM OPEN CV

export const postResultCv=async(req,resp)=>{
  try{
   const result=req.body;
    resp.send("result get")
    //const result=await JSON.parse(req.body);
    console.log(result.result)
  }catch(error)
  {console.log(error)
  resp.send("error") }
}