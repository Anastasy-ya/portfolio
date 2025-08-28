import { DragControls } from 'three/addons/controls/DragControls.js'
import * as THREE from 'three'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Glitch,
  ColorAverage,
  Vignette,
  BrightnessContrast
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Plane from '../Plane/Plane'
import { RunGameOfLife } from '../../Actions/RunGameOfLife'

// export function createRoundedBoxGeometry(
//   width,
//   height,
//   depth,
//   radius,
//   smoothness
// ) {
//   const shape = new THREE.Shape()
//   const eps = 0.00001
//   const radius0 = radius - eps

//   shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
//   shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true)
//   shape.absarc(
//     width - radius * 2,
//     height - radius * 2,
//     eps,
//     Math.PI / 2,
//     0,
//     true
//   )
//   shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true)

//   const geometry = new THREE.ExtrudeGeometry(shape, {
//     depth: depth - radius * 2,
//     bevelEnabled: true,
//     bevelSegments: Math.max(smoothness, 2),
//     steps: 1,
//     bevelSize: radius0,
//     bevelThickness: radius,
//     curveSegments: Math.max(smoothness, 2)
//   })
//   geometry.center()

//   return geometry
// }

function Cubes({ radius, height, radialSegments, heightSegments }) {
  const [gameState, setGameState] = useState(null)
  const instancedRef = useRef()
  const planeRef = useRef()
  // const boxGeometry = useMemo(() => {
  //   return createRoundedBoxGeometry(0.1, 0.1, 0.1, 0.02, 6)
  // }, [])
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.1, 0.1, 0.1), [])
  const matrix = null
  const { scene, camera } = useThree()

  // Создаём начальную матрицу жизни
  useEffect(() => {
    const spareMatrix = matrix || []
    if (!spareMatrix.length) {
      for (let i = 0; i < radialSegments; i++) {
        spareMatrix[i] = []
        for (let j = 0; j < heightSegments; j++) {
          spareMatrix[i][j] = Math.random() > 0.5 ? 1 : 0
        }
      }
    }
    setGameState(spareMatrix)
  }, [])

  // Включение игры в жизнь
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevMatrix => RunGameOfLife(prevMatrix))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 1.0,
      side: THREE.FrontSide,
      envMapIntensity: 3.0,
      transmission: 0.1,
      thickness: 0.1
      // wireframe: true,
    })
    return mat
  }, [])

  // Анимация для динамических эффектов
  useFrame(state => {
    if (material.userData.shader) {
      material.userData.shader.uniforms.time.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    if (!instancedRef.current || !gameState) return

    const dummy = new THREE.Object3D()
    let visibleCount = 0

    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        const index = j * radialSegments + i
        const theta = (i / radialSegments) * 2 * Math.PI

        if (gameState[i][j] === 1) {
          const y = -height / 2 + (j + 0.5) * (height / heightSegments)
          dummy.position.set(
            radius * Math.cos(theta),
            y,
            radius * Math.sin(theta)
          )
          dummy.scale.set(1, 1, 1)
          // dummy.rotation.y = theta
          // dummy.rotation.z = Math.PI/4
          dummy.rotation.y = -Math.PI / 8
          dummy.rotation.x = Math.PI / 8
        } else {
          const y = -height / 2 + (j + 0.5) * (height / heightSegments)
          dummy.position.set(
            radius * Math.cos(theta),
            y + height / 2,
            radius * Math.sin(theta)
          )
          dummy.scale.set(0.01, 0.01, 0.01)
        }
        visibleCount++
        dummy.updateMatrix()
        instancedRef.current.setMatrixAt(index, dummy.matrix)
      }
    }

    instancedRef.current.instanceMatrix.needsUpdate = true
    instancedRef.current.count = visibleCount
  }, [gameState, radialSegments, heightSegments, height, radius])

  return (
    <>
      <instancedMesh
        ref={instancedRef}
        args={[boxGeometry, material, radialSegments * heightSegments]}
      />
      <Plane
        ref={planeRef}
      />

      {/* <EffectComposer></EffectComposer> */}
    </>
  )
}

export default Cubes
