import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner";
const Adhar = () => {
  const navigate = useNavigate();
  const [adhar, setAdhar] = useState("");
  const [Checkedadhar, setCheckedAdhar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(adhar);

  //function call
  const adharverify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = localStorage.setItem("adharNo", adhar);
    if (adhar.length > 12 && adhar.length < 12) {
      toast.error("please check Your Adhar Number");
    } else if (adhar != Checkedadhar) {
      toast.error("please provide your adhar No");
      window.location.reload(false);
    } else {
      navigate("/facereconition");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("adharNo");
    if (data) {
      setCheckedAdhar(data);
      setAdhar(data);
      console.log(data);
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="relative my-4 text-2xl" data-te-input-wrapper-init>
              <input
                type="tel"
                className=" min-h-[auto]  rounded border-0 border-gray-400 bg-transparent px-3"
                id="exampleFormControlInputTel"
                placeholder={Checkedadhar}
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
              />
              <label for="exampleFormControlInputTel" className="p-4">
                Adhar No is valid
              </label>
              <button
                onClick={adharverify}
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {!isLoading ? "submit" : <Spinner />}
              </button>
            </div>
          </div>
          <div className="text-lg">Submit to fetch user's aadhaar details</div>
        </div>
      </div>
    </Layout>
  );
};

export default Adhar;
