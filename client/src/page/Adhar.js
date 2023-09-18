import React, { useState } from 'react'
import Layout from '../component/Layout/Layout'
import { toast } from "react-toastify";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
const Adhar = () => {
    const navigate=useNavigate();
    const [adhar,setAdhar]=useState("");
    console.log(adhar);

    //function call
    const adharverify=async(e)=>{
     e.preventDefault();
     const data=localStorage.setItem('adharNo',adhar);
     if(adhar.length>12 && adhar.length<12){
     toast.error("please check Your Adhar Number")
     }else{
      navigate('/facereconition')
     }
    }

  return (
   <>
   
    <Layout>
    <div class="flex justify-center">
    <div class="relative mb-3" data-te-input-wrapper-init>
  <input
    type="tel"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="exampleFormControlInputTel"
    placeholder="Example label"
    value={adhar}
    onChange={(e) => setAdhar(e.target.value)} />
  <label
    for="exampleFormControlInputTel"
    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
    >Adhar No
  </label>
  
  </div>
  <button onClick={adharverify} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  submit
</button>
</div>
    </Layout>
    


   </>
  )
}

export default Adhar