import { useRouter } from "next/router"
import Image from 'next/image'
import vote from "/public/vote.png";
import CandidateCard from "../components/CandidateCard";

const id = () => {
    const router = useRouter();
    const electionId = router.query.id;
  return (
    <div className="bg-primary bg-[#01040f] w-full overflow-hidden flex flex-col align-center pb-[100px]" >
        <div className="px-[50px] mt-[10px] w-[600px] flex" >
          <div className="flex flex-col">
          <h2 className="font-bold text-white text-[40px] w-[600px]" > Hello Prateek,</h2>
          <p className="text-gradient font-bold text-[20px] w-[600px]" >Welome to Devote</p>
          </div>
          
        </div>
          <div className="ml-[50px] h-[190px] w-[85%] bg-blue-gradient mt-[10px] rounded-[20px] flex  pl-[20px] overflow-visible" >
              <h2 className="font-epilogue font-bold text-[80px] text-black mt-[25px]" >Every Vote Counts!</h2>

              <div className="absolute z-[0] w-[10%] h-[40%] top-0 pink__gradient" />
              <div className="absolute z-[1] w-[30%] h-[70%] rounded-full white__gradient bottom-40" />
              <div className="absolute z-[0] w-[15%] h-[45%] right-20 bottom-20 blue__gradient" />

              <Image src={vote} alt="vote" className="w-[290px] h-[290px] pl-[-50px] mt-[-120px] ml-[170px]"/>
          </div>
        <div className="h-[1000px] w-[50%] ml-[50px] mt-[20px] bg-blue-200 p-[20px]">
          <CandidateCard />
        </div>
    </div>
  )
}

export default id