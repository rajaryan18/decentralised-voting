import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import ElectionCard from '../components/ElectionCard'
import Navbar from '../components/Navbar'



export default function Home() {
    return (
        <div className="bg-primary bg-[#01040f] w-full justify-center overflow-hidden flex flex-wrap gap-[100px] align-center pt-[50px]" >
            {/* <div className="absolute z-[0] w-[40%] h-[20%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[40%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[25%] right-20 bottom-20 blue__gradient" /> */}
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
            <ElectionCard />
        </div>
    )
}
