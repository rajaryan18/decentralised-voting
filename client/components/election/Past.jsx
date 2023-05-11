import React from 'react'
import Image from 'next/image'
import { useStateContext } from "../../context";
import CandidateResultCard from './CandidateResultCard';
import vote from "../../public/vote.png";


const PastPhase = ({ name, party, electionId, election, votes }) => {

    const { doVote, userinfo } = useStateContext()

    return (
        <div className="bg-primary bg-[#01040f] w-full overflow-hidden flex flex-col align-center pb-[100px]">
            {console.log(election?.table)}
            {/* {console.log(election?.table)} */}
            {/* {console.log("phase is" + election?.table?.candidates)} */}
            <div className="mx-auto h-fit flex-col w-[85%] mt-[10px] rounded-[20px] flex pl-0 md:pl-2 md:text-start text-center items-center justify-center md:items-start md:justify-start   overflow-visible">
                <h2 className="font-bold text-white text-[40px] w-[600px]">
                    Hello <br className="md:hidden block" /> Prateek,
                </h2>
                <p className="text-gradient first-letter:font-bold text-[20px] w-[600px]">
                    Welome to <br className="md:hidden block" /> Decentralized Election
                </p>
            </div>
            <div className="mx-auto h-[170px] pb-4 w-[85%] bg-blue-gradient mt-[10px] rounded-[20px] flex flex-col pl-0 md:pl-[20px] overflow-visible">
                <p className="font-epilogue font-bold flex items-center justify-center text-center md:items-start md:mx-0 mx-auto md:text-start md:justify-start text-4xl md:text-5xl lg:text-6xl text-black mt-[15px] mb-[25px]">
                    Every Vote <br className="md:hidden block" />Counts!
                </p>


                {/* <Image
                    src={vote}
                    alt="vote"
                    className="hidden lg:block w-[290px] h-[290px] pr-[-50px] mt-[-120px] absolute  right-[12%]"
                /> */}
            </div>
            <div className="flex flex-col lg:flex-row w-[100%]">
                <div className=" w-[90%] md:w-[75%] mx-auto mt-[20px] to-transparent rounded-[20px] p-[20px] flex flex-col gap-[20px]">
                    <div className=" text-white/75 flex flex-col  bg-[#1e2742] rounded-xl px-4 py-4 -mt-6 mb-6">
                        <div className='text-center justify-center items-center text-2xl md:text-3xl '> Voting has ended</div>

                    </div>
                    {election?.table[0]?.map((candidate, ind) =>
                        <CandidateResultCard
                            key={ind}
                            name={candidate?.name}
                            party={candidate?.party}
                            electionId={electionId}
                            votes={parseInt(election?.table[1][ind])}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default PastPhase