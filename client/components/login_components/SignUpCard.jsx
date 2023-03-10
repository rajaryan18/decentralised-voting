
import Image from 'next/image'
import meta from "../../public/metamask.png"

const SignUpCard = (props) => (
    <div className='di relative sm:h-[300px] sm:w-[500px] h-[300px] w-[300px] mb-20 overflow-hidden rounded-xl bg-[#111526] mt-12 '>
        <div className="absolute z-20 inset-[1.5px] rounded-[12px] ">
            <div className="bg-[#283457] text-white px-2 py-3  rounded-t-xl h-[130px]">
                <div className='content text-2xl  md:text-3xl  text-center text-white'>Welcome to De<span className='text-[#60e0e6]'>ction</span></div>
                {/* <p className='text-xs mt-1 text-white/75 md:mx-[11%] mx-10'>Aadhar Number</p> */}
                <div className='mx-auto items-center flex justify-center'><input type="text" placeholder="Enter your Aadhar no" className=' outline-none text-black rounded-xl h-[40px] w-[82%]  mt-6   px-5 py-3'></input></div>
            </div>
            <a className=" bg-gradient-to-r flex from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800 h-[50px] justify-center text-white rounded-xl mt-3 mx-auto w-[80%] text-center py-3">
                Connect Metamask<Image src={meta} className="h-6 w-6 mt-[1px] ml-2" />

            </a>
            <a className=" bg-gradient-to-r flex from-[#60e0e6] to-[#03b7c1] cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-[] h-[50px] w-[80%] justify-center text-white rounded-xl mt-3 mx-auto text-center py-3">
                Sign Up

            </a>
            <p className='text-white text-sm text-center mt-4'>Already have an account? <a onClick={props.on} className=' underline hover:text-blue-300 cursor-pointer'>Sign in</a></p>
        </div>
    </div>

);

export default SignUpCard;








