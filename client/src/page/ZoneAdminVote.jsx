import * as React from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Confirmation from "./Confirmation";

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
    image_url: "https://example.com/sarah_adams.jpg",
  },
  {
    id: 7,
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
const userData = {
  fullName: "Mickael Poulaz",
  username: "noobmaster69",
  imageSrc:
    "https://static.vecteezy.com/ti/vetor-gratis/p1/2519144-avatar-de-midia-social-gratis-vetor.jpg",
  emailAddress: "m.poul@example.com",
  contact: 9876543210,
  address: "Rajendra Nagar, Kota",
  zone: 40,
  voted: false,
};

export default function ZoneAdminVote() {
  const [data, setData] = React.useState(userData);
  const handleVoteClick = () => {
    const updatedUserData = { ...data, voted: true };
    setData(updatedUserData);
    console.log(data);
  };

  return (
    <Layout>
      <p className="text-4xl font-bold flex justify-center">Vote</p>

      {data.voted ? (
        <Confirmation />
      ) : (
        <Grid container spacing={4} className="p-8">
          {candidatesDB.map((candidate, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <div className=" rounded-md bg-gray-800 shadow-lg">
                <div className="md:flex px-4 leading-none max-w-4xl">
                  <div className="flex-none ">
                    <img
                      src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
                      alt="pic"
                      className="h-52 w-44 rounded-md transform -translate-y-4 border-4 border-gray-300 shadow-lg"
                    />{" "}
                    <button
                      type="button"
                      onClick={handleVoteClick}
                      className="border border-gray-400 text-gray-400 rounded-md p-3 ml-8 my-4 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                    >
                      VOTE
                    </button>
                  </div>

                  <div className="flex-col text-gray-300">
                    <div className="">
                      <p className="p-4 text-2xl font-bold">{candidate.name}</p>
                    </div>
                    <div className="text-md flex justify-between px-4 my-2">
                      <span className="font-bold">
                        {candidate.age} | {candidate.party}
                      </span>
                      <span className="font-bold"></span>
                    </div>
                    <p className="hidden md:block px-4 my-4 text-sm text-left">
                      In Gotham City, mentally troubled comedian Arthur Fleck is
                      disregarded and mistreated by society. He then embarks on
                      a downward spiral of revolution and bloody crime. This
                      path brings him face-to-face with his alter-ego: the
                      Joker.{" "}
                    </p>

                    <p className="flex text-md p-4 my-4">
                      Position : {candidate.position}
                      <span className="font-bold px-2">|</span>
                      Experience : {candidate.experience}
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
