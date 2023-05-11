import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useStateContext } from "../../context";
import vote from "../../public/vote.png";
import CandidateCardNoVote from './CandidateCardNoVote';
import Link from 'next/link';
import { convertToDate, convertToIST } from '../../utils/helper_functions'
import PasswordPopper from '../PasswordPopper';
import Loader from '../Loader';
import { generate_hash } from '../../utils/helper_functions';
//we have to pass aadhar and password in startVoting function

const PrePhase = ({ electionId, election }) => {
    const jwt = require("jsonwebtoken");
    const [isLoading, setIsLoading] = useState(false);

    const { startVoting, userinfo } = useStateContext()
    const start = new Date(convertToIST(convertToDate(new Date(parseInt(election?.table?.start_date?._hex)))))
    const [form, setForm] = useState({
        aadhar: '',
        password: ''
    });

    const temp_user_info = jwt.verify(
        userinfo.token,
        "seekret key(change later and keep in env file)",
        (err, decoded) => {
            if (err) {
                console.log("session expired login again");
            } else {
                return decoded;
            }
        }
    );
    const aadhar_num = temp_user_info?.aadhar;

    useEffect(() => {
        setForm({ ...form, "aadhar": aadhar_num })

    }, []);

    const [visible, setVisible] = useState(false);

    const visioff = (e) => {
        setVisible(false);
        setForm({ ...form, "password": e.target.value })
    }

    const vision = (e) => {
        e.preventDefault();
        setVisible(true);
    }
    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        setVisible(false);
        setIsLoading(true);

        const addedCandidate = await startVoting(electionId, form.aadhar, generate_hash(form.password));
        setIsLoading(false);
        window.location.reload();
    }

    return (
        <div className="bg-primary bg-[#01040f] w-full overflow-hidden flex flex-col align-center pb-[100px]">
            {isLoading && <Loader />}

            {visible && <PasswordPopper visi={visioff} submit={handleSubmit} value={form.password} change={(e) => handleFormFieldChange('password', e)} />}

            {console.log(election?.table)}
            {/* {console.log("phase is" + election?.table?.candidates)} */}
            <div className="mx-auto h-fit flex-col w-[85%] mt-[10px] rounded-[20px] flex pl-0 md:pl-2 md:text-start text-center items-center justify-center md:items-start md:justify-start   overflow-visible">
                <h2 className="font-bold text-white text-[40px] w-[600px]">
                    Hello <br className="md:hidden block" /> Prateek,
                </h2>
                <p className="text-gradient first-letter:font-bold text-[20px] w-[600px]">
                    Welome to <br className="md:hidden block" /> Decentralized Election
                </p>
            </div>
            <div className="mx-auto h-fit pb-4 w-[85%] bg-blue-gradient mt-[10px] rounded-[20px] flex flex-col pl-0 md:pl-[20px] overflow-visible">
                <p className="font-epilogue font-bold flex items-center justify-center text-center md:items-start md:mx-0 mx-auto md:text-start md:justify-start text-4xl md:text-5xl lg:text-6xl text-black mt-[15px] mb-[25px]">
                    Every Vote <br className="md:hidden block" />Counts!
                </p>
                <div className='flex flex-row justify-between'>
                    <div onClick={vision} className='bg-red-600 hover:bg-red-500 text-md  mx-6 md:mx-0  rounded-xl px-4 py-2 h-fit w-fit text-white hover:scale-105 duration-300 '>Start Election</div>
                    <div className='bg-red-600 hover:bg-red-500 text-md mx-6  rounded-xl px-4 py-2 h-fit w-fit text-white hover:scale-105 duration-300 '><Link href='/addCandidate'>Add Candidate</Link></div>
                </div>

                {/* <Image
                    src={vote}
                    alt="vote"
                    className="hidden lg:block w-[290px] h-[290px] pr-[-50px] mt-[-120px] absolute  right-[12%]"
                /> */}
            </div>
            <div className="flex flex-col lg:flex-row w-[100%]">
                <div className=" w-[90%] md:w-[75%] mx-auto mt-[20px] to-transparent rounded-[20px] p-[20px] flex flex-col gap-[20px]">
                    <div className=" text-white/75 flex flex-col  bg-[#1e2742] rounded-xl px-4 py-4 -mt-6 mb-6">
                        <div className='text-center justify-center items-center text-2xl md:text-3xl '> Voting hasn't been started yet</div>


                        <div className='flex text-lg mt-4 flex-row justify-between mx-4'>
                            <div><span className=' font-semibold font-epilogue text-green-500 h-fit w-fit'>Start Date :<br /> </span>{() => { start }}</div>
                            <div><span className='  font-semibold  font-epilogue text-red-500 h-fit w-fit'>End Date :<br /> </span>{parseInt(election?.table?.end_date?._hex)}</div>
                        </div>

                    </div>
                    {election?.table?.candidates?.map((candidate, ind) =>
                        <CandidateCardNoVote
                            key={ind}
                            name={candidate?.name}
                            party={candidate?.party}
                            electionId={electionId}
                            candidateId={ind}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default PrePhase