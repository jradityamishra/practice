import React, { useRef } from "react";
import Layout from "../component/Layout/Layout";
import facemap from "../assets/facemap.png";
import { Button } from "@mui/material";
const Verify = () => {
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center gap-8">
          <img
            className="h-80"
            src="https://img.freepik.com/free-vector/abstract-flat-face-recognition-background_23-2148193309.jpg?w=740&t=st=1694637434~exp=1694638034~hmac=6dc3f9fcca6ef52840b589abe03b40a82296d812daef93a5240cd46436ecb704"
            alt=""
          />
          <Button variant="outlined">Verify Identity</Button>
        </div>
        <div className="shadow-sm shadow-blue-300">
          {/* <video ref={videoRef} autoPlay></video> */}
          <img className="" src={facemap} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
