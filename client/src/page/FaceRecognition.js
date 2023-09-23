import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../component/Layout/Layout";
import { Button } from "@mui/material";

const FaceRecognition = () => {
  const [adhar, setAdhar] = useState("");
  const [facedata, setFacedata] = useState("");
  const [hasVerified, setHasVerified] = useState(false);
  const navigate = useNavigate();
  //get data
  const getdata = async () => {
    const adharNo = localStorage.getItem("adharNo");
    setFacedata(adharNo);
    const dataadhar = await axios.post("/adhar/getadhardetail", {
      adharNo: adharNo,
    });
    const data = dataadhar.data.data;
    const data1 = dataadhar.data.data.adharNo;
    console.log(data1);
    setAdhar(data);
    //setFacedata(data1)
    //call data
    verifyface();
  };

  const verifyface = async () => {
    const adharNo = facedata;
    try {
      const { data } = await axios.post("/faceRecoginiton/face", {
        adharNo: adharNo,
      });
      console.log(data.data.faceReconition);
      const res = JSON.stringify(data.data);
      console.log(res);
      localStorage.setItem("adharData", res);

      if (data?.success && data.data.faceReconition === true) {
        toast.success(data.message);

        navigate("/email");
      } else {
        toast.error(data.message);
        navigate("/adhar");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      // Set hasVerified to true to prevent future calls to verifyface()
      setHasVerified(true);
    }
  };

  useEffect(() => {
    const adharNo = localStorage.getItem("adharNo");
    setFacedata(adharNo);
    getdata();
  }, [facedata]);
  useEffect(() => {
    if (!hasVerified) {
      verifyface();
    }
  }, [hasVerified]);
  return (
    <Layout>
      <div className="flex justify-evenly align-center m-5">
        <div className="flex justify-center flex-col bg-white py-6 px-4 rounded-lg ">
          <img className="rounded" src={adhar.photo} alt="" />
          <h1 className="font-semibold pt-8 text-2xl text-gray-600 flex justify-center">
            {adhar.name}
          </h1>
          <div className="flex justify-center mt-4">
            <Button variant="contained">Verify</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaceRecognition;
