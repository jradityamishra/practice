import { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Confirmation from "./Confirmation";
import WalletConnectButton from "../component/WalletConnectButton";
import abi from "./voting.json";
import { useDispatch, useSelector } from "react-redux";
import { initWallet, setConnected, setError } from "../redux/walletSlice.js";
import web3 from "web3";
import axios from "axios";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
// import { ethers } from "ethers";
// import { useWeb3 } from './Web3Context';
// import contractInstance from "./contractInstance";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/registerCandidate/candidate");
      if (res.data) {
        const d = res.data.data;
        console.log(d);
        setCandidates(d);
        setLoading(false);
        console.log(candidates);
      }
    };
    getData();
  }, []);
  const initiateVote = async (cid) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const id = user._id;
     
      const res = await axios.put(`/registerCandidate/vote/${id}/${cid}`);
      if (res.status === 201) {
        toast.success("Your vote has been registered! Thank you for voting");
        navigate("/confirmed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Spinner />;
  return (
    <Layout>
      <p className="text-4xl font-bold flex justify-center">Vote</p>

      <Grid container spacing={4} className="p-8">
        {candidates.map((candidate, index) => (
          <Grid item xs={12} sm={6}>
            <div
              className=" rounded-md bg-gray-200 shadow-lg"
              key={candidate._id}
            >
              <div className="md:flex px-4 leading-none max-w-4xl">
                <div className="flex-none ">
                  <img
                    src={candidate.picture}
                    className="h-52 w-44 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                  />{" "}
                  <button
                    type="button"
                    className="border border-gray-400 text-gray-400 rounded-md p-3 ml-8 my-4 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    onClick={() => initiateVote(candidate._id)}
                  >
                    VOTE
                  </button>
                </div>

                <div className="flex-col text-gray-800">
                  <div className="">
                    <p className="p-4 text-2xl font-bold">{candidate.name}</p>
                  </div>
                  <div className="text-md flex justify-between px-4 my-2">
                    <span className="font-bold">
                      {candidate.age} | {candidate.partyName}
                    </span>
                    <span className="font-bold"></span>
                  </div>

                  <p className="flex text-md p-4 my-4">
                    Position : {candidate.position}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
export default Vote;
