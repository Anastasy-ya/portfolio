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
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useStore } from '../../store/store'

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

  // const boxGeometry = useMemo(
  //   () => new THREE.BoxGeometry(0.08, 0.08, 0.08),
  //   []
  // )

  const boxGeometry = useMemo(
    () => new THREE.DodecahedronGeometry(0.05),
    []
  )

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 'rgba(255, 255, 255, 1)',
      metalness: 1.0,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 1.8,
      side: THREE.FrontSide,
      opacity: 0.5
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
        y: -Math.PI * 2,
        duration: 3,
        ease: 'power2.out'
      },
      0
    )
  }, [isInstancedReady, isLiving])

  useEffect(() => {
    if (!isInstancedReady || !gameState) return /* || !isLiving */

    const dummy = new THREE.Object3D()
    let visibleCount = 0

    //
    const startAngle = Math.PI * 0.12 // 45 градусов от полюса
  const endAngle = Math.PI * 0.88   // 135 градусов от полюса
  const angleRange = endAngle - startAngle
    //

    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        // const index = j * radialSegments + i
        // const theta = (i / radialSegments) * 2 * Math.PI

        // /* */
        // const sphereRadius = Math.cos((j / heightSegments + 5.5) * Math.PI) * radius / 0.9

        // /* */

        // const y = -height / 2 + (j + 0.5) * (height / heightSegments)
        //   dummy.position.set(
        //     sphereRadius * Math.cos(theta),
        //     y - 0.32,
        //     sphereRadius * Math.sin(theta)
        //   )

        const index = j * radialSegments + i
        const theta = (i / radialSegments) * 2 * Math.PI

        const v = j / (heightSegments - 1)
        // const phi = v * Math.PI
        const phi = startAngle + v * angleRange
        

        const sphereRadius = (Math.sin(phi) * radius) / 1.5
        // const sphereRadius = Math.sin(phi) * radius * 0.8
        const y = Math.cos(phi) * height * 0.5

        dummy.position.set(
          sphereRadius * Math.cos(theta),
          y,//всегда 1 TODO
          sphereRadius * Math.sin(theta)
        )
        /* */
        const equatorAngle = Math.PI / 2 // 90 градусов - экватор
      const angleFromEquator = Math.abs(phi - equatorAngle)
      const maxAngleFromEquator = Math.PI / 4 // 45 градусов - максимальное отклонение
      
      // Scale уменьшается от 1 на экваторе до 0.5 у границ
      const scaleFactor = 1 - (angleFromEquator / maxAngleFromEquator) * 0.5
      const scale = Math.max(0.25, scaleFactor)
        /* */

        if (gameState[i][j] === 1) {
          dummy.scale.set(scale, scale, scale)
          // dummy.rotation.set(Math.PI / 4, Math.PI / 4, 0)
          dummy.lookAt(0, 0, 0)
        } else {
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

  useFrame((state, delta) => {
  if (!groupRef.current) return
  
  const time = state.clock.elapsedTime
  const speed = 0.5
  
  groupRef.current.rotation.x = Math.sin(time * 0.7) * 0.1
  groupRef.current.rotation.y -= delta * 0.1 // Постоянное вращение по Y
  groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.05
})

  return (
    <>
      <group ref={groupRef} {...bind()} rotation={rotation} position={[0, -0.15, 0]}>
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
