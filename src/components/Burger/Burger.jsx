import './Burger.css'
import { useStore } from '../store/store'
import { useShallow } from 'zustand/react/shallow'

function Burger() {
  const {
    isOpenMobileMenuModal,
    setIsOpenMobileMenuModal,
    modalType,
    setModalType
  } = useStore(
    useShallow(s => ({
      isOpenMobileMenuModal: s.isOpenMobileMenuModal,
      setIsOpenMobileMenuModal: s.setIsOpenMobileMenuModal,
      modalType: s.modalType,
      setModalType: s.setModalType
    }))
  )

  function toggleMenu() {
    setIsOpenMobileMenuModal(isOpenMobileMenuModal ? false : true)
    modalType === 'mobile-menu'
      ? setTimeout(() => {
          setModalType(null)
        }, 500)
      : setModalType('mobile-menu')
  }

  console.count('render Burger')

  return (
    <nav className='mobile-menu__navigation'>
      <button
        onClick={toggleMenu}
        className={`mobile-menu__burger ${
          isOpenMobileMenuModal
            ? 'mobile-menu__burger_type_open'
            : 'mobile-menu__burger_type_closed'
        }`}
        // aria-label=''
        // title=''
      ></button>
    </nav>
  )
}

export default Burger
