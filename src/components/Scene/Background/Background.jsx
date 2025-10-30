import * as THREE from 'three'
import { useRef, useMemo } from 'react'

const cylinderMaterial = new THREE.MeshBasicMaterial({
  color: 0x00fffe,
  transparent: true,
  opacity: 0.0,
  side: THREE.BackSide,
  // wireframe: true
})

function Background({ radius, height, radialSegments, heightSegments }) {
  const cylinderGeometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        radius,
        radius,
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
    />
  )
}

export default Background
