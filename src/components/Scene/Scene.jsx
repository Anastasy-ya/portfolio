import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Cubes from './Cubes/Cubes'
import { useRef, useState, useEffect, useMemo } from 'react'
// import matrix_1 from '../Matrices/1'
// import matrix_2 from '../Matrices/2'
// import matrix_0 from '../Matrices/0'
import { Environment } from '@react-three/drei'

function Scene({ matrix }) {
  const [gameState, setGameState] = useState(matrix) //дублирую matrix чтобы не мутировать первоначальную матрицу
  const radius = 1.91 // Радиус цилиндра
  const height = 2 // Высота цилиндра
  // const radialSegments = 96 // Количество сегментов по окружности
  // const heightSegments = 16 // Количество сегментов по высоте
  const { radialSegments, heightSegments } = useMemo(
    () => ({
      radialSegments: 96, // Количество сегментов по окружности
      heightSegments: 16 // Количество сегментов по высоте
    }),
    []
  )

  const [windowSize, setWindowSize] = useState(350)

  const handleResize = () => {
    setWindowSize(getWindowSize())
  }

  const getWindowSize = () => {
    const width = window.innerWidth
    if (width < 500) return 200
    if (width < 800 && width >= 501) return 200
    if (width < 1200 && width >= 801) return 300
    if (width < 1500 && width >= 1201) return 300
    if (width < 2100 && width >= 1501) return 550
    if (width < 3000 && width >= 2101) return 770
    return 770
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      orthographic
      camera={{
        position: [0, 0, 0],
        zoom: windowSize, //TODO высчитать в зависимости от экрана
        near: 0.1,
        far: 100
      }}
    >
      <color attach='background' args={['rgb(220, 220, 220)']} />
      <ambientLight intensity={0.5} color='#ffffff' />
      <Cubes
        radius={radius}
        height={height}
        radialSegments={radialSegments}
        heightSegments={heightSegments}
        gameState={gameState}
        setGameState={setGameState}
      />
      <OrbitControls
        enableZoom={false} //TODO раскомментировать
        enableRotate={false}
        target={[0, 0, 0]}
      />
      <Environment preset='dawn' background={false} intensity={0.6} />
    </Canvas>
  )
}

export default Scene
