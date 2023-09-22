import {useState,useEffect } from "react";
import Layout from "../component/Layout/Layout";
import Grid from "@mui/material/Grid";
import Confirmation from "./Confirmation";
import WalletConnectButton from "../component/WalletConnectButton"
import abi from "./voting.json"; 
import { useDispatch, useSelector } from "react-redux";
import {
  initWallet,
  setConnected,
  setError,
} from "../redux/walletSlice.js";
import web3 from 'web3'
// import { ethers } from "ethers";
// import { useWeb3 } from './Web3Context';
// import contractInstance from "./contractInstance";

const Vote = () => {
  
  
  

  
  return (
    <Layout>
      <p className="text-4xl font-bold flex justify-center">Vote</p>

     
        <Grid container spacing={4} className="p-8">
      {/* {candidatesDB.map((candidate, index) => ( */}
            <Grid item xs={12} sm={6} >
              <div className=" rounded-md bg-gray-200 shadow-lg">
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

                  <div className="flex-col text-gray-800">
                    <div className="">
                      <p className="p-4 text-2xl font-bold">lllllll</p>
                    </div>
                    <div className="text-md flex justify-between px-4 my-2">
                      <span className="font-bold">
                        23 | BJP
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
                      Position : "MLA"
                      <span className="font-bold px-2">|</span>
                      Experience : "5"
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          {/* ))} */}
        </Grid>
      
    </Layout>
  );
}
export default Vote;