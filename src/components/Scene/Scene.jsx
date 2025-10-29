import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Cubes from './Cubes/Cubes'
import { useState, useEffect, useMemo } from 'react'
import { Environment } from '@react-three/drei'
import { useStore } from '../store/store'

function Scene() {
  const matrix = useStore(s => s.matrix)
  const isOpenModal = useStore(s => s.isOpenModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const setIsOpenFooterModal = useStore(s => s.setIsOpenFooterModal)
  const setModalType = useStore(s => s.setModalType)
  const isOpenFooterModal = useStore(s => s.isOpenFooterModal)

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

  const [windowSize, setWindowSize] = useState(350) //проверить на утечки памяти

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
    const width = window.innerWidth
    if (width < 500) return 200
    if (width < 800 && width >= 501) return 200
    if (width < 1200 && width >= 801) return 300
    if (width < 1500 && width >= 1201) return 350
    if (width < 2100 && width >= 1501) return 550
    if (width < 3000 && width >= 2101) return 770
    return 770
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const baseZoom = useMemo(() => getWindowSize(), [])
  //TODO
  const minZoom = windowSize - 30
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
          enableRotate={false}
          target={[0, 0, 0]}
          minZoom={minZoom}
          maxZoom={maxZoom}
        />
        <Environment preset='dawn' background={false} intensity={0.6} />
      </Canvas>
    </section>
  )
}

export default Scene
