import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import axios from "axios";

const ProtectedRoute2 = () => {
  const [loading, setLoading] = useState(true);
  const [votingStatus, setVotingStatus] = useState(false);
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("user"));
  const hasVoted = data.hasVoted;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/vote/get-status");
        const votingStatus = response.data.voting.votingStart;
        setVotingStatus(votingStatus);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (votingStatus && !hasVoted) return <Outlet />;
  if (!votingStatus) {
    
   
    navigate("/");
    toast.info("Voting has not started yet");
  }
  else if (hasVoted) {
    
    
    navigate("/confirmed");
   
  }
  return null;
};

export default ProtectedRoute2;
