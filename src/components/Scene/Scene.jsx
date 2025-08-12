import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import Background from "./Background/Background";
import Cubes from "./Cubes/Cubes";
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
        near: 1,
        far: 20,//TODO изменить на 1.91 после окончательной установки положения камеры
        position: [-1, 0, 0],//удаление от центра, подъем (и взгляд сверху), удаление от центра
        zoom: 700,
        // fov: 75,

      }}
    >
      <color attach="background" args={["gray"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Background radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments}></Background>
      <Cubes radius={radius} height={height} radialSegments={radialSegments} heightSegments={heightSegments} />
      <OrbitControls
        target={[0, 0, 0]}
      // enableZoom={false}
      //     minPolarAngle={Math.PI / 2}  // Фиксирует угол наклона (0 = сверху, PI/2 = горизонтально)
      // maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

export default Scene;
