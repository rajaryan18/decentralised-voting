import { useRouter } from "next/router";
import Image from "next/image";
import vote from "../../public/vote.png"
import CandidateCard from "../../components/election/CandidateCard"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model1 } from "../../components/threejs/Echain";
import { useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { electionData } from "../../components/constants";
import CandidateCardNoVote from "../../components/election/CandidateCardNoVote";
import PrePhase from "../../components/election/Pre";
import Loader2 from "../../components/Loader2";


const id = () => {
  const router = useRouter();
  const electionId = router.query.id;
  const { getElectionResults, getElectionOfUser, getElectionById, startVoting, endVoting } = useStateContext();
  const [isLoading, setisLoading] = useState(false);

  const [election, setElection] = useState({ table: [], phase: '' })

  useEffect(() => {
    try {
      // setisLoading(true);
      getElectionById(electionId).then((data) => {
        setElection({ ...election, table: data, phase: data?.currPhase });
        setElection({ ...election, table: data, phase: data?.currPhase })
      })
      // setisLoading(false);

    } catch (error) {
      console.log(error);
    }
  }, [])
  // console.log(election);
  if (election.phase === 0) {
    return (<div>
      {/* {isLoading && Loader2} */}
      <PrePhase election={election} electionId={electionId} />
    </div>);
  } else if (election.phase == 1) {
    return (

      <div className="bg-primary bg-[#01040f] w-full overflow-hidden flex flex-col align-center pb-[100px]">
        {/* {console.log(election?.table?.candidates)} */}
        {/* {console.log("phase is" + election?.table?.candidates)} */}
        <div className="mx-auto h-fit flex-col w-[85%] mt-[10px] rounded-[20px] flex pl-0 md:pl-2 md:text-start text-center items-center justify-center md:items-start md:justify-start   overflow-visible">
          <h2 className="font-bold text-white text-[40px] w-[600px]">
            Hello <br className="md:hidden block" /> Prateek,
          </h2>
          <p className="text-gradient first-letter:font-bold text-[20px] w-[600px]">
            Welome to <br className="md:hidden block" /> Decentralized Election
          </p>
        </div>
        <div className="mx-auto h-[170px] w-[85%] bg-blue-gradient mt-[10px] rounded-[20px] flex  pl-0 md:pl-[20px] overflow-visible">
          <p className="font-epilogue font-bold flex items-center justify-center text-center md:items-start md:mx-0 mx-auto md:text-start md:justify-start text-4xl md:text-5xl lg:text-6xl text-black mt-[25px] mb-[25px]">
            Every Vote <br className="md:hidden block" />Counts!
          </p>

          <Image
            src={vote}
            alt="vote"
            className="hidden lg:block w-[290px] h-[290px] pr-[-50px] mt-[-120px] absolute  right-[12%]"
          />
        </div>
        <div className="flex flex-col lg:flex-row w-[100%]">
          <div className=" w-[90%] md:w-[75%] mx-auto mt-[20px] to-transparent rounded-[20px] p-[20px] flex flex-col gap-[20px]">
            {election?.table?.candidates?.map((candidate, ind) =>
              <CandidateCard
                key={ind}
                name={candidate?.name}
                party={candidate?.party}
                electionId={electionId}
                candidateId={ind}
              />
            )}
          </div>
          {/* <div className=" w-[50%] mr-[50px] mt-[20px] to-transparent rounded-[20px] p-[20px] flex justify-center items-center">
          <div className="h-[500px] w-[400px] hidden  lg:block">
            <Canvas className="mt-8 hidden lg:block">
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
        </div> */}
        </div>

      </div>
    );

  } else if (election.phase == 2) {
    return (
      <div className="text-white flex items-center bg-primary bg-[#01040f] justify-center text-center h-[1000px]">
        {console.log(getElectionResults(electionId).then((data) => {
          console.log(data);
        }))}
        past voting phase
      </div>
    );

  } else {
    return (<div className="text-white flex items-center bg-primary bg-[#01040f] justify-center text-center h-[1000px]">

      Please reload the page .<br />Error occured<br></br>
    </div>)

  }

};

export default id;
