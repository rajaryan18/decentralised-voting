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


const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col py-6 sm:py-20 `}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 -mt-28 `}>


        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Generation</span>{" "}
          </h1>
          {/* <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div> */}
        </div>
        {/* <Image src={metamask.png} height={30} width={30} /> */}

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
          <Canvas className='mt-8'>
            <OrbitControls enableZoom={false} autoRotate={true} enableRotate={false} autoRotateSpeed={40} />
            <ambientLight intensity={0.6} />

            <directionalLight position={[0, 5, -2]} intensity={1} />
            <directionalLight position={[0, -20, -1]} intensity={0.8} />
            <directionalLight position={[1, 0, -8]} intensity={0.6} />
            <directionalLight position={[-10, 0, -8]} intensity={0.6} />
            <directionalLight position={[0, 30, 0]} intensity={0.5} />

            <Model1 />
          </Canvas>

        </div>

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[40%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[70%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[45%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
        <Image priority={true} src={robothandd} height={200} width={600} className="relative bottom-36 ml-10" />
      </div>


      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
