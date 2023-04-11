import { useRouter } from "next/router";
import Image from "next/image";

import vote from "../../public/vote.png"


import CandidateCard from "../../components/CandidateCard"

import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";
import { Model1 } from "../../components/threejs/Echain";


const id = () => {
  const router = useRouter();
  const electionId = router.query.id;
  console.log(electionId);
  return (
    <div className="bg-primary bg-[#01040f] w-full overflow-hidden flex flex-col align-center pb-[100px]">
      <div className="px-[50px] mt-[10px] w-[600px] flex">
        <div className="flex flex-col">
          <h2 className="font-bold text-white text-[40px] w-[600px]">
            Hello Prateek,
          </h2>
          <p className="text-gradient font-bold text-[20px] w-[600px]">
            Welome to decentralized Election
          </p>
        </div>
      </div>
      <div className="ml-[50px] h-[170px] w-[85%] bg-blue-gradient mt-[10px] rounded-[20px] flex  pl-[20px] overflow-visible">
        <p className="font-epilogue font-bold sm:text-[30px] md:text-[60px] text-black mt-[25px] mb-[25px]">
          Every Vote Counts!
        </p>
        <div className="absolute z-[0] w-[10%] h-[40%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[30%] h-[70%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[15%] h-[45%] right-20 bottom-20 blue__gradient" />
        <Image
          src={vote}
          alt="vote"
          className="w-[290px] h-[290px] pr-[-50px] mt-[-120px] absolute  right-[12%]"
        />
      </div>
      <div className="flex w-[100%]">
        <div className=" w-[50%] ml-[50px] mt-[20px] to-transparent rounded-[20px] p-[20px] flex flex-col gap-[20px]">
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
        </div>
        <div className=" w-[50%] mr-[50px] mt-[20px] to-transparent rounded-[20px] p-[20px] flex justify-center items-center">
          <div className="h-[500px] w-[400px] ">
            <Canvas className="mt-8">
              <OrbitControls
                enableZoom={false}
                autoRotate={true}
                enableRotate={false}
                autoRotateSpeed={20}
              />
              <ambientLight intensity={0.6} />

              <directionalLight position={[0, 5, -2]} intensity={1} />
              <directionalLight position={[0, -20, -1]} intensity={0.8} />
              <directionalLight position={[1, 0, -8]} intensity={0.6} />
              <directionalLight position={[-10, 0, -8]} intensity={0.6} />
              <directionalLight position={[0, 30, 0]} intensity={0.5} />

              <Model1 />
            </Canvas>
          </div>
        </div>
      </div>
      {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[30%] h-[50%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
    </div>
  );
};

export default id;
