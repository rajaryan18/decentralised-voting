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
  const [user, setUser] = useState(true);
  const [userinfo, setUserInfo] = useState({

  });

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
  const addUser = async (name, dob, aadhar, addr, password) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");

      const smartContract = getEthereumContract();
      const userID = await smartContract.createUser(name, dob, aadhar, addr, password);
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

  //Function to add candidate to election with some election id
  const addCandidate = async (candidate_name, electionID, party_name, candidate_image_url, party_image_url) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const added_candidate = await smartContract.addCandidates(candidate_name, electionID, party_name, candidate_image_url, party_image_url);
      console.log(added_candidate);
    } catch (error) {
      console.log(error);
    }
  }

  // Functio to do vote
  const doVote = async (electionID, candidateID, aadhar) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const votes = await smartContract.doVote(electionID, candidateID, aadhar);
      console.log(votes);
    } catch (error) {
      console.log(error);
    }
  }

  //Function to end Voting(can be done only by election admin)
  const endVoting = async (electionID) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const endVoting_hash = await smartContract.endVoting(electionID);
      console.log(endVoting_hash);
    } catch (error) {
      console.log(error);
    }
  }

  //Function to startVoting(Only election admin can start voting)
  const startVoting = async (electionID) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const startVoting_hash = await smartContract.startVoting(electionID);
      console.log(startVoting_hash);
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get election results
  const getElectionResults = async (electionID) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const electionResult = await smartContract.getElectionResults(electionID);
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get Candidates of particular election with electionID
  const getCandidates = async (electionID) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const candidates = await smartContract.getCandidates(electionID);
      console.log(candidates);
    } catch (error) {
      console.log(error);
    }
  }

  //Function to get all users
  const getAllUsers = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const allUsers = await smartContract.getAllUsers();
      console.log(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  //function of get election created by particular user
  const getElectionOfUser = async (userID) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const elections_by_userID = await smartContract.getElections(userID);
      console.log(elections_by_userID);
    } catch (error) {
      console.log(error);
    }
  }


  //Function to check credentials of particular user
  const checkCredentials = async (userID, password) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const isValidCredentials = await smartContract.checkCredentials(userID);
      console.log(isValidCredentials);
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
        addUser,
        addCandidate,
        user,
        userinfo,
        setUser,
        setUserInfo,
        doVote,
        endVoting,
        startVoting,
        getElectionResults,
        getCandidates,
        getAllUsers,
        getElectionOfUser,
        checkCredentials
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
