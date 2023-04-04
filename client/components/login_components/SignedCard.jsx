
import Image from 'next/image'
import meta from "../../public/metamask.png"
import ethe from "../../public/trio.png"
import { useStateContext } from '../../context';
import { useDisconnect } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';


const SignedCard = (props) => {
    const { connectWallet, address, checkIfWalletIsConnected } = useStateContext();
    const disconnect = useDisconnect();
    const router = useRouter();
    const handleSignIn = () => {
        if (address) router.push('/dashboard')
        else alert("Wallet not connected")
    }

    return (

        <div className='di relative sm:h-[300px] sm:w-[500px] h-[300px] w-[300px] mb-20 overflow-hidden rounded-xl bg-[#111526] mt-12 '>
            <div className="absolute z-20 inset-[1.5px] rounded-[12px] ">
                <div className="bg-[#283457] text-white px-2 py-4  rounded-t-xl h-[130px]">
                    <div className='contenttext-4xl text-center text-2xl md:text-3xl  text-white'>Welcome back to De<span className='text-[#60e0e6]'>ction</span></div>
                    <div className=' flex justify-center'><Image src={ethe} className="h-28 w-28 -mt-4 mx-auto" /></div>
                </div>
                <button onClick={address ? () => { disconnect() } : () => { connectWallet() }} className=" bg-gradient-to-r flex from-orange-600 to cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-orange-800 h-[50px] justify-center text-white rounded-xl mt-3 mx-auto w-[80%] text-center py-3">
                    {address ? "Connected" : "Connect metamask"}<Image src={meta} className="h-6 w-6 mt-[1px] ml-2" />

                </button>
                <a href='/CreateElection' onClick={handleSignIn} className=" bg-gradient-to-r flex from-[#60e0e6] to-[#03b7c1] cursor-pointer hover:scale-105 duration-200 hover:shadow-lg shadow-black  bg-[] h-[50px] w-[80%] justify-center text-white rounded-xl mt-3 mx-auto text-center py-3">
                    Create Election

                </a>
            </div>
        </div>

    );
}


export default SignedCard;











