import React from 'react'
import Image from 'next/image'
import { useStateContext } from "../../context";

const PastPhase = ({ name, party, electionId, candidateId }) => {

    const { doVote, userinfo } = useStateContext()

    return (
        <div className='h-fit w-[100%] bg-[#1e2742] rounded-b-md rounded-t-3xl md:rounded-tr-[15px] md:rounded-br-[15px] md:rounded-tl-[40px] md:rounded-bl-[40px] overflow-visible ' >
        </div>
    )
}

export default PastPhase