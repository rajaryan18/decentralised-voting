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

const Hero = () => {


  const [user, setuser] = useState("hii");
  const handleClick = () => {
    if (user === null) {
      setuser("hii")
    }
    else {
      setuser(null)
    }
  }

  return (
    <section id="home" className={`flex md:flex-row flex-col py-6 sm:py-20 mx-10 `}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 -mt-28  `}>


        <div className="flex flex-row justify-between items-center w-full -mt-40">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Generation</span>{" "}
          </h1>

        </div>


        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Voting System.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Aliqua adipisicing qui do consequat nulla aliqua eu voluptate laborum. Sit irure amet quis eu. Minim dolor adipisicing minim nisi quis.
          Qui commodo occaecat nisi qui velit.
        </p>
        <Button styles={`mt-10`} />
      </div>

      <div className={`flex-1 flex-col ${styles.flexCenter} md:my-0 my-10 relative`}>
        <div className='h-[500px] w-[400px] mr-36'>

          {/* <CanvasCard /> */}
          {/* <SignUpCard /> */}
          {user ? <SignInCard on={handleClick} /> : <SignedCard on={handleClick} />}


        </div>

        <Image priority={true} src={robothandd} height={200} width={600} className="relative bottom-36 ml-10" />
      </div>

    </section>
  );
};

export default Hero;
