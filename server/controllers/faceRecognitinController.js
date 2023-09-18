//import main from "../recognition/main.py"

import { spawn } from "child_process"
import { fileURLToPath } from 'url';
import path from 'path';
import adhardetailShema from "../models/adhardetailShema.js";
//import {} from "../recognition/"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const faceRecognitionController = async (req, resp) => {
  try {
    //take adhar detail from user
    const value = req.body
    console.log(value)
    if (!value) {
    return  resp.send({message:"plase Enter your Adhar Number"})
    }
    // if (value.length !="12") {
    //  return resp.send({message:"plase Enter your Valid Adhar Number"})
    // }
  
    const data = await adhardetailShema.findOne(value);
    console.log(data.faceReconition)
    if (data.faceReconition==true) {
      return resp.send({message:"voter already verified"})
      //  resp.status(500).send({
      //   success: false,
      //   message: "User already varified"
      //
       
     //})
     
    } else {
      //send adhar No to python script
      const pythonScriptPath = path.join(__dirname, '..', 'recognition', 'main.py');
      const py = spawn('python', [pythonScriptPath, value.adharNo])

    //   py.stdout.on('data', (data) => {
    //     console.log(`Python Script Output: ${data}`);
    // });
    
    // py.stderr.on('data', (data) => {
    //     console.error(`Python Script Error: ${data}`);
    // });
      //It ckeck  either python code fully run or not
      py.on('close', (code) => {
        if (code === 0) {
          getdata();
          console.log('Python script exited successfully.');
          //if code executed fully than exexute this function
         // getdata();
        } else {
          console.error(`Python script exited with code ${code}.`);
        }
      });
      
      const getdata = async () => {
        const data = await adhardetailShema.findOne(value);
        //const photo = Buffer.from(data.photo).toString('ascii');
        //console.log(data)
        if (data) {
         return resp.json({
            success: true,
            message: 'we get face recognition true',
            data
          })
        } else {
         return resp.send(
            {
              sucess: false,
              message: "we can't find this user and not get user verify or not"
            }
          )
        }
      }
      
    }
  } catch (error) {
    console.log(error)
    resp.status(500).send({
      success: false,
      message: "Internal Server Error"
    })
  }

}


export const postDatafromCv = async (req,resp) => {
  const {adharNo} = req.body
    console.log("value"+":"+adharNo)
  try {
    

    //get image from database
    const data = await adhardetailShema.findOne({adharNo:adharNo});
    const photo = Buffer.from(data.photo).toString('ascii');
    console.log(photo)
    resp.status(200).send({
      sucess: true,
      message: "get data from databse and send to pythone file",
      photo
    })
  } catch (error) { console.log(error) }
}

//RESULT WE GET FROM OPEN CV

export const postResultCv = async (req, resp) => {

  const result = req.body;

  const adharNo = req.body.adharNo
  const r = result.result
  resp.send("result get")
  if (r == "True") {
    //update facerecoginiton true or false after face regonition
    const data = await adhardetailShema.updateOne({ adharNo: adharNo }, { faceReconition: true })
    console.log("facerecoginiton done")

  } else {
    console.log("something is error")

  }




}