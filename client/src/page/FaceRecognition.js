import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const FaceRecognition = () => {
  const [adhar, setAdhar] = useState("");
  const [facedata, setFacedata] = useState("");
  const [hasVerified, setHasVerified] = useState(false); 
  const navigate = useNavigate();
  //get data
  const getdata = async () => {
    const adharNo = localStorage.getItem('adharNo')
    setFacedata(adharNo);
    const dataadhar = await axios.post('/adhar/getadhardetail', { adharNo: adharNo });
    const data = dataadhar.data.data;
    const data1 = dataadhar.data.data.adharNo;
    console.log(data1)
    setAdhar(data);
    //setFacedata(data1)
    //call data
    verifyface();
   
  }

  const verifyface = async () => {
    const adharNo =facedata;
    try {
     
      
      const { data } = await axios.post('/faceRecoginiton/face',{ adharNo:adharNo})
      console.log(data.data.faceReconition);
       const res = JSON.stringify(data.data);
       console.log(res)
      localStorage.setItem('adharData',res);
      
      if (data?.success && data.data.faceReconition===true) {
        
        toast.success(data.message)
        
        navigate('/email')

      } else {
        toast.error(data.message);
        navigate('/adhar')
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }finally {
      // Set hasVerified to true to prevent future calls to verifyface()
      setHasVerified(true);
    }
  } 

  //check facerecogition true or not

  // const confirmface = async () => {
  //   const facedata = await localStorage.getItem('data');
  //   const adharDetail = JSON.parse(facedata);
  //   console.log(adharDetail)
  //   if (adharDetail?.faceReconition == true) {
  //     toast.success("Face Reconition completed")
  //     localStorage.removeItem('data')
  //     navigate('/email')
  //   } else {
  //     toast.error("Face Not Recognition")
  //     // navigate('/adhar');
  //   }
  // }
  useEffect(() => {
    const adharNo = localStorage.getItem('adharNo')
    setFacedata(adharNo)
    getdata()
    
  }, [facedata])
  useEffect(()=>{
    if (!hasVerified) {
      verifyface();
    }
  },[hasVerified])
  return (
    <div className='w-11/12 flex justify-between align-center m-5'>
      <div className=''>
        <img src={adhar.photo} alt="" />
        <h1>{adhar.name}</h1>
      </div>
      <div></div>
    </div>
  )
}

export default FaceRecognition