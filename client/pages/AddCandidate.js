import React, { useState } from 'react'

import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';

import { checkIfImage } from '../utils';

const AddCandidate = () => {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        electionId: '',
        name: '',
        party: '',
        partyImage: '',
        candidateImage: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }
    const handleFormFieldChangeTime = (fieldName, e) => {
        setForm({ ...form, [fieldName]: Math.floor(e.target.value) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //     setIsLoading(true)
        //     await createElection({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        //     setIsLoading(false);
        //     // navigate('/');
        console.log(form);
    }

    return (
        <div className="bg-primary bg-[#01040f] flex justify-center items-center flex-col  sm:p-10 p-4">
            {isLoading && <Loader />}


            <form onSubmit={handleSubmit} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px] ">
                    <FormField
                        labelName="Election Id*"
                        placeholder="Enter the election id"
                        inputType="number"
                        value={form.electionId}
                        handleChange={(e) => handleFormFieldChange('electionId', e)}
                    />
                    <FormField
                        labelName="Name*"
                        placeholder="Name of the candidate"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange('name', e)}
                    />
                </div>

                <FormField
                    labelName="Party name*"
                    placeholder="Name of the party"
                    inputType="text"
                    value={form.party}
                    handleChange={(e) => handleFormFieldChange('party', e)}
                />


                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Candidate image *"
                        placeholder="Place image URL of your candidate"
                        inputType="url"
                        value={form.candidateImage}
                        handleChange={(e) => handleFormFieldChange('candidateImage', e)}
                    />
                    <FormField
                        labelName="Party image *"
                        placeholder="Place image URL of your party"
                        inputType="url"
                        value={form.partyImage}
                        handleChange={(e) => handleFormFieldChange('partyImage', e)}
                    />


                </div>



                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton
                        btnType="submit"
                        title="Add candidate"
                        styles="bg-[#1dc071]"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddCandidate