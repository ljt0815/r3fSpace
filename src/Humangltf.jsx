/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 .\public\models\humangltf.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/humangltf.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[-0.001, -0.015, 0.009]}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone008} />
          <primitive object={nodes.Bone009} />
          <skinnedMesh name="Cube" geometry={nodes.Cube.geometry} material={materials['Material.001']} skeleton={nodes.Cube.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/humangltf.gltf')