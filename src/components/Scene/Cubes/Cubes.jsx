// import { useDrag } from '@use-gesture/react'
// import * as THREE from 'three'
// import Background from '../Background/Background'
// import Plane from '../Plane/Plane'
// import { RunGameOfLife } from '../../Actions/RunGameOfLife'
// import { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
// import { useThree } from '@react-three/fiber'
// import { gsap } from 'gsap'
// import { useStore } from '../../store/store'

// function Cubes({
//   radius,
//   height,
//   radialSegments,
//   heightSegments,
//   gameState,
//   setGameState
// }) {
//   //variables
//   const responsiveness = 5
//   //ref
//   const groupRef = useRef()
//   const instancedRef = useRef()
//   const planeRef = useRef()
//   const isDragging = useRef(false)
//   //state
//   const [rotation, setRotation] = useState([0, 0, 0])
//   const [isInstancedReady, setIsInstancedReady] = useState(false)
//   const [isAlreadyRendered, setIsAlreadyRendered] = useState(false)
//   //other
//   const { size } = useThree()
//   const euler = useMemo(() => new THREE.Euler(), [])
//   //store
//   const gameSpeed = useStore(s => s.gameSpeed)
//   const isLiving = useStore(s => s.isLiving)

//   const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, 0.05), [])
//   const material = useMemo(() => {
//     return new THREE.MeshPhysicalMaterial({
//       color: 0xffffff,
//       metalness: 0.05,
//       roughness: 0.05,
//       clearcoat: 1.0,
//       clearcoatRoughness: 0.01,
//       reflectivity: 1.0,
//       side: THREE.FrontSide,
//       envMapIntensity: 3.0,
//       transmission: 0.1,
//       thickness: 0.1
//     })
//   }, [])

//   useLayoutEffect(() => {
//     if (instancedRef.current && !isInstancedReady) {
//       setIsInstancedReady(true)
//     }
//   }, [instancedRef.current, isInstancedReady])

//   useEffect(() => {
//     if (!groupRef.current || !isInstancedReady || !isLiving) return

//     groupRef.current.scale.set(15, 15, 15)
//     groupRef.current.rotation.y = 0

//     const tl = gsap.timeline()

//     tl.to(
//       groupRef.current.scale,
//       {
//         x: 1,
//         y: 1,
//         z: 1,
//         duration: 1,
//         ease: 'expo.out'
//       },
//       0
//     )

//     tl.to(
//       groupRef.current.rotation,
//       {
//         y: Math.PI * 2,
//         duration: 3,
//         ease: 'power2.out'
//       },
//       0
//     )
//   }, [isInstancedReady, isLiving])

//   useEffect(() => {
//     if (!isInstancedReady || !gameState) return

//     const dummy = new THREE.Object3D()
//     let visibleCount = 0

//     for (let j = 0; j < heightSegments; j++) {
//       for (let i = 0; i < radialSegments; i++) {
//         const index = j * radialSegments + i
//         const theta = (i / radialSegments) * 2 * Math.PI

//         if (gameState[i][j] === 1) {
//           const y = -height / 2 + (j + 0.5) * (height / heightSegments)
//           dummy.position.set(
//             radius * Math.cos(theta),
//             y - 0.32,
//             radius * Math.sin(theta)
//           )
//           dummy.scale.set(1, 1, 1)
//           dummy.rotation.set(Math.PI / 4, Math.PI / 4, 0)
//         } else {
//           const y = -height / 2 + (j + 0.5) * (height / heightSegments)
//           dummy.position.set(
//             radius * Math.cos(theta),
//             y + height / 2,
//             radius * Math.sin(theta)
//           )
//           dummy.scale.set(0.01, 0.01, 0.01)
//         }

//         dummy.updateMatrix()
//         instancedRef.current.setMatrixAt(index, dummy.matrix)
//         visibleCount++
//       }
//     }

//     instancedRef.current.instanceMatrix.needsUpdate = true
//     instancedRef.current.count = visibleCount
//   }, [
//     isInstancedReady,
//     gameState,
//     radialSegments,
//     heightSegments,
//     height,
//     radius
//     // isLiving
//   ])

//   useEffect(() => {
//     if (!gameState || !isLiving) return

//     // setIsAlreadyRendered(true)

//     const interval = setInterval(() => {
//       setGameState(prev => RunGameOfLife(prev))
//     }, gameSpeed)

//     return () => clearInterval(interval)
//   }, [gameState, setGameState, isLiving, gameSpeed])

//   const bind = useDrag(({ delta: [dx], down }) => {
//     isDragging.current = down
//     if (down) {
//       euler.y += (dx / size.width) * responsiveness
//       setRotation(euler.toArray().slice(0, 3))
//     }
//   })

//   useEffect(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.set(...rotation)
//     }
//   }, [rotation])

