import * as React from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";

const candidatesDB = [
  {
    id: 1,
    voteCount: 10000,
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
    voteCount: 20000,
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
    voteCount: 60000,
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
    voteCount: 60000,
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
    voteCount: 90000,
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
    voteCount: 110000,
    name: "Sarah Adams",
    party: "Republican Party",
    position: "Mayor",
    age: 42,
    experience: "Business Owner",
    prior_office: "City Council Member",
    image_url: "https://example.com/sarah_adams.jpg",
  },
  {
    id: 7,
    voteCount: 40000,
    name: "David Lopez",
    party: "Independent",
    position: "Governor",
    age: 48,
    experience: "Former Senator",
    prior_office: "Senator",
    image_url: "https://example.com/david_lopez.jpg",
  },
  {
    id: 8,
    voteCount: 1000,
    name: "Olivia Turner",
    party: "Democratic Party",
    position: "Mayor",
    age: 39,
    experience: "Community Organizer",
    prior_office: "None",
    image_url: "https://example.com/olivia_turner.jpg",
  },
];
//Fetch both the data from database

export default function Vote() {
  const sortedResults = [...candidatesDB];

  sortedResults.sort((a, b) => b.voteCount - a.voteCount);

  return (
    <Layout>
      <p className="text-4xl font-bold flex justify-center">Results</p>

      <Grid container spacing={4} className="p-8">
        {sortedResults.map((candidate, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <div className=" rounded-md bg-gray-800 shadow-lg">
              <div className="md:flex px-4 leading-none max-w-4xl">
                <div className="flex-none ">
                  <img
                    src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                    alt="pic"
                    className="h-40 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                  />{" "}
                </div>

                <div className="flex-col text-gray-300">
                  <div className="">
                    <p className="p-4 text-2xl font-bold">{candidate.name}</p>
                  </div>
                  <div className="text-xl flex justify-between px-4 my-2">
                    <span className="font-bold">{candidate.party}</span>
                  </div>
                  <div className="text-xl flex justify-between px-4 my-2">
                    <p className="font-bold">Votes : {candidate.voteCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
