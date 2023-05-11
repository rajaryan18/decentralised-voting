import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import person from '../../public/person.jpg'
import { useStateContext } from "../../context";
import PasswordPopper from '../PasswordPopper';
import { generate_hash } from '../../utils/helper_functions';
import Loader from '../Loader';

const CandidateCard = ({ name, party, electionId, candidateId }) => {
  const jwt = require('jsonwebtoken');
  const { doVote, userinfo } = useStateContext()
  const [isLoading, setIsLoading] = useState(false);

  const temp_user_info = jwt.verify(userinfo.token, "seekret key(change later and keep in env file)", (err, decoded) => {
    if (err) {
      console.log("session expired login again")
    } else {
      return decoded
    }
  });
  const aadhar_num = temp_user_info?.aadhar;
  const [form, setForm] = useState({
    aadhar: '',
    password: ''
  });
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


  const handleVote = async (e) => {
    e.preventDefault();
    console.log(form);
    setVisible(false);
    setIsLoading(true);
    try {
      const casted_vote = await doVote(electionId, candidateId, form.aadhar, generate_hash(form.password))

    } catch (error) {
      console.log("here");
    }
    setIsLoading(false);
  }
  return (
    <div className='h-fit w-[100%] bg-[#1e2742] rounded-b-md rounded-t-3xl md:rounded-tr-[15px] md:rounded-br-[15px] md:rounded-tl-[40px] md:rounded-bl-[40px] overflow-visible ' >
      {isLoading && <Loader />}
      {visible && <PasswordPopper visi={visioff} submit={handleVote} value={form.password} change={(e) => handleFormFieldChange('password', e)} />}
      <div className='flex md:flex-row flex-col items-center'>
        <Image src={person} alt="vote" className="w-[130px] h-[130px] rounded-full ml-[-10px] md:mt-[-5px] -mt-3" />
        <div className=" ml-[5px] mb-6 mb:mb-0 w-[90%] md:w-[80%] mt-6  rounded-[15px] flex flex-col justify-center text-center md:text-start md:justify-start h-fit md:my-auto p-[5px] gap-2 md:gap-[20px] self-center" >
          <p className='text-white' ><span className='text-gradient' >Name: </span> {name}</p>
          <p className='text-white' ><span className='text-gradient' >Party: </span> {party}</p>
        </div>
        <div onClick={vision} className={` {props.button} h-[40px] w-[120px] mb-4 mr-0 md:mr-4 md:mb-0 bg-gradient-to-r from-orange-500 via-golden-500 to-yellow-500 rounded-[15px] flex justify-center items-center font-epilogue hover:cursor-pointer hover:scale-105 hover:shadow-md duration-300`} >
          <p>Cast Vote</p>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard