import React, { useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { GiLaurelsTrophy } from "react-icons/gi";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

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
      <div className="flex justify-center flex-col md:flex-row">
        <div className="md:w-1/2  m-8  flex justify-center flex-col">
          <div className="items-center flex flex-col justify-center">
            <div className="bg-[#dbf2b8] rounded-xl mb-16">
              <div className="flex flex-row items-center justify-center p-8 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-96 md:w-auto shadow-green-100">
                <div className="mx-8  font-semibold text-xl">
                  <p className="text-xl flex flex-shrink">
                    Winner{" "}
                    <GiLaurelsTrophy
                      size={30}
                      className="text-amber-600 ml-4"
                    />
                  </p>
                  <p className="font-bold text-md">
                    Party : {winner.partyName}
                  </p>
                  <br />
                  <p className="font-bold text-md">Votes : {winner.votes}</p>
                  <br />
                  <p className="text-2xl font-bold bg-[#F4F5FA] p-2 mt-3 rounded-lg  border border-[#F0F0F6] shadow-xl">
                    Name : {winner.name}
                  </p>
                </div>
                <div className="my-4 flex flex-shrink">
                  <img className="h-40" src={winner.picture} alt="" />
                </div>
              </div>
            </div>
            <div>
              <BarChart width={600} height={250} data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                <Bar dataKey="voteCount" fill="#a55200" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8">
          <Grid container spacing={4} className="p-4">
            {results.map((candidate, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <div className=" rounded-md bg-blue-100 shadow-lg">
                  <div className="md:flex px-4 leading-none max-w-4xl">
                    <div className="flex-none ">
                      <img
                        src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                        alt="pic"
                        className="h-32 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                      />
                    </div>

                    <div className="flex-col text-gray-800 pb-2">
                      <div className="">
                        <p className="p-4 text-xl font-semibold">
                          {candidate.name}
                        </p>
                      </div>

                      <div className="text-lg flex justify-between px-4 my-2">
                        <p className="font-medium">
                          Votes : {candidate.voteCount}
                        </p>
                      </div>

                      <div className="text-lg flex justify-between px-4 my-2">
                        <p className="font-medium">
                          Party : {candidate.partyName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
