import React from "react";
import Image from "next/image";
import ether from "../public/ethereum-2879620.png";

const ElectionCard = () => {
  return (
    <div className="card text-white bg-[#1c1c24] z-[20px] h-[450px] w-[290px] flex items-center flex-col align-center hover:scale-105 duration-300">
      <Image
        priority={true}
        src={ether}
        alt="ether"
        className="w-[290px] h-[270px] "
      />
      <div className="w-[100%] h-[180px] flex flex-col item-center mt-[5px]">
        <h3 className="font-epilogue text-gradient">Election Name</h3>
        <div className="w-[90%] h-[1px] bg-[#808191] self-center my-[5px]" />
        <div className="flex justify-between align-center px-[5px] mt-[5px]">
          <p className="text-[#b2b3bd]">
            Candidates: <span className="text-[#808191]">69</span>
          </p>
          <p className="text-[#b2b3bd]">
            Total votes: <span className="text-[#808191]">6969</span>
          </p>
        </div>
        <div className="flex justify-start px-[5px] " >
            <p className="text-gradient" >About</p>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
