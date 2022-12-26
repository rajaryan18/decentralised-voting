
import ElectionCard from '../components/ElectionCard'
import speech from "/public/speech.svg";




export default function Home() {
    return (
        <div className="bg-primary bg-[#01040f] w-full justify-center overflow-hidden flex flex-wrap gap-[100px] align-center pt-[50px]" >
            {/* <div className="absolute z-[0] w-[40%] h-[20%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[40%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[25%] right-20 bottom-20 blue__gradient" /> */}
            <ElectionCard
                id={1}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />
            <ElectionCard
                id={2}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />
            <ElectionCard
                id={3}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />
            <ElectionCard
                id={4}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />
            <ElectionCard
                id={5}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />
            <ElectionCard
                id={6}
                title={"Election Name"}
                candidateCount={"69"}
                TotalVotes={"6969"}
                imageURL={speech}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id justo rutrum, pretium neque eu, gravida ligula. Integer ut purus eu diam commodo accumsan."}
            />

        </div >
    )
}
