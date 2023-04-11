
import Image from 'next/image'
import meta from "../../public/metamask.png"
import { useStateContext } from '../../context';
import { useState } from 'react';
import { verify_aadhar } from '../../utils/helper_functions';
import Loader from '../Loader';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignUpCard = (props) => {
    const notify = () => toast.warning("Wallet Not Connected!");
    // const successfulLogin = () => toast.success("Login Successful")
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        aadhar: "",
        password: "",
    });
    const { connectWallet, getElectionOfUser, setUser, checkCredentials, address, checkIfWalletIsConnected, setUserInfo, userinfo } = useStateContext();
    const [pass, setPass] = useState("password")

    const handlePass = (event) => {
        if (pass === "password") setPass("text")
        else setPass("password")
    }

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!verify_aadhar(form.aadhar)) {
            toast.error("This aadhar doesn't exists")
            return console.log("This aadhar doesn't exists");
        }
        if (address) {

            setIsLoading(true);
            const loginedUser = await checkCredentials(form.aadhar, form.password);

            if (loginedUser) {

                setUser(true);
                const electionofuser = await getElectionOfUser(form.aadhar);
                console.log(electionofuser);
                setUserInfo({ aadhar: form.aadhar });
                toast.success("Login successful");
                setIsLoading(false);

            }
            else {
                setIsLoading(false);
                toast.error("Wrong credentials entered.Please check and try again")
            }
            console.log(form);
        }
        else {
            notify()
            console.log("Wallet not connected");
        }
    }
    return (
        <div className='di relative sm:h-[300px] sm:w-[500px] h-[300px] w-[300px] mb-20 overflow-hidden rounded-xl bg-[#111526] mt-12 '>
            <div className="absolute z-20 inset-[1.5px] rounded-[12px] ">
                {isLoading && <Loader />}
                <form onSubmit={handleSubmit}>
                    <div className="bg-[#283457] text-white px-2 py-3  rounded-t-xl h-[130px]">
                        <div className='content text-2xl  md:text-3xl  text-center text-white'>Welcome to De<span className='text-[#60e0e6]'>ction</span></div>

                        <div className='mx-auto items-center flex justify-center'><input onChange={(e) => { handleFormFieldChange('aadhar', e) }} type="text" placeholder="Enter your Aadhar no" className=' outline-none text-black rounded-xl h-[40px] w-[82%]  mt-7  px-5 py-3'></input></div>
                    </div>

                    <div className='mx-auto items-center flex justify-center'><input onChange={(e) => { handleFormFieldChange('password', e) }} type={pass} placeholder="Password" className=' outline-none text-black rounded-xl h-[40px] w-[80%]  mt-3 mb-1   px-5 py-3'></input></div>
                    {pass !== "password" ? <div className='absolute -mt-8 right-[54px] scale-150' onClick={handlePass}><AiFillEye /></div> : <div className='absolute -mt-8 right-[54px] scale-150' onClick={handlePass}><AiFillEyeInvisible /></div>}

                </form>

                <div onClick={handleSubmit} className=" bg-gradient-to-r flex from-[#60e0e6] to-[#03b7c1] cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-[] h-[50px] w-[80%] justify-center text-white rounded-xl mt-3 mx-auto text-center py-3">
                    Sign In

                </div>
                <p className='text-white text-sm text-center mt-4'>New to Dection? <a href='/signup' onClick={props.on} className=' underline hover:text-blue-300 cursor-pointer'>Sign up</a></p>
            </div>
            <ToastContainer />
        </div>

    );
}

export default SignUpCard;








