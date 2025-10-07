import { useEffect } from 'react'
import '../Menu/Menu.css'
import { useStore } from '../store/store'

function Volume() {
  const soundDataset = useStore(s => s.soundDataset)
  const sound = useStore(s => s.sound)
  const toggleSound = useStore(s => s.toggleSound)
  const locale = useStore(s => s.locale)

  return (
    <nav className='menu menu__item menu__item_type_volume'>
      <button
        // onClick={toggleSound()}
        className='menu__icon-button menu__icon-button_type_sound'
        // aria-label={soundDataset[String(sound)][locale]}
        // title={soundDataset[String(sound)][locale]}
      ></button>
    </nav>

    /*TODO засунуть в общий для всего меню контейнер */
  )
}

export default Volume
