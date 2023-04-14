
import { useStateContext } from '../context';
import { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import ResultCardDashboard from '../components/dashboard/ResultCardDashboard';



export default function Home() {
    // let elections = {table: []}
    // let elections = []
    const { getAllElections } = useStateContext()
    const [allElections, setAllElections] = useState({ table: [] });
    const [expandedOn, setExpandedOn] = useState(false);
    const [expandedPre, setExpandedPre] = useState(false);

    const [expandedPast, setExpandedPast] = useState(false);


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
            <SearchBar />
            <div className='z-100 bg-primary bg-[#01040f] w-full justify-center overflow-hidden flex flex-wrap gap-[100px] align-center pt-3 pb-[50px]'>

                {/* {console.log(allElections.table)} */}

                <ResultCardDashboard name="Upcoming Elections" color="bg-yellow-500" expandedOn={expandedPre} setExpandedOn={setExpandedPre} allElections={allElections} />
                <ResultCardDashboard name="Ongoing Elections" color="bg-green-500" expandedOn={expandedOn} setExpandedOn={setExpandedOn} allElections={allElections} />
                <ResultCardDashboard name="Past Elections" color="bg-red-500" expandedOn={expandedPast} setExpandedOn={setExpandedPast} allElections={allElections} />


            </div>


        </div >
    )
}
