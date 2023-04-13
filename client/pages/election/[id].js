import { useRouter } from "next/router";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model1 } from "../../components/threejs/Echain";
import { useStateContext } from "../../context";
import { useEffect, useState } from "react";
import { electionData } from "../../components/constants";
import PrePhase from "../../components/election/Pre";
import Loader2 from "../../components/Loader2";
import PastPhase from "../../components/election/Past";
import OngoingPhase from "../../components/election/Ongoing";


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
      // startVoting(electionId)
    } catch (error) {
      console.log(error);
    }
  }, [])
  // console.log(election);




  if (election.phase === 0) {
    return (<div> <PrePhase election={election} electionId={electionId} />  </div>);
  }

  else if (election.phase == 1) {
    return (<div><OngoingPhase election={election} electionId={electionId} /></div>);
  }

  else if (election.phase == 2) {
    return (<div>{console.log(getElectionResults(electionId).then((data) => { console.log(data); }))}
      <PastPhase election={election} electionId={electionId} votes={""} /></div>);
  }

  else {
    return (<div className="text-white flex items-center bg-primary bg-[#01040f] justify-center text-center h-[1000px]">
      Please reload the page .<br />Error occured<br></br>
    </div>)

  }

};

export default id;


































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
