import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Web3 from "web3";
import ABI from "./voting.json";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  initWallet,
 
  selectConnected,
  selectError,
} from "../redux/walletSlice";
import WalletConnectButton from "../redux/walletSlice";

const SuperAdmin = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const error = useSelector(selectError);

  const contract = useSelector((state) => state.wallet.contract);

  useEffect(() => {
    
    const initWalletWithCatch = async () => {
      try {
        await dispatch(initWallet());
      } catch (err) {
        console.log(err); 
      }
    };

    initWalletWithCatch();
  }, [dispatch]);
  useEffect(() => {
    if (error) toast.error(error);
    
  }, [error, dispatch]);

  const zoneDB = [
    {
      zoneId: 40,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 50,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 80,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 45,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 63,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 90,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 40,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 50,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 80,
      voteCount: 500,
      voteCapacity: 800,
    },
    {
      zoneId: 45,
      voteCount: 100,
      voteCapacity: 500,
    },
    {
      zoneId: 63,
      voteCount: 200,
      voteCapacity: 700,
    },
    {
      zoneId: 90,
      voteCount: 500,
      voteCapacity: 800,
    },
  ];

  const CreateVotingBooth = async () => {
    try {
      const candidateNames = ["Amaan", "Satyam", "Sahil"];
      const durationInDays = 1;
      const superAdmin = "0x0DbbFd3deF00C5aAd59A6427e339F0194D00f428";
      contract.methods
        .createBooth(zoneName, candidateNames, votingStart, durationInDays)
        .send({ from: superAdmin })
        .on("transactionHash", (hash) => {
          // Transaction sent; you can track it using the transaction hash
          console.log("Transaction hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          // Transaction confirmed; you can handle the receipt here
          console.log("Confirmation number:", confirmationNumber);
          console.log("Receipt:", receipt);
        })
        .on("error", (error) => {
          // Handle errors here
          console.error("Error:", error);
        });
      //console.log(contract);
    } catch (error) {
      console.log(error);
      alert("Please Install Metamask");
    }
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = selectedZone
    ? zoneDB.filter((zone) => zone.zoneId === parseInt(selectedZone))
    : zoneDB;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <div className="flex flex-col my-4">
        <div className="flex justify-center">
          <button className="bg-red-600 p-2 rounded-md text-white">
            End Vote
          </button>
          <div className="flex my-4 justify-center">
            {!connected && <WalletConnectButton />}
          </div>
        </div>
        <div>
          {/* Dropdown filter by zone */}
          <div className="my-4 mx-16">
            <label className="mr-2">Filter by Zone:</label>
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Zones</option>
              {/* Generate options based on unique zone IDs */}
              {[...new Set(zoneDB.map((zone) => zone.zoneId))].map((zoneId) => (
                <option key={zoneId} value={zoneId}>
                  Zone {zoneId}
                </option>
              ))}
            </select>
          </div>

          <Grid container spacing={4} className="p-8">
            {currentData.map((zone, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className="border-2 border-red-400 p-4">
                  <p>Zone : {zone.zoneId}</p>
                  <p>
                    Total Votes : {zone.voteCount}/{zone.voteCapacity}
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 p-2 rounded-md ${
                  currentPage === index + 1 ? "bg-red-600 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdmin;
