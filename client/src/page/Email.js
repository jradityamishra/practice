import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Layout from '../component/Layout/Layout';
const Email = () => {

  const navigate = useNavigate();
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
    const data = await axios.post('/mailConfirm/mailconfirmcheck', { adharNo })
    console.log(data.data.user.mailConfirm);
    if (data.data.user.mailConfirm != true) {
      mailverifycheck()
    }
    if (data.data.user.mailConfirm == true) {
      localStorage.removeItem('adharData')
      navigate('/vote')
    }

  }

  useEffect(() => {
    mailverify();
  }, []);

  return (
    <Layout>
      <div className='flex justify-center align-center '>
        <div
          class="flex justify-center rounded-lg bg-white w-1/2 h-60 dark:bg-neutral-700">

          <div class="p-6 flex flex-col justify-center">
            <h1
              class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 ">
              Please verify your Email-id
            </h1>
            <h2 className='flex justify-center mx-auto'>Verification has been send</h2>

            <div
              className="my-8 flex justify-center mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">

            </div>


          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Email