import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Web3 from "web3"; // Import Web3

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ABI from "./voting.json";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import WalletConnectButton from "../component/WalletConnectButton";
import { selectError } from "../redux/walletSlice";
const SuperAdmin = () => {
  // const [selectedZone, setSelectedZone] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9;

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
  // const initContract = async () => {
  //   try {
  //     const provider = window.ethereum;
  //     if (typeof provider === "undefined") {
  //       toast.error(
  //         "MetaMask is not installed. Please install it to use this application."
  //       );
  //       return;
  //     }

  //     const web3 = new Web3(provider);
  //     await provider.request({ method: "eth_requestAccounts" });

  //     contract1 = new web3.eth.Contract(
  //       ABI,
  //       "0x0c8Bc9A045b36ba45798bCFCf7ca55ab8eeb88C6"
  //     );
  //     setFetched(true);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   initContract();
  // }, [fetched]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

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
            gasPrice: 30000000,
            gas: 30000000,
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
  };

  const candidatesDB = [
    {
      id: 1,
      name: "John Smith",
      party: "Democratic Party",
      position: "President",
      age: 45,
      experience: "Senator for 10 years",
      prior_office: "Governor",
      image_url: "https://example.com/john_smith.jpg",
    },
    {
      id: 2,
      name: "Jane Doe",
      party: "Republican Party",
      position: "President",
      age: 50,
      experience: "Business Executive",
      prior_office: "None",
      image_url: "https://example.com/jane_doe.jpg",
    },
    {
      id: 3,
      name: "Robert Johnson",
      party: "Independent",
      position: "Governor",
      age: 55,
      experience: "Mayor for 2 terms",
      prior_office: "Mayor",
      image_url: "https://example.com/robert_johnson.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      party: "Green Party",
      position: "Senator",
      age: 38,
      experience: "Environmental Advocate",
      prior_office: "None",
      image_url: "https://example.com/emily_davis.jpg",
    },
    {
      id: 5,
      name: "Michael Wilson",
      party: "Democratic Party",
      position: "Senator",
      age: 50,
      experience: "Former Governor",
      prior_office: "Governor",
      image_url: "https://example.com/michael_wilson.jpg",
    },
    {
      id: 6,
      name: "Sarah Adams",
      party: "Republican Party",
      position: "Mayor",
      age: 42,
      experience: "Business Owner",
      prior_office: "City Council Member",
      image_url:
        "https://static.vecteezy.com/ti/vetor-gratis/p1/2519144-avatar-de-midia-social-gratis-vetor.jpg",
    },
  ];
  const [deadline, setDeadline] = useState("");
  const [displayedDeadline, setDisplayedDeadline] = useState("");
  const handleChange = (event) => {
    setDeadline(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setDisplayedDeadline(deadline);
    console.log(displayedDeadline);
  };
  // const handleZoneChange = (event) => {
  //   setSelectedZone(event.target.value);
  //   setCurrentPage(1);
  // };
  // const filteredData = selectedZone
  //   ? zoneDB.filter((zone) => zone.zoneId === parseInt(selectedZone))
  //   : zoneDB;

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // const currentData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex gap-4 justify-evenly">
          <div className="flex justify-center">
            {!connected ? (
              <WalletConnectButton connected={changeWallet} />
            ) : (
              <button
                onClick={CreateVotingBooth}
                className="bg-green-600 p-2 rounded-md text-white"
              >
                Create Booth
              </button>
            )}
          </div>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              className=" px-2 rounded-md text-white"
            >
              End Vote
            </Button>
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/create-candidate">
              <Button
                variant="contained"
                className="bg-blue-600 p-2 rounded-md text-white"
              >
                Create candidate
              </Button>
            </Link>
          </div>
          <div>
            {displayedDeadline ? (
              <p className="text-lg my-1">
                Deadline Date:{" "}
                {new Date(displayedDeadline).toLocaleDateString()}
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="date"
                  name="deadline"
                  id="date"
                  onChange={handleChange}
                  value={deadline}
                  autoComplete="date"
                  className=" border-0 bg-transparent"
                  placeholder="v"
                />
                <div className="flex">
                  <p className="text-lg font-semibold">Election deadline</p>

                  <button
                    className="border bg-blue-200 text-black  mx-2 px-2 rounded-md"
                    variant="contained"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    SET
                  </button>
                </div>
              </form>
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
            {candidatesDB.map((candidate, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className="flex flex-row justify-between shadow-lg shadow-gray-400 bg-gray-100 rounded-md p-4">
                  <div className="font-semibold">
                    <p>Name : {candidate.name}</p>
                    <p>Age : {candidate.age}</p>
                    <p>Party : {candidate.party}</p>
                    <p>Position : {candidate.position}</p>
                  </div>
                  <div>
                    <img
                      className="h-28 rounded-full"
                      src={candidate.image_url}
                      alt=""
                    />
                  </div>
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
