import React, { useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import axios from "axios";

//Fetch both the data from database
// /api/vote/get-results

export default function Vote() {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [winner, setWinner] = React.useState({
    name: "",
    partyName: "",
    votes: "",
  });

  useEffect(() => {
    const getResults = async () => {
      try {
        if (loading) {
          const response = await axios.get(`/api/vote/get-results/`);
          if (response.data) {
            console.log(response.data);
            setResults(response.data.candidatesWithVoteCount);
            setWinner(response.data.candidateWithMaxVotes);
            console.log(winner);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    getResults();
  }, []);

  return (
    <Layout>
      <p className="text-4xl font-bold flex justify-center">Results</p>
      <div className="flex justify-center flex-col">
        <div className="border border-red-300 flex justify-center flex-col">
          Winner : {winner.name}
        </div>
        <Grid container spacing={4} className="p-8">
          {results.map((candidate, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <div className=" rounded-md bg-blue-100 shadow-lg">
                <div className="md:flex px-4 leading-none max-w-4xl">
                  <div className="flex-none ">
                    <img
                      src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                      alt="pic"
                      className="h-40 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                    />
                  </div>

                  <div className="flex-col text-gray-800 pb-4">
                    <div className="">
                      <p className="p-4 text-2xl font-bold">{candidate.name}</p>
                    </div>

                    <div className="text-xl flex justify-between px-4 my-2">
                      <p className="font-bold">Votes : {candidate.voteCount}</p>
                    </div>

                    <div className="text-xl flex justify-between px-4 my-2">
                      <p className="font-bold">Votes : {candidate.partyName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
