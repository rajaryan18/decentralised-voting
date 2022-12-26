

import React, { useRef } from 'react'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'

export function Model1(props) {
  const { nodes, materials } = useGLTF('/echain.gltf')
  return (
    <group {...props} dispose={null}>

      <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={30} position={[-5, 0, -20]} scale={25} />

      <group scale={2}></group>
      <mesh geometry={nodes.Sphere057.geometry} material={materials.green} position={[-0.07, -0.22, -1.24]} rotation={[2.2, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere058.geometry} material={materials.green} position={[-0.07, -0.45, -0.94]} rotation={[2.2, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere059.geometry} material={materials.green} position={[-0.07, -0.66, -0.65]} rotation={[2.2, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere054.geometry} material={materials.green} position={[-0.07, 2.99, 0.76]} rotation={[2.18, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere055.geometry} material={materials.green} position={[-0.07, 2.78, 1.08]} rotation={[2.18, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere056.geometry} material={materials.green} position={[-0.07, 2.57, 1.37]} rotation={[2.18, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere060.geometry} material={materials.green} position={[-0.07, 0.88, 0.69]} rotation={[2.09, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere061.geometry} material={materials.green} position={[-0.07, 0.69, 1.03]} rotation={[2.09, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere062.geometry} material={materials.green} position={[-0.07, 0.51, 1.34]} rotation={[2.09, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere063.geometry} material={materials.green} position={[-0.07, 1.89, -1.25]} rotation={[2.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere064.geometry} material={materials.green} position={[-0.07, 1.68, -0.92]} rotation={[2.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere065.geometry} material={materials.green} position={[-0.07, 1.49, -0.62]} rotation={[2.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere066.geometry} material={materials.green} position={[-0.07, -0.65, 0.76]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere067.geometry} material={materials.green} position={[-0.07, -0.42, 1.06]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere068.geometry} material={materials.green} position={[-0.07, -0.2, 1.35]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere069.geometry} material={materials.green} position={[-0.07, 2.6, -1.26]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere070.geometry} material={materials.green} position={[-0.07, 2.84, -0.96]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere071.geometry} material={materials.green} position={[-0.07, 3.06, -0.68]} rotation={[0.91, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere072.geometry} material={materials.green} position={[-0.07, 0.52, -1.27]} rotation={[0.93, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere073.geometry} material={materials.green} position={[-0.07, 0.75, -0.96]} rotation={[0.93, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere074.geometry} material={materials.green} position={[-0.07, 0.97, -0.67]} rotation={[0.93, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere075.geometry} material={materials.green} position={[-0.07, 1.51, 0.71]} rotation={[1.02, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere076.geometry} material={materials.green} position={[-0.07, 1.71, 1.03]} rotation={[1.02, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere077.geometry} material={materials.green} position={[-0.07, 1.9, 1.34]} rotation={[1.02, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere078.geometry} material={materials.green} position={[-0.07, 1.52, 1.98]} rotation={[3.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere079.geometry} material={materials.green} position={[-0.07, 1.13, 1.99]} rotation={[3.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere080.geometry} material={materials.green} position={[-0.07, 0.78, 2]} rotation={[3.13, Math.PI / 2, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere081.geometry} material={materials.green} position={[-0.07, 0.95, -1.95]} rotation={[0.01, 1.57, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere082.geometry} material={materials.green} position={[-0.07, 1.33, -1.95]} rotation={[0.01, 1.57, 0]} scale={0.02} />
      <mesh geometry={nodes.Sphere083.geometry} material={materials.green} position={[-0.07, 1.69, -1.95]} rotation={[0.01, 1.57, 0]} scale={0.02} />
      <mesh geometry={nodes.Cube.geometry} material={materials.Glass} position={[0, -0.98, 0]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials.Glass} position={[0, 3.48, -0.01]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials.Glass} position={[0, 2.36, 1.94]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials.Glass} position={[0, 0.17, 1.94]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube004.geometry} material={materials.Glass} position={[0, 2.38, -1.97]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials.Glass} position={[0, 0.12, -1.96]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials.Glass} position={[0, 1.16, 0]} rotation={[0, -0.76, 0]} scale={[0.26, 0.49, 0.26]} />
      <mesh geometry={nodes.Cylinder007.geometry} material={materials.violet} position={[-0.15, -0.98, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder008.geometry} material={materials.violet} position={[-0.15, 0.12, -1.95]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder019.geometry} material={materials.violet} position={[-0.15, 2.38, -1.95]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder020.geometry} material={materials.violet} position={[-0.15, 3.46, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder021.geometry} material={materials.violet} position={[-0.15, 2.34, 1.95]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder022.geometry} material={materials.violet} position={[-0.15, 0.17, 1.95]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
      <mesh geometry={nodes.Cylinder024.geometry} material={materials.violet} position={[-0.15, 1.15, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.6} />
    </group>
  )
}

useGLTF.preload('/echain.gltf')
