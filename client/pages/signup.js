import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';

import meta from '../public/metamask.png'
import { useRouter } from 'next/router';
import AlertCard from '../components/alert';
import { verify_aadhar } from '../utils/helper_functions';

const SignUp = () => {
    // const navigate = useNavigate();
    const { setUser, user, connectWallet, address, createCampaign, addUser } = useStateContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        aadhar: '',
        password: '',
        dob: '',
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verify_aadhar(form.aadhar)) return console.log("This aadhar doesn't exists");
        if (address) {
            // setForm({ ...form, ["metaAddress"]: address });
            setIsLoading(true);
            const addedUser = await addUser(form.name, form.dob, form.aadhar, address, form.password);
            setIsLoading(false);
            setUser(true);
            router.push('/')
            alert("account created.success")
            console.log(addedUser);
            console.log(form);
        }
        else {
            console.log("Wallet not connected"); <AlertCard />
        }
    }


    if (user)
        return (
            <div className='bg-primary bg-[#01040f] flex items-center justify-center text-center text-white h-[470px] w-full'>You are already logged in</div>)
    else return (
        <div className="bg-primary bg-[#01040f]">
            <div className=" flex justify-center items-center flex-col  sm:p-10 p-4">
                {isLoading && <Loader />}

                <form onSubmit={handleSubmit} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">
                    <div onClick={address ? null : () => { connectWallet() }} className=" bg-gradient-to-r flex from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800 h-[50px] justify-center text-white rounded-xl mt-3 mx-auto w-[80%] text-center py-3">
                        {address ? "Connected" : "Connect metamask"}<Image src={meta} className="h-6 w-6 mt-[1px] ml-2" />

                    </div>

                    <FormField
                        labelName="Name*"
                        placeholder="Enter your name"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange('name', e)}
                    />
                    <FormField
                        labelName="Aadhar*"
                        placeholder="Enter your aadhar number"
                        inputType="number"
                        value={form.aadhar}
                        handleChange={(e) => handleFormFieldChange('aadhar', e)}
                    />
                    <FormField
                        labelName="Password*"
                        placeholder="Enter new password"
                        inputType="text"
                        value={form.password}
                        handleChange={(e) => handleFormFieldChange('password', e)}
                    />
                    <FormField
                        labelName="DOB *"
                        placeholder="Enter your dob"
                        inputType="date"
                        value={form.dob}
                        handleChange={(e) => handleFormFieldChange('dob', e)}
                    />


                    <div className="flex justify-center items-center mt-[40px]">
                        <CustomButton
                            btnType="submit"
                            title="Sign Up"
                            handleClick={handleSubmit}
                            styles="bg-[#1dc071]"
                        />
                    </div>
                </form>
                {/* <div className="absolute z-[0] w-[40%] h-[35%] top-20 pink__gradient" />
                <div className="absolute z-[0] w-[30%] h-[50%] rounded-full white__gradient bottom-40" />
                <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
            </div>

        </div>
    )


}

export default SignUp