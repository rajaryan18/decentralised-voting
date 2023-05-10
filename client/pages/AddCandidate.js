import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { checkIfImage } from '../utils';
import PasswordPopper from '../components/PasswordPopper';

const AddCandidate = () => {
    // const navigate = useNavigate();
    const jwt = require("jsonwebtoken");

    const [isLoading, setIsLoading] = useState(false);
    const { addCandidate, user, userinfo } = useStateContext();
    const [form, setForm] = useState({
        electionId: '',
        name: '',
        party: '',
        partyImage: '',
        candidateImage: '',
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

        const addedCandidate = await addCandidate(form.name, form.electionId, form.party, form.candidateImage, form.partyImage, form.aadhar, form.password);
        setIsLoading(false);
    }



    if (user)
        return (
            <div className="bg-primary bg-[#01040f] flex justify-center items-center flex-col  sm:p-10 p-4">
                {isLoading && <Loader />}
                {visible && <PasswordPopper visi={visioff} submit={handleSubmit} value={form.password} change={(e) => handleFormFieldChange('password', e)} />}


                <form onSubmit={vision} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">
                    <div className="flex flex-wrap gap-[40px] ">
                        <FormField
                            labelName="Election Id*"
                            // labelName={aadhar_num}
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
                {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[30%] h-[50%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
            </div>
        )
    else
        return (<div className='h-[470px] bg-[#01040f] w-full flex items-center justify-center text-center text-white bg-primary '>You are not logged in<br />Login to continue</div>)

}

export default AddCandidate