//   return (
//     <>
//       <group ref={groupRef} {...bind()} rotation={rotation}>
//         <Background
//           radius={radius}
//           height={height}
//           radialSegments={radialSegments}
//           heightSegments={heightSegments}
//         />
//         {/* {isAlreadyRendered && ( */}
//           <instancedMesh
//             ref={instancedRef}
//             args={[boxGeometry, material, radialSegments * heightSegments]}
//           />
//         {/* )} */}
//       </group>
//       <Plane ref={planeRef} />
//     </>
//   )
// }

// export default Cubes

////Выше незаконченный вариант для загрузки с работающей игрой, ниже законченное решение, но его надо еще раз проверить TODO

import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import Background from '../Background/Background'
import Plane from '../Plane/Plane'
import { RunGameOfLife } from '../../Actions/RunGameOfLife'
import { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useStore } from '../../store/store'
import { useResize } from '../../Actions/hooks/useResize'

// import gsap from 'gsap';
// import Draggable from 'gsap/Draggable';

function Cubes({
  radius,
  height,
  radialSegments,
  heightSegments,
  gameState,
  setGameState
}) {
  //variables
  const responsiveness = 5
  //ref
  const groupRef = useRef()
  const instancedRef = useRef()
  const planeRef = useRef()
  const isDragging = useRef(false)
  const hasAnimationStarted = useRef(false)
  //state
  const [rotation, setRotation] = useState([0, 0, 0])
  const [isInstancedReady, setIsInstancedReady] = useState(false)
  //other
  const { size } = useThree()
  const euler = useMemo(() => new THREE.Euler(), [])
  //store
  const gameSpeed = useStore(s => s.gameSpeed)
  const isLiving = useStore(s => s.isLiving)

  const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, 0.05), [])
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
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
    })
  }, [])

  useLayoutEffect(() => {
    if (instancedRef.current && !isInstancedReady) {
      setIsInstancedReady(true)
    }
  }, [instancedRef.current, isInstancedReady])

  useEffect(() => {
    if (
      !groupRef.current ||
      !isInstancedReady ||
      !isLiving ||
      hasAnimationStarted.current
    )
      return

    hasAnimationStarted.current = true
    groupRef.current.scale.set(15, 15, 15)
    groupRef.current.rotation.y = 0

    const tl = gsap.timeline()

    tl.to(
      groupRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: 'expo.out'
      },
      0
    )

    tl.to(
      groupRef.current.rotation,
      {
        y: Math.PI * 2,
        duration: 3,
        ease: 'power2.out'
      },
      0
    )
  }, [isInstancedReady, isLiving])

  useEffect(() => {
    if (!isInstancedReady || !gameState || !isLiving) return

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
            y - 0.32,
            radius * Math.sin(theta)
          )
          dummy.scale.set(1, 1, 1)
          dummy.rotation.set(Math.PI / 4, Math.PI / 4, 0)
        } else {
          const y = -height / 2 + (j + 0.5) * (height / heightSegments)
          dummy.position.set(
            radius * Math.cos(theta),
            y + height / 2,
            radius * Math.sin(theta)
          )
          dummy.scale.set(0.01, 0.01, 0.01)
        }

        dummy.updateMatrix()
        instancedRef.current.setMatrixAt(index, dummy.matrix)
        visibleCount++
      }
    }

    instancedRef.current.instanceMatrix.needsUpdate = true
    instancedRef.current.count = visibleCount
  }, [
    isInstancedReady,
    gameState,
    radialSegments,
    heightSegments,
    height,
    radius,
    isLiving
  ])

  useEffect(() => {
    if (!gameState || !isLiving) return

    const interval = setInterval(() => {
      setGameState(prev => RunGameOfLife(prev))
    }, gameSpeed)

    return () => clearInterval(interval)
  }, [gameState, setGameState, isLiving, gameSpeed])

  const bind = useDrag(({ delta: [dx], down }) => {
    isDragging.current = down
    if (down) {
      euler.y += (dx / size.width) * responsiveness
      setRotation(euler.toArray().slice(0, 3))
    }
  })

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(...rotation)
    }
  }, [rotation])

  return (
    <>
      <group ref={groupRef} {...bind()} rotation={rotation}>
        <Background
          radius={radius}
          height={height}
          radialSegments={radialSegments}
          heightSegments={heightSegments}
        />

        <instancedMesh
          ref={instancedRef}
          args={[boxGeometry, material, radialSegments * heightSegments]}
        />
      </group>
      <Plane ref={planeRef} />
    </>
  )
}

export default Cubes

//Во вторую очередь реализовать изначально выключенное состояние игры, при этом кубики появляются с анимацией только в первый раз. Ниже асинхронная ошибка TODO разобраться с ней и сделать появление кубиков только по выбору пользователя

// import { useDrag } from '@use-gesture/react'
// import * as THREE from 'three'
// import Background from '../Background/Background'
// import Plane from '../Plane/Plane'
// import { RunGameOfLife } from '../../Actions/RunGameOfLife'
// import { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
// import { useThree } from '@react-three/fiber'
// import { gsap } from 'gsap'
// import { useStore } from '../../store/store'

