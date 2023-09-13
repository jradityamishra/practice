import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

export default function Vote() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Layout>
      <p className="text-4xl font-semibold flex justify-center">Vote</p>
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
                    disregarded and mistreated by society. He then embarks on a
                    downward spiral of revolution and bloody crime. This path
                    brings him face-to-face with his alter-ego: the Joker.{" "}
                  </p>

                  <p className="flex text-md px-4 my-4">
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
    </Layout>
  );
}