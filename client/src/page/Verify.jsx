import React, { useState } from "react";
import Layout from "../component/Layout/Layout";
import aadhaar from "../assets/aadhaar.png";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../component/Spinner";

const Verify = () => {
  const nav = useNavigate();
  const [adharNo, setAdharNo] = useState("");
  const [adharData, setAdharData] = useState(false);
  //function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adharNo.length != 12) {
      toast.error("plase provide proper Adhar No");
    } else {
      try {
        const data = await axios.post("/adhar/getadhardetail", {
          adharNo: adharNo,
        });
        const adhar = data.data.data.adharNo;
        localStorage.setItem("adharNo", adhar);
        console.log(adhar);

        if (adharNo == adhar) {
          // nav('/adhar')
          setAdharData(false);
          nav("/adhar");
        } else {
          toast.error("something is error in matching adhar No");
        }
      } catch (error) {
        console.log(error);
        toast.error("something is error please check");
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">Validate your Adhar No</h1>
          <img className="hidden md:block h-80" src={aadhaar} alt="" />
          <Box className="px-4" component="form" onSubmit={handleSubmit}>
            <TextField
              id="aadhaar"
              label="Aadhar number"
              variant="outlined"
              name="aadhaarId"
              value={adharNo}
              onChange={(e) => {
                setAdharNo(e.target.value);
              }}
              required
              fullWidth
              margin="normal"
              type="text"
            />

            <div className="flex justify-center">
              <Button
                variant="contained"
                type="submit"
                onClick={() => {
                  setAdharData(true);
                }}
                sx={{ mt: 2 }}
              >
                {!adharData ? "Validate" : <Spinner />}
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
