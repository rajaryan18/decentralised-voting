
import { useStateContext } from '../context';
import { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import ResultCardDashboard from '../components/dashboard/ResultCardDashboard';
import ElectionCard from '../components/dashboard/ElectionCard';
import { logger } from 'ethers';



export default function Home() {
    const { getAllElections } = useStateContext()
    const [allElections, setAllElections] = useState({ table: [] });
    const [expandedOn, setExpandedOn] = useState(false);
    const [expandedPre, setExpandedPre] = useState(false);
    const [expandedPast, setExpandedPast] = useState(false);
    const [searchword, setSearchWord] = useState("");
    const [filtereddata, setFilteredData] = useState([]);

    const handleChange = (e) => {
        setSearchWord(e.target.value);
        if (searchword === "") {
            setFilteredData([]);
        }
    }

    function onSearch(event) {

        const newFilter = allElections.table?.map((e, i) => i == searchword ? i : undefined).filter((value) => {
            return (value);
        });
        if (searchword === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(newFilter);
        }
        console.log(filtereddata);
    };



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
                {console.log((allElections.table))}
                {!searchword ? <div>
                    <ResultCardDashboard name="Upcoming Elections" color="bg-yellow-500" expandedOn={expandedPre} setExpandedOn={setExpandedPre} allElections={allElections} />
                    <ResultCardDashboard name="Ongoing Elections" color="bg-green-500" expandedOn={expandedOn} setExpandedOn={setExpandedOn} allElections={allElections} />
                    <ResultCardDashboard name="Past Elections" color="bg-red-500" expandedOn={expandedPast} setExpandedOn={setExpandedPast} allElections={allElections} />
                </div> : !filtereddata.length == 0 ? filtereddata?.map((election, ind) => (
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
                )) : <div className="text-white"></div>}


            </div>


        </div >
    )
}
