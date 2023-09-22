import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet,  setError } from "../redux/walletSlice.js"; 

const WalletConnectButton = ({changeWallet}) => {
  const dispatch = useDispatch();
 
  const error = useSelector(setError);
console.log(error)
  const handleConnectWallet = async () => {
   
      try {
        dispatch(connectWallet());
        changeWallet();
      } catch (err) {
        console.log(err); 
      }
    
  };

  return (
    <div>
      
        <div>
          <button onClick={handleConnectWallet}>Connect Wallet</button>
          
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </div>
    
    </div>
  );
};

export default WalletConnectButton;