// function Cubes({
//   radius,
//   height,
//   radialSegments,
//   heightSegments,
//   gameState,
//   setGameState
// }) {
//   //variables
//   const responsiveness = 5
//   //ref
//   const groupRef = useRef()
//   const instancedRef = useRef()
//   const planeRef = useRef()
//   const isDragging = useRef(false)
//   const hasAnimationStarted = useRef(false);
//   //state
//   const [rotation, setRotation] = useState([0, 0, 0])
//   const [isInstancedReady, setIsInstancedReady] = useState(false)
//   //other
//   const { size } = useThree()
//   const euler = useMemo(() => new THREE.Euler(), [])
//   const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.05, 0.05, 0.05), [])
//   const material = useMemo(() => {
//     return new THREE.MeshPhysicalMaterial({
//       color: 0xffffff,
//       metalness: 0.05,
//       roughness: 0.05,
//       clearcoat: 1.0,
//       clearcoatRoughness: 0.01,
//       reflectivity: 1.0,
//       side: THREE.FrontSide,
//       envMapIntensity: 3.0,
//       transmission: 0.1,
//       thickness: 0.1
//     })
//   }, [])
//   const gameSpeed = useStore(s => s.gameSpeed)
//   const isLiving = useStore(s => s.isLiving)

//   useLayoutEffect(() => {
//     if (instancedRef.current && !isInstancedReady) {
//       setIsInstancedReady(true)
//     }
//   }, [instancedRef.current, isInstancedReady])

//   useEffect(() => {
//     if (!groupRef.current || !isInstancedReady || !instancedRef.current) return;

//     instancedRef.current.visible = isLiving || hasAnimationStarted.current;

//     if (isLiving && !hasAnimationStarted.current) {
//       hasAnimationStarted.current = true;

//       groupRef.current.scale.set(15, 15, 15)
//       groupRef.current.rotation.y = 0

//       const tl = gsap.timeline()

//       tl.to(
//         groupRef.current.scale,
//         {
//           x: 1,
//           y: 1,
//           z: 1,
//           duration: 1,
//           ease: 'expo.out'
//         },
//         0
//       )

//       tl.to(
//         groupRef.current.rotation,
//         {
//           y: Math.PI * 2,
//           duration: 3,
//           ease: 'power2.out'
//         },
//         0
//       );
//     }
//   }, [isInstancedReady, isLiving]);

//   useEffect(() => {
//     if (!isInstancedReady || !gameState || !isLiving) return

//     const dummy = new THREE.Object3D()
//     let visibleCount = 0

//     for (let j = 0; j < heightSegments; j++) {
//       for (let i = 0; i < radialSegments; i++) {
//         const index = j * radialSegments + i
//         const theta = (i / radialSegments) * 2 * Math.PI

//         if (gameState[i][j] === 1) {
//           const y = -height / 2 + (j + 0.5) * (height / heightSegments)
//           dummy.position.set(
//             radius * Math.cos(theta),
//             y - 0.32,
//             radius * Math.sin(theta)
//           )
//           dummy.scale.set(1, 1, 1)
//           dummy.rotation.set(Math.PI / 4, Math.PI / 4, 0)
//         } else {
//           const y = -height / 2 + (j + 0.5) * (height / heightSegments)
//           dummy.position.set(
//             radius * Math.cos(theta),
//             y + height / 2,
//             radius * Math.sin(theta)
//           )
//           dummy.scale.set(0.01, 0.01, 0.01)
//         }

//         dummy.updateMatrix()
//         instancedRef.current.setMatrixAt(index, dummy.matrix)
//         visibleCount++
//       }
//     }

//     instancedRef.current.instanceMatrix.needsUpdate = true
//     instancedRef.current.count = visibleCount
//   }, [
//     isInstancedReady,
//     gameState,
//     radialSegments,
//     heightSegments,
//     height,
//     radius,
//     isLiving
//   ])

//   useEffect(() => {
//     if (!gameState || !isLiving) return

//     const interval = setInterval(() => {
//       setGameState(prev => RunGameOfLife(prev))
//     }, gameSpeed)

//     return () => clearInterval(interval)
//   }, [gameState, setGameState, isLiving, gameSpeed])

//   const bind = useDrag(({ delta: [dx], down }) => {
//     isDragging.current = down
//     if (down) {
//       euler.y += (dx / size.width) * responsiveness
//       setRotation(euler.toArray().slice(0, 3))
//     }
//   })

//   useEffect(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.set(...rotation)
//     }
//   }, [rotation])

//   return (
//     <>
//       <group ref={groupRef} {...bind()} rotation={rotation}>
//         <Background
//           radius={radius}
//           height={height}
//           radialSegments={radialSegments}
//           heightSegments={heightSegments}
//         />

//         <instancedMesh
//           ref={instancedRef}
//           args={[boxGeometry, material, radialSegments * heightSegments]}

//         />

//       </group>
//       <Plane ref={planeRef} />
//     </>
//   )
// }

// export default Cubes
