import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import axios from "axios"; 

const ProtectedRoute3 = () => {
  const [loading, setLoading] = useState(true);
  const [votingStatus, setVotingStatus] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [toastShown, setToastShown] = useState(false); // Add a flag
  const navigate = useNavigate();
  const currentDate = new Date();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vote/get-status");
        const votingStatus = response.data.voting.votingEnd;
        const endDate = new Date(response.data.voting.endDate);
        setVotingStatus(votingStatus);
        setEndDate(endDate);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Show the toast only once when conditions are met
    if (!toastShown && currentDate <= endDate && !votingStatus) {
      toast.info("Results have not been declared yet");
      navigate("/")
      setToastShown(true); // Set the flag to prevent duplicate toasts
    }
  }, [toastShown, currentDate, endDate]);

  if (loading) return <Spinner />;
  
  if (currentDate > endDate && votingStatus) {
    return <Outlet />;
  }
  
  return null; 
};

export default ProtectedRoute3;
