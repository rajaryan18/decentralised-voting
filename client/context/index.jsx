import React, { useContext, createContext, useEffect, useState } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

import { contractABI, contractAddress } from "./constants"

if (typeof window !== "undefined") {
  var { ethereum } = window;
}
console.log(ethereum);

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  // console.log(provider);
  // console.log(signer);
  console.log((transactionsContract));

  return transactionsContract;
};




export const StateContextProvider = ({ children }) => {

  const [address, setAddress] = useState("");

  //Function to check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try{
      if(!ethereum){
        return alert("Please install MetaMask wallet");
      }

      const accounts = await ethereum.request({
        method: "eth_accounts"
      });
      
      if(accounts.length){
        console.log(accounts);
        setAddress(accounts[0]);
      }else{
        console.log("No Account found");
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  }, [])


  //Function to connect wallet
  const connectWallet = async () => {
    try{
      if(!ethereum) return alert("Please install MetaMask wallet");

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log(accounts);
      setAddress(accounts[0]);
      window.location.reload();
      // console.log(accounts);
    }catch (error){
      console.log(error);
      // throw new Error("No ethereum object");
    }
  };


  const createElection = async () => {
    try {
      if(!ethereum) return alert("Please install MetaMast Wallet");
      getEthereumContract()

    } catch (error) {
      console.log(error);
    }
  }

  const addUser = async (name, dob, aadhar, addr) => {
    try {
      if(!ethereum) return alert("Please install MetaMast Wallet");

      const smartContract = getEthereumContract()
      console.log(ethers.utils.computeAddress(addr));
      const userID = await smartContract.createUser(name, dob, aadhar, address);
      console.log(userID);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        connectWallet,
        checkIfWalletIsConnected,
        createCampaign: createElection,
        addUser
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);