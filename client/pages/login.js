import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import style from '../styles/Home.module.css'
import { Canvas } from '@react-three/fiber'
import { Model } from '../components/threejs/Metamask3d'
import { OrbitControls } from '@react-three/drei'
import { Model1 } from '../components/threejs/Echain'

import styles from "../components/login_components/style";
import { MetaDetail, Footer, Navbar, Stats, Hero, EthDetail, Features } from "../components/login_components";
import { star } from '../public/assets'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (

        <div className="bg-primary bg-[#01040f] w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            {/* <Canvas className=''>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} enableRotate={false} autoRotateSpeed={3} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[0, 5, -2]} intensity={0.8} />
                <directionalLight position={[0, -20, -1]} intensity={0.8} />
                <directionalLight position={[10, 0, -8]} intensity={0.6} />
                <directionalLight position={[-10, 0, -8]} intensity={0.6} />
                <directionalLight position={[0, 30, 0]} intensity={0.5} />

                <Model />
            </Canvas>
            <div className='text-blue-500 text-7xl'>hiii i am shivam the hero </div> */}



            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero />
                </div>
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Features />
                    <MetaDetail />
                    <EthDetail />


                    <Footer />
                </div>
            </div>
        </div>




    )
}


