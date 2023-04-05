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

                </div>
            </div>
            <div className="absolute z-[0] w-[40%] h-[35%] top-20 pink__gradient" />
            <div className="absolute z-[1] w-[30%] h-[40%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        </div>




    )
}


