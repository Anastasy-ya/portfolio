import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useStore } from '../../store/store'

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: 0x00fffe,
  transparent: true,
  opacity: 0.0,
  side: THREE.BackSide,
})

function Background({ radius, height, radialSegments, heightSegments }) {

  // const isLiving = useStore(s => s.isLiving)
  const toggleLiving = useStore(s => s.toggleLiving)

  const cylinderGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        radius * 0.7,
        radius * 0.7,
        height,
        radialSegments,
        heightSegments,
        true
      ),
    [radius, height, radialSegments, heightSegments]
  )

  return (
    <mesh
      geometry={cylinderGeometry}
      material={cylinderMaterial}
      position={[0, 0, 0]}
      onPointerOver={() => {
        toggleLiving(true)
      }}
      onPointerDown={() => {
        toggleLiving(true)
      }}
      onPointerOut={() => {
        toggleLiving(false)
      }}
      onPointerUp={() => {
        toggleLiving(false)
      }}
    />
  )
}

export default Background