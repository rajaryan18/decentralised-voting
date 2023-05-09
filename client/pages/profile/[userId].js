//Work on user profile here
import { useEffect, useState } from "react";
import { electionData } from "../../components/constants/index"

import { useStateContext } from "../../context";
import { AiFillPlusCircle } from 'react-icons/ai';

import Link from 'next/link'
import { useRouter } from "next/router";
import SearchBar from "../../components/searchBar";
import ResultCardProfile from "../../components/profile/ResultCardProfile";
import ProfileElectionCard from "../../components/profile/profileElectionCard";


export default function Profile() {
    const router = useRouter();
    const jwt = require('jsonwebtoken');


    const { user, getUser, address, userinfo, getElectionResults, getElectionOfUser } = useStateContext();
    const [expandedOn, setExpandedOn] = useState(false);
    const [expandedPast, setExpandedPast] = useState(false);
    const [expandedUpcoming, setExpandedUpcoming] = useState(false);
    const [searchword, setSearchWord] = useState("");
    const [filtereddata, setFilteredData] = useState([]);


    const [userData, setUserData] = useState({
        name: '',
        dob: '',
        aadhar_hash: '',
    })

    const handleChange = (e) => {
        setSearchWord(e.target.value);
        if (searchword === "") {
            setFilteredData([]);
        }
    }

    function onSearch(event) {
        // const searchWord = event.target.value;
        // setSearchWord(searchWord);
        const newFilter = electionData.filter((value) => {
            return (value.id == searchword);
        });
        if (searchword === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(newFilter)
        }
    };

    //tmp_aadhar = aadhar number of current user, tmp_mmsk = metamask id of current user
    //using above info to get data of current user to show in their profile page
    // const tmp_aadhar = "4218507662"
    const tmp_mmsk = "0xe3fd1D5c92EA0aEe2547661BEBd3DE3763BBfDc1"
    const temp_user_info = jwt.verify(userinfo.token, "seekret key(change later and keep in env file)", (err, decoded) => {
        if (err) {
            console.log("session expired login again")
        } else {
            return decoded
        }
    });
    const aadhar_num = temp_user_info?.aadhar;


    useEffect(() => {
        try {
            const csu = getUser(aadhar_num).then((data) => {
                console.log(data);

                var user_elections = [];
                data?.elections.map((elec) => {
                    user_elections.push(parseInt(elec, 10));
                })
                console.log(user_elections);
                setUserData({ ...userData, name: data?.name, dob: data?.dob, aadhar_hash: data?.aadharHash })

                getElectionOfUser(aadhar_num)
            });
        } catch (error) {
            console.log(error);
        }
    }, [])




    if (user)
        return (
            <div className='bg-primary bg-[#01040f]'>


                <div className=" flex  flex-col px-3 sm:px-10 lg:px-24 md:px-20 ">
                    <div className="upperborder h-44 w-full bg-[#1e2742] rounded-t-3xl mt-10 flex items-center justify-center text-center "> <div className="image md:hidden bg-white rounded-full h-32 w-32 "></div></div>
                    <div className="flex flex-row">
                        <div className="hidden rounded-full bg-[#01040f] h-40 w-40 md:flex items-center justify-center ml-10 -mt-20"> <div className="image bg-white rounded-full h-36 w-36 "></div> </div>
                        <div className="Name text-white mt-5 md:mt-2 ml-3 flex flex-col">
                            <div className="text-4xl font-epilogue">{userData.name}</div>
                            <div className="info mt-6">
                                <div className="aadhar text-white  font-epilogue">Aadhar Number: {aadhar_num}</div>
                                <div className="dob text-white mt-1 font-epilogue">DOB: {(userData.dob)}</div>
                            </div>
                        </div>
                        {/* <div className="address ml-12 mt-6 flex flex-row "><div className="adressimage rounded-full bg-red-400 h-4 w-4 mt-1 "></div><div className="text-white text-sm ml-2 ">0x67E73647d7efA79Af20D2badf559208EA8dC5413</div></div> */}
                    </div>

                    <div className="Search Bar mt-20">
                        <div className="mb-4  ml-2 hover:scale-105 duration-200 bg-orange-500 h-10 w-36 px-3 py-2 text-white rounded-2xl  hover:bg-orange-400 flex flex-row"><Link href="/createelection " className=" flex flex-row justify-center items-center">New Election<div className="mt-1 ml-2 "><AiFillPlusCircle /></div ></Link></div>
                        <div className="mb-10 mt-8 flex  "><SearchBar on={(e) => { onSearch(e) }} on1={(e) => { handleChange(e) }} /></div>
                    </div>
                    {!searchword ? <div>
                        <ResultCardProfile name="Upcoming Elections" electionData={electionData} setExpandedOn={setExpandedUpcoming} expandedOn={expandedUpcoming} color="bg-yellow-500" />
                        <ResultCardProfile name="Ongoing Elections" electionData={electionData} setExpandedOn={setExpandedOn} expandedOn={expandedOn} color="bg-green-500" />
                        <ResultCardProfile name="Past Elections" electionData={electionData} setExpandedOn={setExpandedPast} expandedOn={expandedPast} color="bg-red-500" />
                    </div> : !filtereddata.length == 0 ? filtereddata.map((el) => (
                        <div key={el.id} >
                            <ProfileElectionCard
                                name={el.name} id={el.id} winner={el.winner} votes={el.votes} goto={el.id}
                            />
                        </div>

                    )) : <div className="text-white"></div>}



                </div>
            </div >
        )
    else
        return (<div className='h-[470px] bg-[#01040f] w-full flex items-center justify-center text-center text-white bg-primary '>You are not logged in<br />Login to see your profile</div>)

}
