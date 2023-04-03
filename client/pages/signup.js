import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';

import { useDisconnect } from '@thirdweb-dev/react';
import meta from '../public/metamask.png'
import { useRouter } from 'next/router';


const SignUp = () => {
    // const navigate = useNavigate();
    const { connect, address } = useStateContext();
    const disconnect = useDisconnect();
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({

        name: '',

        aadhar: '',
        metaAddress: { address },
        dob: '',
    });

    useEffect(() => { disconnect() }, [])

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (address) {
            setForm({ ...form, ["metaAddress"]: address });
            console.log(form);
        }
        else { console.log("Wallet not connected"); alert("Wallet not connected") }

        //     setIsLoading(true)
        //     await createElection({ ...form, target: ethers.utils.parseUnits(form.target, 18) })
        //     setIsLoading(false);
        //     // navigate('/');

    }


    return (
        <div className="bg-primary bg-[#01040f] flex justify-center items-center flex-col  sm:p-10 p-4">
            {isLoading && <Loader />}


            <form onSubmit={handleSubmit} className="w-full md:lg-[80%] lg:w-[75%] mt-[65px] flex flex-col gap-[30px]">


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
                    labelName="DOB *"
                    placeholder="Enter your dob"
                    inputType="date"
                    value={form.dob}
                    handleChange={(e) => handleFormFieldChange('dob', e)}
                />
                <div onClick={address ? () => { disconnect() } : () => { connect() }} className=" bg-gradient-to-r flex from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800 h-[50px] justify-center text-white rounded-xl mt-3 mx-auto w-[80%] text-center py-3">
                    {address ? "Connected" : "Connect metamask"}<Image src={meta} className="h-6 w-6 mt-[1px] ml-2" />

                </div>







                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton
                        btnType="submit"
                        title="Sign Up"
                        styles="bg-[#1dc071]"
                    />
                </div>
            </form>
        </div>
    )
}

export default SignUp