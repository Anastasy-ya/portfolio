import { useRef, useEffect, useState, useFrame } from 'react'
import * as THREE from 'three'
// import { matrix } from "../../Matrices/1";
import { RunGameOfLife } from '../../Actions/RunGameOfLife'

function Cubes({ radius, height, radialSegments, heightSegments }) {
  const [gameState, setGameState] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const instancedRef = useRef()
  const boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  const material = new THREE.MeshStandardMaterial({ color: 'white' })
  const matrix = null //



  //Создаём начальную матрицу жизни
  useEffect(() => {
    const spareMatrix = matrix || []
    if (!spareMatrix.length) {
      //если нет матрицы, сгенерировать случайную
      for (let i = 0; i < radialSegments; i++) {
        spareMatrix[i] = []
        for (let j = 0; j < heightSegments; j++) {
          // Случайное начальное состояние (1 или 0)
          spareMatrix[i][j] = Math.random() > 0.5 ? 1 : 0
        }
      }
    }

    console.log(spareMatrix, 'matrix')
    setGameState(spareMatrix) //TODO раскомментировать
    // return matrix;
  }, [])

  ///включение игры в жизнь
  // TODO сравнение матриц и остановка игры
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevMatrix => RunGameOfLife(prevMatrix))
    }, 1000)

    return () => clearInterval(interval) // очистка при размонтировании
  }, [])

  ///////

  useEffect(() => {
    if (!instancedRef.current || !gameState) return

    const dummy = new THREE.Object3D()
    let visibleCount = 0

    // Перебираем сначала высоту
    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        const index = j * radialSegments + i // Индекс рассчитываем как: строка * количество_столбцов + столбец
        const theta = (i / radialSegments) * 2 * Math.PI // Угол для i-го сегмента

        if (gameState[i][j] === 1) {
          // - По X и Z: координаты на окружности (radius * cos(theta), radius * sin(theta))
          // - По Y: равномерно распределяем по высоте
          const y = -height / 2 + (j + 0.5) * (height / heightSegments)
          dummy.position.set(
            radius * Math.cos(theta),
            y, //высота смещения цилиндра, поставленного над плоскостью position={[0, height / 2, 0]}
            radius * Math.sin(theta)
          )
          dummy.scale.set(1, 1, 1) // Убедимся, что кубик видим
        } else {
          const y = -height / 2 + (j + 0.5) * (height / heightSegments) // TODO повтор логики, оптимизировать

          dummy.position.set(
            radius * Math.cos(theta),
            y + height / 2,
            radius * Math.sin(theta)
          )
          // "Убиваем" клетку — перемещаем её далеко или скрываем
          // dummy.position.set(1000, 1000, 1000);
          dummy.scale.set(0.01, 0.01, 0.01) //они не отрисовываются, а должны
        }
        visibleCount++
        dummy.updateMatrix()
        instancedRef.current.setMatrixAt(index, dummy.matrix) //раскомментировать
      }
    }

    instancedRef.current.instanceMatrix.needsUpdate = true
    instancedRef.current.count = visibleCount
  }, [gameState, radialSegments, heightSegments, height, radius])

  return (
    <instancedMesh
      ref={instancedRef}
      args={[boxGeometry, material, radialSegments * heightSegments]}
    />
  )
}

export default Cubes
