import React from 'react'
import Image from 'next/image'
import person from '../../public/person.jpg'
import { useStateContext } from "../../context";

const CandidateCardNoVote = ({ name, party, electionId, candidateId }) => {

    const { } = useStateContext()

    return (
        <div className='h-fit w-[100%] bg-[#1e2742] rounded-b-md rounded-t-3xl md:rounded-tr-[15px] md:rounded-br-[15px] md:rounded-tl-[40px] md:rounded-bl-[40px] overflow-visible ' >
            <div className='flex md:flex-row flex-col items-center'>
                <Image src={person} alt="vote" className="w-[130px] h-[130px] rounded-full ml-[-10px] md:mt-[-5px] -mt-3" />
                <div className=" ml-[5px] mb-6 mb:mb-0 w-[90%] md:w-[80%] mt-6  rounded-[15px] flex flex-col justify-center text-center md:text-start md:justify-start h-fit md:my-auto p-[5px] gap-2 md:gap-[20px] self-center" >
                    <p className='text-white' ><span className='text-gradient' >Name: </span> {name}</p>
                    <p className='text-white' ><span className='text-gradient' >Party: </span> {party}</p>
                </div>
            </div>
        </div>
    )
}

export default CandidateCardNoVote