import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import Background from "./Background/Background";
import Cubes from "./Cubes/Cubes";
import Plane from "./Plane/Plane"
// import { RunGameOfLife } from "../../Actions/RunGameOfLife";



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
        zoom: 700,
        near: 0.1,
        far: 100,
      }}
    >
      <color attach="background" args={["gray"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Background radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments}></Background>
      <Cubes radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments} />
      <Plane></Plane>
      <OrbitControls
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}

export default Scene;
