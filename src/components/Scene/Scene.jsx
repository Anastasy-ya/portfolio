import { Canvas, useThree, useFrame,   } from '@react-three/fiber'
import { OrbitControls,  } from '@react-three/drei'
import Cubes from './Cubes/Cubes'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Environment } from '@react-three/drei'
import { useStore } from '../store/store'
import * as THREE from 'three'

function Scene() {
  const matrix = useStore(s => s.matrix)
  const isOpenModal = useStore(s => s.isOpenModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const setIsOpenFooterModal = useStore(s => s.setIsOpenFooterModal)
  const setModalType = useStore(s => s.setModalType)
  const isOpenFooterModal = useStore(s => s.isOpenFooterModal)
  const windowWidth = useStore(s => s.windowWidth)

  const [gameState, setGameState] = useState(matrix) //дублирую matrix чтобы не мутировать первоначальную матрицу
  const radius = 1.91 // Радиус цилиндра
  const height = 2 // Высота цилиндра
  const { radialSegments, heightSegments } = useMemo(
    () => ({
      radialSegments: 96, // Количество сегментов по окружности
      heightSegments: 16 // Количество сегментов по высоте
    }),
    []
  )

  const [windowSize, setWindowSize] = useState(350) //TODO проверить на утечки памяти это не дублирование windowWidth из стора!

  function handleOpenCloseModals() {
    if (isOpenModal || isOpenFooterModal) {
      setIsOpenModal(false)
      setIsOpenFooterModal(false)
      setTimeout(() => {
        setModalType(null)
      }, 300)
    }
  }

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        handleOpenCloseModals()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [modalType, isOpenModal, isOpenFooterModal])

  useEffect(() => {
    setGameState(matrix)
  }, [matrix])

  const handleResize = () => {
    setWindowSize(getWindowSize())
  }

  const getWindowSize = () => {
    if (windowWidth < 500) return 200
    if (windowWidth < 800 && windowWidth >= 500) return 200
    if (windowWidth < 1200 && windowWidth >= 800) return 300
    if (windowWidth < 1500 && windowWidth >= 1200) return 300
    if (windowWidth < 2100 && windowWidth >= 1500) return 500
    if (windowWidth < 3000 && windowWidth >= 2100) return 550
    return 770
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const baseZoom = useMemo(() => getWindowSize(), [])
  //TODO
  const minZoom = windowSize - 130
  const maxZoom = windowSize + 350

  return (
    <section className='canvas-wrapper'>
      <Canvas
        onClick={handleOpenCloseModals}
        id='canvas'
        style={{ width: '100vw', height: '100vh' }}
        orthographic
        camera={{
          position: [0, 0, 0],
          zoom: windowSize,
          near: -2,
          far: 15
        }}
      >
        <fog attach='fog' args={['rgba(184, 192, 217, 1)', 0, 3]} />

        <color attach='background' args={['rgb(220, 220, 220)']} />

        <Environment
          files='/environment/industrial_sunset_puresky_4k.exr'
          intensity={1.0}
          background={false}
        />

        <Cubes
          radius={radius}
          height={height}
          radialSegments={radialSegments}
          heightSegments={heightSegments}
          gameState={gameState}
          setGameState={setGameState}
        />
        <OrbitControls
          enableRotate={false}
          target={[0, 0, 0]}
          minZoom={minZoom}
          maxZoom={maxZoom}
        />

      </Canvas>
    </section>
  )
}

export default Scene
