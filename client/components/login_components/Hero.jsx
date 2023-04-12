import Head from 'next/head'
import Image from 'next/image'
import styles from "./style";
import { discount, robothand, robot } from "../../public/assets";
// import { metamask.png } from "../../../public"

import { Canvas } from '@react-three/fiber'
// import { Model } from '../components/threejs/Metamask3d'
import { OrbitControls } from '@react-three/drei'
import { Model1 } from '../threejs/Echain';
import robothandd from "../../public/robothandd.png";
import Button from './Button';
import SignedCard from './SignedCard';
import SignInCard from './SignInCard';
import { useState } from 'react';
import CanvasCard from './Canvas';
import { useStateContext } from '../../context';

const Hero = () => {

  const { user, connectWallet, address, createCampaign, addUser } = useStateContext();


  // const handleClick = () => {
  //   if (user === null) {
  //     setuser("hii")
  //   }
  //   else {
  //     setuser(null)
  //   }
  // }

  return (
    <section id="home" className={`flex md:flex-row flex-col py-6  mx-10 mt-44 md:mt-0`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6   `}>


        <div className="flex flex-row justify-between text-center md:text-start  items-center w-full -mt-40 ">
          <h1 className="flex-1 font-poppins font-semibold text-[40px] lg:text-[52px] text-white  leading-[50px] lg:leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Generation</span>{" "}
            <br className="sm:block hidden" />
            <span className="">Voting System.</span>{" "}
            {/* <h1 className="font-poppins flex text-center md:text-start font-semibold text-[40px] lg:text-[52px] text-white leading-[50px] lg:leading-[75px] w-full">
              Voting System.
            </h1> */}
          </h1>

        </div>



        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Aliqua adipisicing qui do consequat nulla aliqua eu voluptate laborum. Sit irure amet quis eu. Minim dolor adipisicing minim nisi quis.
          Qui commodo occaecat nisi qui velit.
        </p>

        <Button styles={`mt-6 mx-auto md:mx-0`} />

      </div>

      <div className={`flex-1 flex-col ${styles.flexCenter} md:my-0 my-10 relative  `}>
        <div className='h-[500px] w-[400px] flex flex-row items-center justify-center mb-20  '>
          {!user ? <SignInCard /> : <SignedCard />}


        </div>

        <Image priority={true} src={robothandd} height={100} width={600} alt="robo-hand" className="relative bottom-36 ml-10" />
      </div>

    </section>
  );
};

export default Hero;
