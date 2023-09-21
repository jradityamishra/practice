// walletSlice.js

import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import ABI from '../page/voting.json';

const initialState = {
  web3: null,
  contract: null,
  connected: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWeb3: (state, action) => {
      state.web3 = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWeb3, setContract, setConnected, setError } = walletSlice.actions;

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

    dispatch(setWeb3(web3));
    dispatch(setContract(contract));
    dispatch(setConnected(true));
  } catch (error) {
    console.error(error);
    dispatch(setError('An error occurred. Please try again.'));
  }
};

export const connectWallet = () => async (dispatch, getState) => {
  try {
    if (window.ethereum !==undefined) {
      await window.ethereum.send('eth_requestAccounts');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const state = getState(); 
      
      if (accounts && accounts.length > 0) {
        dispatch(setConnected(true));
        dispatch(setError(null));
        state.wallet.web3.setAccount(accounts[0]); 
      }
    } else {
      dispatch(setError('MetaMask is not installed or unavailable.'));
     
    }
  } catch (error) {
    console.error('MetaMask connection error:', error);
    dispatch(setError('An error occurred while connecting to MetaMask.'));
  }
};

export default walletSlice.reducer;
