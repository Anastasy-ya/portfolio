import { Canvas } from '@react-three/fiber'
// import { Loader } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import Cubes from './Cubes/Cubes'
import { useState, useEffect, useMemo, Suspense } from 'react'
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

  const [windowParameters, setWindowParameters] = useState({
    windowSize: 350,
    shift: 0
  }) //TODO проверить на утечки памяти это не дублирование windowWidth из стора!

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
  }, [modalType, isOpenModal, isOpenFooterModal, ])

  useEffect(() => {
    setGameState(matrix)
  }, [matrix])

  const handleResize = () => {
    setWindowParameters(getWindowParameters())
  }
  //масштаб сцены и сдвиг по y
  const getWindowParameters = () => {
    if (windowWidth < 500) return { windowSize: 150, shift: -0.2 }
    if (windowWidth < 800 && windowWidth >= 500)
      return { windowSize: 200, shift: -0.1 }
    if (windowWidth < 1200 && windowWidth >= 800)
      return { windowSize: 250, shift: 0.15 }
    if (windowWidth < 1500 && windowWidth >= 1200)
      return { windowSize: 280, shift: 0.2 }
    if (windowWidth < 2100 && windowWidth >= 1500)
      return { windowSize: 380, shift: 0.3 }
    if (windowWidth < 3000 && windowWidth >= 2100)
      return { windowSize: 480, shift: 0.2 }
    return { windowSize: 700, shift: 0.2 }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const baseZoom = useMemo(() => getWindowSize(), [])
  //TODO
  const minZoom = windowParameters.windowSize - 100
  const maxZoom = windowParameters.windowSize + 450

  return (
    <div className='canvas-wrapper'>
      <Canvas
        onClick={handleOpenCloseModals}
        id='canvas'
        style={{ width: '100vw', height: '100vh' }}
        orthographic
        camera={{
          position: [0, 0, 5],
          zoom: windowParameters.windowSize,
          near: -2,
          far: 15
        }}
      >
        {/* <Perf position='bottom-left' /> */}
        <fog attach='fog' args={['rgba(184, 192, 217, 1)', 5, 6.5]} />

        <color attach='background' args={['rgb(220, 220, 220)']} />
        {/* <Suspense fallback={null}> */}
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
            shift={windowParameters.shift}
          />
        {/* </Suspense> */}
        <OrbitControls
          enableRotate={false}
          target={[0, 0, 0]}
          minZoom={minZoom}
          maxZoom={maxZoom}
        />
      </Canvas>
    </div>
  )
}

export default Scene
