import './App.css'
import { useEffect } from 'react'
import Scene from '../Scene/Scene'
import Bio from '../Bio/Bio'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import Menu from '../Menu/Menu'
//TODO довытащить вложенные компоненты
import ModalManager from '../ModalManager/ModalManager'
import Preloader from '../Preloader/Preloader'
// import { Stats } from '@react-three/drei'
import { useStore } from '../store/store'
import { useResize } from '../Actions/hooks/useResize'
import { useShallow } from 'zustand/react/shallow'

function App() {
  const { initLocale, setWindowWidth } = useStore(
    useShallow(s => ({
      initLocale: s.initLocale,
      setWindowWidth: s.setWindowWidth
    }))
  )
  // const setWindowWidth = useStore(s => s.setWindowWidth)
  const width = useResize()

  useEffect(() => {
    setWindowWidth(width)
  }, [width, setWindowWidth])

  useEffect(() => {
    initLocale()
  }, [initLocale])

  return (
    <div className='app'>
      <Preloader />
      <Scene />
      {/* <Stats /> */}
      <main>
        <Bio />
        <Menu />
        <Sidebar />
        <ModalManager />
      </main>
      <Footer />
    </div>
  )
}

export default App
