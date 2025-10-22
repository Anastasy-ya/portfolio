// import { useEffect } from 'react'
import '../Menu/Menu.css'
import { useStore } from '../store/store'

function Sound() {
  // const soundDataset = useStore(s => s.soundDataset)
  // const sound = useStore(s => s.sound)
  // const toggleSound = useStore(s => s.toggleSound)
  // const locale = useStore(s => s.locale)

  return (
    // <nav className='menu menu__item '>
      <button
        // onClick={toggleSound()}
        className='menu__icon-button menu__icon-button_type_sound'
        // aria-label={soundDataset[String(sound)][locale]}
        // title={soundDataset[String(sound)][locale]}
      ></button>
    // </nav>


  )
}

export default Sound
