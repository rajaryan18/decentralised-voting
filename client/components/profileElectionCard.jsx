import React from 'react'
import Image from 'next/image'
import person from '../public/person.jpg'
import meta from "../public/metamask.png"

const ProfileElectionCard = (props) => {
    return (
        <div key={props.id} className='rounded-md  bg-[#252945] hover:scale-110 duration-300 hover:shadow-md hover:shadow-black/75 w-48 mb-8 mx-6 ' >

            <div className=" max-w-sm border border-gray-200 rounded-lg shadow">

                {/* <Image className="rounded-t-lg " src={url} width={80} height={50} alt="" /> */}
                <div className='bg-white w-48 h-24 rounded-t-md '></div>

                <div className="px-4 py-3">
                    <div href="#">
                        <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-4">{props.name}</h5>
                    </div>
                    <div className='flex flex-col space-y-1 mb-4 text-white'>
                        <div className='election id text-xs'>
                            <b>Election Id - </b>{props.id}
                        </div>
                        <div className='winner text-xs'>
                            <b>Winner - </b>{props.winner}
                        </div>
                        <div className='text-xs'>
                            <b>Total Votes - </b>{props.votes}
                        </div>
                    </div>
                    <a href="#" className="inline-flex text-xs items-center px-3 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        More Details
                        <svg aria-hidden="true" className="w-3 h-3 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                </div>
            </div>


        </div>
    )
}

export default ProfileElectionCard