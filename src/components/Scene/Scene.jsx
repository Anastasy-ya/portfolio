import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { DragControls } from 'three/addons/controls/DragControls.js';
import { OrbitControls } from "@react-three/drei";

// import { useEffect } from "react";
import Background from "./Background/Background";
import Cubes from "./Cubes/Cubes";
// import Plane from "./Plane/Plane"
// import { RunGameOfLife } from "../../Actions/RunGameOfLife";
// import {
//     BloomEffect,
//     EffectComposer, 
//     EffectPass, 
//     SSAO
// } from "postprocessing";



function Scene() {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 4;
  // const { camera } = useThree();
  const radius = 1.91; // Радиус цилиндра
  const height = 2; // Высота цилиндра
  const radialSegments = 96; // Количество сегментов по окружности
  const heightSegments = 16; // Количество сегментов по высоте

  

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}

      orthographic
      camera={{
        position: [0, 0, 0],
        zoom: 350,
        near: 0.1,
        far: 100,
      }}
    >
      <color attach="background" args={["rgb(217, 223, 233)"]} />
      {/* <ambientLight /> */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#ffffee"
      />
      <pointLight position={[1, 1, 1]} />
      <pointLight
        position={[-5, -5, -5]}
        intensity={0.8}
        color="#ffdddd"
      />
      <Background radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments}></Background>
      <Cubes radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments} />
      {/* <Plane></Plane> */}
      <OrbitControls
        target={[0, 0, 0]}
      />
      {/* <EffectComposer>
        <BloomEffect
          intensity={0.5}
          kernelSize={3}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.1}
        />
        <SSAO
          intensity={30}
          radius={0.2}
          bias={0.1}
        />
      </EffectComposer> */}
    </Canvas>
  );
}

export default Scene;
