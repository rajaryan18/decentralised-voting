import React, { useState } from 'react';
import FormField from './FormField';
import { AiFillEye, AiFillEyeInvisible, AiFillCloseCircle } from 'react-icons/ai'
import CustomButton from './CustomButton';


function PasswordPopper(props) {
    const [pass, setPass] = useState("password")

    const handlePass = (event) => {
        if (pass === "password") setPass("text")
        else setPass("password")
    }


    return (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
            <div className='sm:px-10 px-4   bg-[#283457] text-white rounded-lg mx-4 '>
                <div className='flex items-end justify-end scale-[1.4] mt-4 text-red-400 mr-[12%] hover:text-red-500   mb-4'><div onClick={props.visi} className=" cursor-pointer"><AiFillCloseCircle /></div></div>
                <div className='mb-6'>This is a critical action and requires you to re-enter your password.</div>

                <div>
                    <FormField

                        placeholder="Enter your password"
                        inputType={pass}
                        value={props.value}
                        handleChange={props.change}
                    />
                    {pass !== "password" ? <div className='flex w-fit h-fit items-end sm:ml-[90%] ml-[85%] cursor-pointer mb-10 justify-end -mt-8  text-white scale-[1.4] px-2' onClick={handlePass}><AiFillEye /></div> : <div className='flex w-fit h-fit items-end sm:ml-[90%] ml-[85%] cursor-pointer mb-10 justify-end -mt-8  text-white scale-[1.4] px-2' onClick={handlePass}><AiFillEyeInvisible /></div>}
                </div>

                <div className="flex justify-center items-center mt-[25px]">

                    <div onClick={props.submit} className="px-4 py-2 mb-8 rounded-lg hover:scale-105 duration-300 cursor-pointer hover:bg-blue-600 bg-blue-500 ">Submit</div>
                </div>
            </div>
        </div>
    );
}

export default PasswordPopper;