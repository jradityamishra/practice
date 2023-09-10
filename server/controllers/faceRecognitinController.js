//import main from "../recognition/main.py"
import { spawn } from "child_process"
import { fileURLToPath } from 'url';
import path from 'path';
//import {} from "../recognition/"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const faceRecognitionController=async(req,resp)=>{
    try{
        const photo = req.file.filename
        console.log(photo)
        const pythonScriptPath = path.join(__dirname,'..', 'recognition', 'main.py');
        const py=spawn('python',[pythonScriptPath,photo])
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
              resp.send('Face recognition completed successfully');
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