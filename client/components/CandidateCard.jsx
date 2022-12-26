import React from 'react'
import Image from 'next/image'
import trump from '../public/trump.jpg'

const CandidateCard = () => {
  return (
    <div className='h-[120px] w-[97%] bg-yellow-100 rounded-[15px]' >
        <div className='flex justify-start' >
        <Image src={trump} alt="vote" className="w-[50px] h-[50px] rounded-full self-center"/>
        </div>
    </div>
  )
}

export default CandidateCard