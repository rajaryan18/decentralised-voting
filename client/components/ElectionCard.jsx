import React from "react";
import Image from "next/image";


const ElectionCard = ({ title, candidateCount, TotalVotes, description, imageURL }) => {
  return (
    <div className="hover:cursor-pointer overflow-hidden overflow-y-hidden card rounded-2xl text-white bg-[#1c1c24] z-[20px] h-[400px] w-[290px] flex items-center flex-col align-center hover:scale-105 duration-300">
      <Image
        priority={true}
        src={imageURL}
        alt="ether"
        className="w-[290px] h-[270px] "
      />
      <div className="w-[100%] h-[180px] flex flex-col item-center mt-[5px]">
        <h3 className="font-epilogue text-gradient font-bold">{title}</h3>
        {/* <div className="w-[90%] h-[1px] bg-[#808191] self-center my-[5px]" /> */}
        <div className="flex justify-between align-center px-[5px] mt-[5px]">
          <p className="text-[#808191]">
            <span className="text-[#b2b3bd] font-semibold" >Candidates: </span> {candidateCount}
          </p>
          <p className="text-[#808191]">
            <span className="text-[#b2b3bd] font-semibold" >Total votes: </span>{TotalVotes}
          </p>
        </div>
        <div className="flex justify-start mx-[5px] text-left mt-[10px]">
          <p className="text-[#808191] text-epilogue" > <span className="text-[#b2b3bd] font-semibold" >About: </span> {description}</p>

        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
