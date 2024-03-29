import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { convertToUNIX, verify_aadhar, generate_hash } from '../utils/helper_functions'
import PasswordPopper from '../components/PasswordPopper';

import { checkIfImage } from '../utils';

const CreateElection = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign, user } = useStateContext();
  const [form, setForm] = useState({

    title: '',
    aadhar: '',
    description: '',
    startDate: '',
    deadline: '',
    image: '',
    password: ''
  });
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

    if (!verify_aadhar(form.aadhar)) return console.log("This Aadhar doesn't exists");
    setVisible(false);
    setIsLoading(true);
    const camp = await createCampaign(form.image, form.aadhar, form.title, convertToUNIX(form.startDate), convertToUNIX(form.deadline), generate_hash(form.password))
    setIsLoading(false);
    setForm({ ...form, "password": e.target.value })
    console.log(camp);
    console.log(form);
  }

  if (user)
    return (
      <div className="bg-primary bg-[#01040f] flex justify-center items-center flex-col  sm:p-10 p-4">
        {isLoading && <Loader />}
        {visible && <PasswordPopper visi={visioff} submit={handleSubmit} value={form.password} change={(e) => handleFormFieldChange('password', e)} />}
        <div className="bg-blue-gradient flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start an Election</h1>
        </div>

        <form onSubmit={vision} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">
          <FormField
            labelName="Aadhar number*"
            placeholder="Enter your Aadhar"
            inputType="number"
            value={form.aadhar}
            handleChange={(e) => handleFormFieldChange('aadhar', e)}
          />
          <div className="flex flex-wrap gap-[40px] ">
            {/* <FormField
              labelName="User Id*"
              placeholder="Enter your user id"
              inputType="number"
              value={form.id}
              handleChange={(e) => handleFormFieldChange('id', e)}
            /> */}
            <FormField
              labelName="Election Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>
          <FormField
            labelName="Election Description*"
            placeholder="Write description about the election"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />





          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Start Date *"
              placeholder="Start Date"
              inputType="datetime-local"
              value={form.startDate}
              handleChange={(e) => handleFormFieldChange('startDate', e)}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="datetime-local"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e)}
            />

          </div>

          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px] mb-10">
            <CustomButton
              btnType="submit"
              title="Submit new election"
              handleClick={vision}
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
        {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[-1] w-[30%] h-[50%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
      </div>
    )
  else
    return (<div className='h-[470px] bg-[#01040f] w-full flex items-center justify-center text-center text-white bg-primary '>You are not logged in<br />Login to create an election campaign</div>)
}

export default CreateElection