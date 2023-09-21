import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Email = () => {

  const navigate=useNavigate();
  const [dataFetched, setDataFetched] = useState(false);

  const mailverify = async () => {
    const adhar = localStorage.getItem('adharData');
    const adhardata = JSON.parse(adhar);
    setDataFetched(adhardata);
    console.log(adhardata)
    console.log(adhardata.email)
    const email = adhardata.email
    const name = adhardata.name
    const user_id = adhardata._id
    console.log(email);
    if (!email) {
      toast.error("Please check email")
    }
    try {
      const { data } = await axios.post('/mailConfirm/mailconfirm', { email: email, name: name, user_id: user_id });
      if (data?.success) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setDataFetched(true);
      mailverifycheck();
    }
  }

  const mailverifycheck = async () => {
    const adhar = localStorage.getItem('adharData');
    const adhardata = JSON.parse(adhar);
    const adharNo = adhardata.adharNo
    console.log(adharNo)
    const data=await axios.post('/mailConfirm/mailconfirmcheck',{adharNo})
    console.log(data.data.user.mailConfirm);
    if(data.data.user.mailConfirm!=true){
      mailverifycheck()
    }
    if(data.data.user.mailConfirm==true){
      localStorage.removeItem('adharData')
      navigate('/vote')
    }
    
  }

  useEffect(() => {
    mailverify();
  }, []);

  return (
    <div>wait for confirmation</div>
  )
}

export default Email