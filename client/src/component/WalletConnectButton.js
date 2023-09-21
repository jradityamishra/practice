import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, selectConnected, selectError } from "./walletSlice"; 
import { toast } from "react-toastify";
const WalletConnectButton = () => {
  const dispatch = useDispatch();
  const connected = useSelector(selectConnected);
  const error = useSelector(selectError);

  const handleConnectWallet = async () => {
    if (!connected) {
      try {
        await dispatch(connectWallet());
      } catch (err) {
        console.log(err); 
      }
    }
  };

  return (
    <div>
      {connected ? (
        <p>Your wallet is connected.</p>
      ) : (
        <div>
          <button onClick={handleConnectWallet}>Connect Wallet</button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
