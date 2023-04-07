//Work on user profile here
import Image from "next/image";
import styles from "../../components/login_components/style";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileElectionCard from "../../components/profileElectionCard";
import { useStateContext } from "../../context";
export default function Profile() {
    const { user } = useStateContext();

    if (user)
        return (
            <div className='bg-primary bg-[#01040f]'>


                <div className=" flex  flex-col sm:px-10 lg:px-24 md:px-20 ">
                    <div className="upperborder h-44 w-full bg-[#1e2742] rounded-t-3xl mt-10 "></div>
                    <div className="flex flex-row">
                        <div className="rounded-full bg-[#01040f] h-40 w-40 flex items-center justify-center ml-10 -mt-20"> <div className="image bg-white rounded-full h-36 w-36 "></div> </div>
                        <div className="Name text-white mt-2 ml-3 flex flex-col">
                            <div className="text-4xl font-epilogue">Kumar Shivam</div>
                            <div className="info mt-6">
                                <div className="aadhar text-white  ">Aadhar number-1234567890</div>
                                <div className="dob text-white mt-1">DOB- 19/08/2003</div>
                            </div>
                        </div>
                        <div className="address ml-12 mt-6 flex flex-row "><div className="adressimage rounded-full bg-red-400 h-4 w-4 mt-1 "></div><div className="text-white text-sm ml-2 ">0x67E73647d7efA79Af20D2badf559208EA8dC5413</div></div>
                    </div>



                    <div className="Ongoing Elections mt-20">
                        <div className="flex flex-row ">
                            <div className="bg-green-500 rounded-full h-4 w-4 mr-2 ml-2 mt-2 px-2"></div>
                            <div className="text-xl text-white">Ongoing Elections</div>
                        </div>
                        <div className="bg-[#1e2742] px-6 py-10 w-full mt-2 rounded-xl flex items-center justify-center space-x-10">
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />

                        </div>
                    </div>

                    <div className="Past Elections mt-12 mb-20">
                        <div className="flex flex-row ">
                            <div className="bg-red-500 rounded-full h-4 w-4 mr-2 ml-2 mt-2 px-2"></div>
                            <div className="text-xl text-white">Past Elections</div>
                        </div>
                        <div className="bg-[#1e2742] px-6 py-10 w-full mt-2 rounded-xl flex items-center justify-center mx-auto space-x-10">
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                            <ProfileElectionCard />
                        </div>
                    </div>


                    {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[30%] h-[50%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}



                </div>






            </div>
        )
    else
        return (<div className='h-[470px] bg-[#01040f] w-full flex items-center justify-center text-center text-white bg-primary '>You are not logged in<br />Login to see your profile</div>)

}
