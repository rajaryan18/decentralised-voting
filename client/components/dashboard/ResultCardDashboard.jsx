import React from 'react'
import Image from 'next/image'
import person from '../../public/person.jpg'
import { useStateContext } from "../../context";
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";
import speech from '../../public/speech.svg'
import ElectionCard from './ElectionCard';


const ResultCardDashboard = ({ name, expandedOn, setExpandedOn, color, allElections }) => {

    return (
        <div className=" Elections">

            <div className="flex flex-row  ">

                <div className={`${color} rounded-full h-4 w-4 mr-2 ml-8 mt-2 px-2`}></div>

                <div className="text-xl text-white">{name} </div>
                <div className="absolute text-white scale-[1.7] mt-2 right-[4%]"><div>{!expandedOn ? <div onClick={() => { setExpandedOn(true) }}><IoIosArrowDropdownCircle /></div> : <div onClick={() => { setExpandedOn(false) }}><IoIosArrowDropupCircle /></div>}</div></div>

            </div>
            <div className="mx-auto flex h-[500px] w-[97%] bg-[#1e2742] rounded-xl mt-3  items-center justify-center text-center">

                <ul className="mx-2 w-[97%] rounded-4xl list-none  my-auto h-[480px]  overflow-y-auto no-scrollbar bg-[#1e2742] py-10  mt-2 items-between justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {expandedOn ? allElections.table?.map((election, ind) => (
                        <li className="mx-4" key={election.id} >
                            <ElectionCard
                                key={ind}
                                id={ind}
                                title={election?.name}
                                candidateCount={election?.candidates?.length}
                                TotalVotes={parseInt(election?.totalVoted, 10)}
                                imageURL={speech}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum,"}
                                phase={election?.currPhase}
                            />
                        </li>
                    )) :
                        allElections.table?.slice(0, 2).map((election, ind) => (
                            <li className="mx-4" key={election.id} >
                                <ElectionCard
                                    key={ind}
                                    id={ind}
                                    title={election?.name}
                                    candidateCount={election?.candidates?.length}
                                    TotalVotes={parseInt(election?.totalVoted, 10)}
                                    imageURL={speech}
                                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, "}
                                    phase={election?.currPhase}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ResultCardDashboard