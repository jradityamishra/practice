import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Web3 from "web3"; // Import Web3

import ABI from "./voting.json";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import WalletConnectButton from "../component/WalletConnectButton";
import { selectError } from "../redux/walletSlice";
const SuperAdmin = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const sessionStorageConnected = JSON.parse(
      sessionStorage.getItem("connected")
    );
    if (sessionStorageConnected) {
      setConnected(sessionStorageConnected);
    }
  }, []);
  const address = JSON.parse(sessionStorage.getItem("address")) || "";

  const error = useSelector(selectError);
  const [fetched, setFetched] = useState(false);
  let contract1;
  const initContract = async () => {
    try {
      const provider = window.ethereum;
      if (typeof provider === "undefined") {
        toast.error(
          "MetaMask is not installed. Please install it to use this application."
        );
        return;
      }

      const web3 = new Web3(provider);
      await provider.request({ method: "eth_requestAccounts" });

      contract1 = new web3.eth.Contract(
        ABI,
        "0x0c8Bc9A045b36ba45798bCFCf7ca55ab8eeb88C6"
      );
      setFetched(true);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    initContract();
  }, [fetched]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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

  // const contract1 = useSelector(selectContract);
/*
  const CreateVotingBooth = async () => {
    try {
      if (fetched) {
        const candidateNames = ["AAP", "TMC", "BJP", "CPIM"];
        const durationInDays = 5;
        const votingStart = Date.now();
        const superAdmin = address;
        const zoneName = "Ruby";
        console.log("here");
        console.log(contract1);
        await contract1.methods
          .AddSuperAdminVF(superAdmin)
          .send({ 
          from: superAdmin,
          gas:30000000
        })
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

        // await contract1.methods
        //   .createVotingContract(zoneName)
        //   .send({ from: superAdmin ,gas:30000000})
        //   .on("transactionHash", (hash) => {
        //     // Transaction sent; you can track it using the transaction hash
        //     console.log("Transaction hash:", hash);
        //   })
        //   .on("confirmation", (confirmationNumber, receipt) => {
        //     // Transaction confirmed; you can handle the receipt here
        //     console.log("Confirmation number:", confirmationNumber);
        //     console.log("Receipt:", receipt);
        //   })
        //   .on("error", (error) => {
        //     // Handle errors here
        //     console.error("Error:", error);
        //   });

        // await contract1.methods
        //   .initiateVotingVF(candidateNames, durationInDays)
        //   .send({ from: superAdmin ,gas:30000000})
        //   .on("transactionHash", (hash) => {
        //     // Transaction sent; you can track it using the transaction hash
        //     console.log("Transaction hash:", hash);
        //   })
        //   .on("confirmation", (confirmationNumber, receipt) => {
        //     // Transaction confirmed; you can handle the receipt here
        //     console.log("Confirmation number:", confirmationNumber);
        //     console.log("Receipt:", receipt);
        //   })
        //   .on("error", (error) => {
        //     // Handle errors here
        //     console.error("Error:", error);
        //   });
      }

      //console.log(contract1);
    } catch (error) {
      console.log(error);
      alert("Please Install Metamask");
    }
  };
  const changeWallet = () => {
    setConnected(true);
    console.log(connected);
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
*/
  return (
    <Layout>
      <div className="flex flex-col my-4">
        <div className="flex justify-center">
          <button className="bg-red-600 p-2 rounded-md text-white">
            End Vote
          </button>
          <div className="flex my-4 justify-center">
            {!connected ? (
              <WalletConnectButton />
            ) : (
              <button
                // onClick={CreateVotingBooth}
                className="bg-green-600 p-2 rounded-md text-white"
              >
                Create Booth
              </button>
            )}
          </div>
        </div>
        <div>
          {/* Dropdown filter by zone */}
          {/* <div className="my-4 mx-16">
            <label className="mr-2">Filter by Zone:</label>
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Zones</option>
              {[...new Set(zoneDB.map((zone) => zone.zoneId))].map((zoneId) => (
                <option key={zoneId} value={zoneId}>
                  Zone {zoneId}
                </option>
              ))}
            </select>
          </div> */}

          <Grid container spacing={4} className="p-8">
            {zoneDB.map((zone, index) => (
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
          {/* <div className="flex justify-center mt-4">
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
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdmin;
