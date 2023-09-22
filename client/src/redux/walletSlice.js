// walletSlice.js

import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import ABI from '../page/voting.json';

const initialState = {
  web3Data: null,
  contractAddress: null, // Store the contract address as a string
  connected: false,
  error: null,
  initialized: false,
  accountAddress: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWeb3Data: (state, action) => {
      // Store only the relevant properties from Web3
      state.web3Data = {
        currentProvider: action.payload.currentProvider, // Store the provider URL
        // Add other properties as needed
      };
    },
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    setContractAddress: (state, action) => {
      state.contractAddress = action.payload; // Store the contract address as a string
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWeb3Data,
  setContractAddress,
  setConnected,
  setInitialized,
  setAccountAddress,
  setError,
} = walletSlice.actions;

export const initWallet = () => async (dispatch) => {
  try {
    const provider = window.ethereum;
    if (typeof provider === 'undefined') {
      dispatch(setError('MetaMask is not installed. Please install it to use this application.'));
      return;
    }

    const web3 = new Web3(provider);
    await provider.request({ method: 'eth_requestAccounts' });
    
    const contract = new web3.eth.Contract(
      ABI,
      '0x0c8Bc9A045b36ba45798bCFCf7ca55ab8eeb88C6'
    );
    sessionStorage.setItem("contract", JSON.stringify(contract));
    const web3Data = {
      // Store the provider URL
      currentProvider: web3.currentProvider.host,
      // Add other properties as needed
    };
    
    dispatch(setWeb3Data(web3Data));
    // Store the contract address as a string
    
    dispatch(setContractAddress('0x0c8Bc9A045b36ba45798bCFCf7ca55ab8eeb88C6'));
    
    dispatch(setInitialized(true));
  } catch (error) {
    console.error(error);
    dispatch(setError('An error occurred. Please try again.'));
  }
};

export const connectWallet = () => async (dispatch, getState) => {
  try {
    if (window.ethereum !== undefined) {
      await window.ethereum.send('eth_requestAccounts');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts && accounts.length > 0) {
        const accountAddress = accounts[0];
        dispatch(setConnected(true));
        dispatch(setError(null));
        dispatch(setAccountAddress(accountAddress));
        sessionStorage.setItem("address", JSON.stringify(accountAddress));
        sessionStorage.setItem("connected",true)
        console.log(accountAddress)
      }
    } else {
      dispatch(setError('MetaMask is not installed or unavailable.'));
    }
    
  } catch (error) {
    console.error('MetaMask connection error:', error);
    dispatch(setError('An error occurred while connecting to MetaMask.'));
  }
};

export const selectConnected = (state) => state.wallet.connected;
export const selectError = (state) => state.wallet.error;
export const selectAccount = (state) => state.wallet.accountAddress;
export default walletSlice.reducer;
