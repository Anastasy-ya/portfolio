import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Cubes from './Cubes/Cubes'
import { useRef, useState, useEffect, useMemo } from 'react'
import matrix_1 from '../Matrices/1'
import matrix_2 from '../Matrices/2'
import { Environment } from '@react-three/drei'

function Scene() {
  const matrixes = [matrix_1, matrix_2]
  // const [matrix] = useState(
  //   matrixes[Math.floor(Math.random() * matrixes.length)]
  // )
  const matrix = matrix_1
  const [gameState, setGameState] = useState(matrix)
  const radius = 1.91 // Радиус цилиндра
  const height = 2 // Высота цилиндра
  const radialSegments = 96 // Количество сегментов по окружности
  const heightSegments = 16 // Количество сегментов по высоте

  //TODO убедиться что игра остановится когда закончатся рендеры
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      orthographic
      camera={{
        position: [0, 0, 0],
        zoom: 200, //TODO высчитать в зависимости от экрана
        near: 0.1,
        far: 100
      }}
    >
      <color attach='background' args={['rgb(220, 220, 220)']} />
      <ambientLight intensity={0.5} color='#ffffff' /> // Увеличиваем ambient
      <Cubes
        radius={radius}
        height={height}
        radialSegments={radialSegments}
        heightSegments={heightSegments}
        gameState={gameState}
        setGameState={setGameState}
      />
      <OrbitControls
        // enableZoom={false} //TODO раскомментировать
        target={[0, 0, 0]}
      />
      <Environment preset='dawn' background={false} intensity={0.6} />
    </Canvas>
  )
}

export default Scene
