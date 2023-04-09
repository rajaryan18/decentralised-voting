
import Image from 'next/image'
import meta from "../../public/metamask.png"
import { useStateContext } from '../../context';
import { useState } from 'react';
import { verify_aadhar } from '../../utils/helper_functions';
import Loader from '../Loader';

const SignUpCard = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        aadhar: "",
        password: "",
    });
    const { connectWallet, setUser, checkCredentials, address, checkIfWalletIsConnected } = useStateContext();

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!verify_aadhar(form.aadhar)) return console.log("This aadhar doesn't exists");
        if (address) {

            setIsLoading(true);
            const loginedUser = await checkCredentials(form.aadhar, form.password);
            setIsLoading(false);
            if (loginedUser) setUser(true);
            console.log(form);
        }
        else {
            console.log("Wallet not connected");
        }
    }
    return (
        <div className='di relative sm:h-[300px] sm:w-[500px] h-[300px] w-[300px] mb-20 overflow-hidden rounded-xl bg-[#111526] mt-12 '>
            <div className="absolute z-20 inset-[1.5px] rounded-[12px] ">
                {isLoading && <Loader />}

                <div className="bg-[#283457] text-white px-2 py-3  rounded-t-xl h-[130px]">
                    <div className='content text-2xl  md:text-3xl  text-center text-white'>Welcome to De<span className='text-[#60e0e6]'>ction</span></div>

                    <div className='mx-auto items-center flex justify-center'><input onChange={(e) => { handleFormFieldChange('aadhar', e) }} type="text" placeholder="Enter your Aadhar no" className=' outline-none text-black rounded-xl h-[40px] w-[82%]  mt-7  px-5 py-3'></input></div>
                </div>
                <div className='mx-auto items-center flex justify-center'><input onChange={(e) => { handleFormFieldChange('password', e) }} type="text" placeholder="Password" className=' outline-none text-black rounded-xl h-[40px] w-[80%]  mt-3 mb-1   px-5 py-3'></input></div>

                {/* <button onClick={address ? null : () => { connectWallet() }} className=" bg-gradient-to-r flex from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800 h-[50px] justify-center text-white rounded-xl mt-3 mx-auto w-[80%] text-center py-3">
                    {(address) ? "Connected" : "Connect metamask"}<Image src={meta} alt="metamask" className="h-6 w-6 mt-[1px] ml-2" />

                </button> */}
                <div onClick={handleSubmit} className=" bg-gradient-to-r flex from-[#60e0e6] to-[#03b7c1] cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-[] h-[50px] w-[80%] justify-center text-white rounded-xl mt-3 mx-auto text-center py-3">
                    Sign In

                </div>
                <p className='text-white text-sm text-center mt-4'>New to Dection? <a href='/signup' onClick={props.on} className=' underline hover:text-blue-300 cursor-pointer'>Sign up</a></p>
            </div>
        </div>

    );
}

export default SignUpCard;








