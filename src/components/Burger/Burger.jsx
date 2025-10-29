import './Burger.css'
import { useStore } from '../store/store'

function Burger() {
  const isOpenModal = useStore(s => s.isOpenModal)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const modalType = useStore(s => s.modalType)
  const setModalType = useStore(s => s.setModalType)

  function toggleMenu() {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true)
    modalType === 'mobile-menu'
      ? setTimeout(() => {
          setModalType(null)
        }, 500)
      : setModalType('mobile-menu')
  }

  return (
    <nav className='mobile-menu__navigation'>
      <button
        onClick={toggleMenu}
        className={`mobile-menu__burger ${
          isOpenModal
            ? 'mobile-menu__burger_type_open'
            : 'mobile-menu__burger_type_closed'
        }`}
        // aria-label={soundDataset[String(sound)][locale]}
        // title={soundDataset[String(sound)][locale]}
      ></button>
    </nav>
  )
}

export default Burger
