import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import person from "../../public/person.jpg";
import { useStateContext } from "../../context";
import ElectionCard from "../dashboard/ElectionCard";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import speech from "../../public/speech.svg";
import ProfileElectionCard from "./profileElectionCard";



const ResultCardProfile = ({
  name,
  expandedOn,
  setExpandedOn,
  color,
  electionData,
  eIDs
}) => {

const { getElectionById } = useStateContext();
  return (
    <div className="Ongoing Elections mt-20">
       {
        console.log(typeof(eIDs), eIDs.length, eIDs)
       }
      <div className="flex flex-row ">
        <div
          className={` ${color} rounded-full h-4 w-4 mr-2 ml-2 mt-2 px-2`}
        ></div>

        <div className="text-xl text-white">{name}</div>
        <div className="absolute text-white scale-[1.7] mt-2 right-[10%]">
          <div>
            {!expandedOn ? (
              <div
                onClick={() => {
                  setExpandedOn(true);
                }}
              >
                <IoIosArrowDropdownCircle />
              </div>
            ) : (
              <div
                onClick={() => {
                  setExpandedOn(false);
                }}
              >
                <IoIosArrowDropupCircle />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-[400px] bg-[#1e2742] rounded-xl mt-3  items-center justify-center text-center">
        <ul className="list-none mx-auto my-auto h-[380px] overflow-y-auto no-scrollbar bg-[#1e2742] px-6 py-10 w-fit mt-2  rounded-xl items-between justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {expandedOn
            ? 
            electionData.map((el, ind) => (
                <li key={ind}>
                  <ProfileElectionCard
                    name={el.name}
                    id={ (eIDs.length == 0) ? "" : parseInt(eIDs[0][ind])}
                    votes={parseInt(el.totalVoted)}
                    goto={ (eIDs.length == 0) ? "" : parseInt(eIDs[0][ind])}
                  />
                </li>
              ))
            : electionData.slice(0, 4).map((el, ind) => (
                <li key={ind} className="">
                  <ProfileElectionCard
                    name={el.name}
                    id={ (eIDs.length == 0) ? "" : parseInt(eIDs[0][ind])}
                    // winner={el.winner}
                    votes={parseInt(el.totalVoted)}
                    goto={ (eIDs.length == 0) ? "" : parseInt(eIDs[0][ind])}
                  />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCardProfile;
