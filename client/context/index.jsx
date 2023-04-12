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

//use local storage hook
function useLocalStorage(key, initialValue, isSSR) {
  const [storedValue, setStoredValue] = useState(() => {
    if (!isSSR) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (!isSSR) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}


export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [user, setUser] = useLocalStorage("user", false, isSSR);
  const [userinfo, setUserInfo] = useLocalStorage("userinfo", {}, isSSR);


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
  const createElection = async (image_url, aadhar, election_name, start_date, end_date) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const election_count = await smartContract.createElection(image_url, aadhar, election_name, start_date, end_date);
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
      await userID.wait();
      const validate = await checkCredentials(aadhar, password);
      return validate;

    } catch (error) {
      console.log(error);
    }
  };


  //Function to get any user
  const getUser = async (aadhar, address) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");

      const smartContract = getEthereumContract();
      const req_user = await smartContract.getUser(aadhar, address);
      return req_user;
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
      console.log(error.message);
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
      console.log(electionResult);
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
  const getElectionOfUser = async (aadhar) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const elections_by_userID = await smartContract.getElections(aadhar);
      console.log(elections_by_userID);
    } catch (error) {
      console.log(error);
    }
  }


  //Function to check credentials of particular user
  const checkCredentials = async (aadhar, password) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const isValidCredentials = await smartContract.checkCredentials(aadhar, password);
      console.log(isValidCredentials);
      return isValidCredentials

    } catch (error) {
      console.log(error);
    }
  }

  //Function to get election by id
  const getElectionById = async (election_id) => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const election = await smartContract.getElectionById(election_id);
      console.log(election);
      return election
    } catch (error) {
      console.log(error);
    }
  }

  const getAllElections = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask Wallet");
      const smartContract = getEthereumContract();
      const allElections = await smartContract.getAllElections();
      // console.log(allElections);
      return allElections
    } catch (error) {
      console.log(error);
    }
  }

  // const tmp_aadhar = "4218507662"
  // useEffect(()=>{
  //   const allelec = getAllElections().then((data)=>{
  //     console.log(data[0].name);
  //     // console.log(data[0].candidates[1].name);
  //   })
  //   // console.log(allelec);
  // },[])


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
        checkCredentials,
        getUser,
        getElectionById,
        getAllElections
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
