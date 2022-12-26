
import Image from 'next/image'
import meta from "../../public/metamask.png"
import ethe from "../../public/trio.png"
import { Canvas } from '@react-three/fiber'
// import { Model } from '../components/threejs/Metamask3d'
import { OrbitControls } from '@react-three/drei'
import { Model1 } from '../threejs/Echain';

const CanvasCard = () => (
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

);

export default CanvasCard;