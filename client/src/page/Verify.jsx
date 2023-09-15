import React, { useState } from "react";
import Layout from "../component/Layout/Layout";
import facemap from "../assets/facemap.png";
import { Button, TextField, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router";

const Verify = () => {
  const nav = useNavigate();
  const userData = {
    //to be fetched for user's data base
    aadhaarId: "4444",
    voterId: "1234",
    faceMap: "",
  };

  const [formData, setFormData] = useState({
    aadhaarId: "",
    voterId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      parseInt(formData.aadhaarId) === parseInt(userData.aadhaarId) &&
      parseInt(formData.voterId) === parseInt(userData.voterId)
    ) {
      nav("/vote");
    } else {
      return <Alert>muihi</Alert>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="flex flex-col items-center gap-8">
          <img
            className="hidden md:block h-80"
            src="https://img.freepik.com/free-vector/abstract-flat-face-recognition-background_23-2148193309.jpg?w=740&t=st=1694637434~exp=1694638034~hmac=6dc3f9fcca6ef52840b589abe03b40a82296d812daef93a5240cd46436ecb704"
            alt=""
          />
          <Box className="px-4" component="form" onSubmit={handleSubmit}>
            <TextField
              id="aadhaar"
              label="Aadhar number"
              variant="outlined"
              name="aadhaarId"
              value={formData.aadhaarId}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="text"
            />
            <TextField
              id="voter"
              label="Voter ID"
              variant="outlined"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              type="text"
            />
            <div className="flex justify-center">
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Verify Identity
              </Button>
            </div>
          </Box>
        </div>
        <div className="shadow-sm shadow-blue-300">
          <img className="" src={facemap} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Verify;
