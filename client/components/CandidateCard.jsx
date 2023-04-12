import React from 'react'
import Image from 'next/image'
import person from '../public/person.jpg'
import { useStateContext } from "../context";

const CandidateCard = ({ name, party, electionId, candidateId }) => {
  const jwt = require('jsonwebtoken');
  const { doVote, userinfo } = useStateContext()
  const temp_user_info = jwt.verify(userinfo.token, "seekret key(change later and keep in env file)", (err, decoded) => {
    if (err) {
      console.log("session expired login again")
    } else {
      return decoded
    }
  });
  const aadhar_num = temp_user_info?.aadhar;
  const handleVote = () => {
    try {
      doVote(electionId, candidateId, aadhar_num)
    } catch (error) {
      console.log("here");
    }
  }
  return (
    <div className='h-fit w-[100%] bg-[#1e2742] rounded-b-md rounded-t-3xl md:rounded-tr-[15px] md:rounded-br-[15px] md:rounded-tl-[40px] md:rounded-bl-[40px] overflow-visible ' >
      <div className='flex md:flex-row flex-col items-center'>
        <Image src={person} alt="vote" className="w-[130px] h-[130px] rounded-full ml-[-10px] md:mt-[-5px] -mt-3" />
        <div className=" ml-[5px] h-[120px] w-[90%] md:w-[80%] mt-[-5px] rounded-[15px] flex flex-col justify-center text-center md:text-start md:justify-start p-[5px] gap-2 md:gap-[20px] self-center" >
          <p className='text-white' ><span className='text-gradient' >Name: </span> {name}</p>
          <p className='text-white' ><span className='text-gradient' >Party: </span> {party}</p>
        </div>
        <div onClick={handleVote} className={` {props.button} h-[40px] w-[120px] mb-4 mr-0 md:mr-4 md:mb-0 bg-gradient-to-r from-orange-500 via-golden-500 to-yellow-500 rounded-[15px] flex justify-center items-center font-epilogue hover:cursor-pointer hover:scale-105 hover:shadow-md duration-300`} >
          <p>Cast Vote</p>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard