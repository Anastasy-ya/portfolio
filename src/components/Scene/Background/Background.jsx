import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

function Background({ radius, height, radialSegments, heightSegments }) {
  const cylinderGeometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    radialSegments,
    heightSegments,
    true
  )

  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0x00fffe,
    transparent: true,
    // opacity: 0.2,
    // side: THREE.BackSide,
    // wireframe: true
  })

  return (
    <mesh
      // ref={cylinderRef}//
      geometry={cylinderGeometry}
      material={cylinderMaterial}
      position={[0, 0, 0]}
    />
  )
}
//вращение перенести из cubes, cubes сделать дочерним, отслеживать вращение на цилиндреян

export default Background
