
import ElectionCard from '../components/ElectionCard'
import speech from "/public/speech.svg";
import { useStateContext } from '../context';
import { useEffect, useState } from 'react';


export default function Home() {
    // let elections = {table: []}
    // let elections = []
    const { getAllElections } = useStateContext()
    const [allElections, setAllElections] = useState({
        table: []
    })
    useEffect(() => {
        try {
            getAllElections().then((data) => {
                setAllElections({ ...allElections, table: data })
                // console.log(allElections);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="bg-primary bg-[#01040f] w-full justify-center overflow-hidden flex flex-wrap gap-[100px] align-center pt-[50px] pb-[50px]" >
            <div className='z-100 bg-primary bg-[#01040f] w-full justify-center overflow-hidden flex flex-wrap gap-[100px] align-center pt-[50px] pb-[50px]'>
                {/* {console.log(allElections.table)} */}
                {allElections.table?.map((election, ind) =>
                    <ElectionCard
                        key={ind}
                        id={ind}
                        title={election?.name}
                        candidateCount={election?.candidates?.length}
                        TotalVotes={parseInt(election?.totalVoted, 10)}
                        imageURL={speech}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
                        phase={election?.currPhase}
                    />
                )}

            </div>
            {/* <div className="absolute z-[0] w-[40%] h-[35%] top-20 pink__gradient" />
            <div className="absolute z-[1] w-[30%] h-[20%] rounded-full white__gradient bottom-60" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
        </div >
    )
}
