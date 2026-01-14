import './App.css'
import { useEffect } from 'react'
import Scene from '../Scene/Scene'
import Bio from '../Bio/Bio'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import Menu from '../Menu/Menu'
//TODO вытащить вложенные компоненты
import ModalManager from '../ModalManager/ModalManager'
import Preloader from '../Preloader/Preloader'
// import { Stats } from '@react-three/drei'
import { useStore } from '../store/store'
import { useResize } from '../Actions/hooks/useResize'

function App() {
  const initLocale = useStore(s => s.initLocale)
  const setWindowWidth = useStore(s => s.setWindowWidth)
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
