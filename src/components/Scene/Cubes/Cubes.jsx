import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import Background from '../Background/Background'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
// import {
//   EffectComposer,
//   Bloom,
//   ChromaticAberration,
//   Glitch,
//   ColorAverage,
//   Vignette,
//   BrightnessContrast
// } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
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

function Cubes({ radius, height, radialSegments, heightSegments, gameState, setGameState }) {
  
  // const [gameState, setGameState] = useState(matrix)// подумать стоит ли мутировать первоначальную матрицу или все же пусть будет два дублирующих стейта как реализовано сейчас
  // const { gameState, setGameState } = useStore((s) => s);
  // console.log(gameState, 'gameState')
  const groupRef = useRef()
  const instancedRef = useRef()
  const planeRef = useRef()
  // const boxGeometry = useMemo(() => {
  //   return createRoundedBoxGeometry(0.1, 0.1, 0.1, 0.02, 6)
  // }, [])
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.1, 0.1, 0.1), [])
  // const matrix = null
  // const { scene, camera } = useThree()

  const [rotation, setRotation] = useState([0, 0, 0]) //реализация вращения цилиндра
  const responsiveness = 20 //TODO перенести в стор
  const { size } = useThree()
  const euler = useMemo(() => new THREE.Euler(), [])

  const bind = useDrag(({ delta: [dx, dy] }) => {
    euler.y += (dx / size.width) * responsiveness
    // euler.x += (dy / size.width) * responsiveness
    // euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 2, Math.PI / 2)
    setRotation(euler.toArray().slice(0, 3))
  })



  

  useEffect(() => {
    if (gameState.length > 0) {
      // если не загрузится матрица, сгенерируется рандомная
      const spareMatrix = gameState || []
      if (!spareMatrix.length) {
        for (let i = 0; i < radialSegments; i++) {
          spareMatrix[i] = []
          for (let j = 0; j < heightSegments; j++) {
            spareMatrix[i][j] = Math.random() > 0.5 ? 1 : 0
          }
        }
      }
      // console.log(spareMatrix, 'spareMatrix')
      setGameState(spareMatrix)

    }
  }, [])

  // Включение игры в жизнь
  useEffect(() => {
    // if (gameState.length > 0) {
      const interval = setInterval(() => {
        setGameState((prevMatrix) => RunGameOfLife(prevMatrix)) //раскомментируй меня
      }, 800)
      return () => clearInterval(interval)
    // }
  }, []) //TODO юзэффекты можно объединить

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

  //   const material = new THREE.MeshStandartMaterial({
  //   color: 0x156289,
  //   emissive: 0x072534,
  //   specular: 0xffffff,
  //   shininess: 100,
  //   flatShading: true,
  // });

  // Анимация для динамических эффектов
  useFrame(state => {
    if (material.userData.shader) {
      material.userData.shader.uniforms.time.value = state.clock.elapsedTime
    }
  })

  useEffect(() => {
    // console.log(gameState, 'gameState')
    // console.log(instancedRef.current, 'instancedRef.current')
    if (!instancedRef.current || !gameState) return <h1>какая-то хреновня</h1>
    const dummy = new THREE.Object3D()
    let visibleCount = 0

    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        const index = j * radialSegments + i
        const theta = (i / radialSegments) * 2 * Math.PI

        // console.log(gameState, 'gameState перед отрисовкой')
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
          // dummy.rotation.y = -Math.PI / 8
          // dummy.rotation.x = Math.PI / 8
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
  }, [gameState, instancedRef, radialSegments, heightSegments, height, radius])

  
  return (
    <>
      <group ref={groupRef} {...bind()} rotation={rotation}>
        <Background
          radius={radius}
          height={height}
          radialSegments={radialSegments}
          heightSegments={heightSegments}
        ></Background>
        <instancedMesh
          ref={instancedRef}
          args={[boxGeometry, material, radialSegments * heightSegments]}
        />
      </group>
      <Plane ref={planeRef} />

      {/* <EffectComposer></EffectComposer> */}
    </>
  )
}

export default Cubes
