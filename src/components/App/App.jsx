import './App.css'
import { useEffect } from 'react'
import Scene from '../Scene/Scene'
import Bio from '../Bio/Bio'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import Menu from '../Menu/Menu'
import Volume from '../Volume/Volume'
import { Stats } from '@react-three/drei'
import Modal from '../Modal/Modal'
import { useStore } from '../store/store'
//TODO удалить about game

function App() {

  const initLocale = useStore(s => s.initLocale)
  

  useEffect(() => {
    initLocale()
  }, [])


  return (
    <div className='app'>
      <Scene />
      <Stats />
      <main>
        <Bio />
        <Menu />
        <Volume />
        <Sidebar 
        />
        <Modal />
      </main>
      <Footer />
    </div>
  )
}

export default App
