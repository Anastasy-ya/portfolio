import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import Background from "./Background/Background";
import * as THREE from "three";

function Scene() {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 4;
  // const { camera } = useThree();

  // useEffect(() => {
  //   const target = [0, 0.75, 0]
  //   camera.lookAt(new THREE.Vector3(...target));
  //   camera.updateProjectionMatrix();
  // }, [camera]);

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      // makeDefault
      orthographic
      camera={{
        // left: (-frustumSize * aspect) / 2,
        // right: (frustumSize * aspect) / 2,
        // top: frustumSize / 2,
        // bottom: -frustumSize / 2,
        near: 0.1,
        far: 10,//TODO изменить на 1.91 после окончательной установки положения камеры
        position: [1.75, 0, 0],
        zoom: 700,
        // fov: 75,
        // lookAt: [0, 0, 0],
      }}
    >
      <color attach="background" args={["back"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Background></Background>
      <OrbitControls target={[0, 0, 0]}/>
    </Canvas>
  );
}

export default Scene;
