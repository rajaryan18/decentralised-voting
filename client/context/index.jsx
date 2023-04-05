import React, { useContext, createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
const StateContext = createContext();
import { contractABI, contractAddress } from "./constants";
import convertToUNIX from "../utils/helper_functions"
if (typeof window !== "undefined") {
  var { ethereum } = window;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionsContract;
};


export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");

  //Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask wallet");
      }

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
      } else {
        console.log("No Account found");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  //Function to connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask wallet");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  /*THIS FUNCTION IS YET TO BE COMPLETED (HAVE TO CONVERT DATE IN UNIX FORMAT) */
  //Function to create election
  const createElection = async (userID, image_url, aadhar, election_name, start_date, end_date) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const election_count = await smartContract.createElection(userID, image_url, aadhar, election_name, start_date, end_date);
      console.log(election_count);
    } catch (error) {
      console.log(error);
    }
  };


  //Function to create new user (Sign Up)
  const addUser = async (name, dob, aadhar, addr) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");

      const smartContract = getEthereumContract();
      const userID = await smartContract.createUser(name, dob, aadhar, addr);
    } catch (error) {
      console.log(error);
    }
  };


  //Function to get any user
  const getUser = async (userID, aadhar, address) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");

      const smartContract = getEthereumContract();
      const req_user = await smartContract.getUser(userID, aadhar, address);
    } catch (error) {
      console.log(error);
    }
  };


  const test_aadhar = "2309457323";
  useEffect(() => {
    getUser(1, test_aadhar, address);
  }, []);


  return (
    <StateContext.Provider
      value={{
        address,
        connectWallet,
        checkIfWalletIsConnected,
        createCampaign: createElection,
        addUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
