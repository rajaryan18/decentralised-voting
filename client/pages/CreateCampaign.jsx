import React, { useState } from 'react'

import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';

import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    id: '',
    title: '',
    aadhar: '',
    startDate: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        setIsLoading(false);
        // navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-primary bg-[#01040f] flex justify-center items-center flex-col  sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="bg-blue-gradient flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px] ">
          <FormField
            labelName="User Id*"
            placeholder="Eneter your user id"
            inputType="number"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Election Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Aadhar number*"
          placeholder="Enter your Aadhar"
          inputType="number"
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />



        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('startDate', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
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

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign