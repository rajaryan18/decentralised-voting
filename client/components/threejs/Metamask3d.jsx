import React, { useRef } from 'react'
import { useGLTF, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/metamask3d.gltf')
  return (
    <group {...props} dispose={null}>
      <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={60} position={[50, -5, 10]} scale={0.03} />

      <group scale={2}>
        <mesh geometry={nodes.Plane004_1.geometry} material={materials.orange} />
        <mesh geometry={nodes.Plane004_2.geometry} material={materials['blue gray']} />
        <mesh geometry={nodes.Plane004_3.geometry} material={materials.white} />
        <mesh geometry={nodes.Plane004_4.geometry} material={materials.Black} />
        <mesh geometry={nodes.Plane004_5.geometry} material={materials.Brown} />
      </group>
    </group>
  )
}

useGLTF.preload('/metamask3d.gltf')
