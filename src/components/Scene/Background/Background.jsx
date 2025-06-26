// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Cube from '../Cube/Cube'

function Background() {
  // const radius = 2; // Радиус цилиндра (4 метра в диаметре)
  // const height = 2; // Высота цилиндра
  // const radialSegments = 72; // Количество сегментов по окружности
  // const heightSegments = 18; // Количество сегментов по высоте

  const radius = 1.91; // Радиус цилиндра
  const height = 2; // Высота цилиндра
  const radialSegments = 96; // Количество сегментов по окружности
  const heightSegments = 16; // Количество сегментов по высоте

  // Создание цилиндра
  const cylinderGeometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    radialSegments,
    heightSegments,
    true
  );

  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFE,
    transparent: true,
    // opacity: 0.2,
    side: THREE.BackSide,
    wireframe: true,
  });

  // Создание массива кубиков
  //каждый куб пометить true/false для скрытия/отображения
  const cubes = [];
  for (let i = 0; i < radialSegments; i++) {
    const theta = (i / radialSegments) * 2 * Math.PI;
    for (let j = 0; j < heightSegments; j++) {
      const y = -height / 2 + (j + 0.5) * (height / heightSegments);
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      //применить функцию для добавления метки
      cubes.push(
        <Cube x={x} y={y} z={z} i={i} j={j} key={`${i}-${j}`} />
      );
    }
  }

  console.log(cubes)

  return (
    <>
      <mesh geometry={cylinderGeometry} material={cylinderMaterial} />
      {cubes}
    </>
  );
}

export default Background