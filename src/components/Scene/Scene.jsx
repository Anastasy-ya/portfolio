import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// import { useEffect } from "react";
import Background from './Background/Background'
import Cubes from './Cubes/Cubes'
// import Plane from "./Plane/Plane"
// import { RunGameOfLife } from "../../Actions/RunGameOfLife";
// import {
//     BloomEffect,
//     EffectComposer,
//     EffectPass,
//     SSAO
// } from "postprocessing";
import { Environment } from '@react-three/drei'

function Scene() {
  const aspect = window.innerWidth / window.innerHeight
  const frustumSize = 4
  // const { camera } = useThree();
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
      {/* <ambientLight /> */}
      <>
        <ambientLight intensity={0.5} color='#ffffff' /> // Увеличиваем ambient
        {/* <directionalLight
    position={[10, 10, 5]}
    intensity={1.8}
    color="#ffffff"
  /> */}
        {/* <pointLight 
    position={[1, 1, 1]} 
    intensity={1.2}
    distance={10}
  />
  <pointLight
    position={[-5, -5, -5]}
    intensity={1.0}
    color="#ffffff"
    distance={8}
  />
  // Добавляем fill light
  <directionalLight
    position={[-5, -5, -3]}
    intensity={0.6}
    color="#ffffff"
  /> */}
      </>

      <Cubes
        radius={radius}
        height={height}
        radialSegments={radialSegments}
        heightSegments={heightSegments}
      />
      <OrbitControls 
      // enableZoom={false} //TODO раскомментировать
      target={[0, 0, 0]} />
      <Environment
        preset='dawn'
        background={false}
        intensity={0.6}
      />
    </Canvas>
  )
}

export default Scene
