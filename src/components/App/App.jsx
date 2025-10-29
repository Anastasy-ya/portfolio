import './App.css'
import { useEffect } from 'react'
import Scene from '../Scene/Scene'
import Bio from '../Bio/Bio'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import Menu from '../Menu/Menu'
// import { Stats } from '@react-three/drei'
import { useStore } from '../store/store'
import { useResize } from '../Actions/hooks/useResize'
import ContactForm from '../Modal/ContactForm/ContactForm' //TODO вытащить вложенные компоненты
import AboutMe from '../Modal/AboutMe/AboutMe'
import MobileMenu from '../MobileMenu/MobileMenu'
//TODO удалить about game и Modal если не понадобятся

function App() {
  const initLocale = useStore(s => s.initLocale)
  const setWindowWidth = useStore(s => s.setWindowWidth)
  const modalType = useStore(s => s.modalType)
  const width = useResize()

  useEffect(() => {
    setWindowWidth(width)
  }, [width, setWindowWidth])

  useEffect(() => {
    initLocale()
  }, [])

  return (
    <div className='app'>
      <Scene />
      {/* <Stats /> */}
      <main>
        <Bio />
        <Menu />
        <Sidebar />
        {modalType === 'mail' && <ContactForm />}
        {modalType === 'about-me' && <AboutMe />}
        {modalType === 'mobile-menu' && <MobileMenu />}
      </main>
      <Footer />
    </div>
  )
}

export default App
