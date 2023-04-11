import React from 'react'
import Image from 'next/image'
import person from '../public/person.jpg'
import { useStateContext } from "../context";

const CandidateCard = ({name, party, electionId, candidateId}) => {

  const {doVote, userinfo} = useStateContext()

  const aadhar_num = userinfo.aadhar;
  const handleVote = () =>{
    try {
      doVote(electionId, candidateId, aadhar_num)
    } catch (error) {
      console.log("here");
    }
  }
  return (
    <div className='h-[120px] w-[97%] bg-[#1e2742] rounded-tr-[15px] rounded-br-[15px] rounded-tl-[40px] rounded-bl-[40px] overflow-visible ' >
        <div className='flex items-center'>
        <Image src={person} alt="vote" className="w-[130px] h-[130px] rounded-full ml-[-10px] mt-[-5px]"/>
        <div className=" ml-[5px] h-[120px] w-[50%] mt-[-5px] rounded-[15px] flex flex-col justify-start p-[15px] gap-[20px] self-center" >
            <p className='text-white' ><span className='text-gradient' >Name: </span> {name}</p>
            <p className='text-white' ><span className='text-gradient' >Party: </span> {party}</p>
        </div>
        <div onClick={handleVote} className="h-[40px] w-[120px] bg-gradient-to-r from-orange-500 via-golden-500 to-yellow-500 rounded-[15px] flex justify-center items-center font-epilogue hover:cursor-pointer hover:scale-105 hover:shadow-md duration-300" >
            <p>Cast Vote</p>
        </div>
        </div>
    </div>
  )
}

export default CandidateCard