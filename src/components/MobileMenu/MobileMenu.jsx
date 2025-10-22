import { useEffect, useState } from 'react'
import './MobileMenu.css'
import { useStore } from '../store/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

function MobileMenu() {
  const windowWidth = useStore(s => s.windowWidth)
  const isWide = windowWidth > 1000
  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })
  const mobileMenuDataset = useStore(s => s.mobileMenuDataset)
  const locale = useStore(s => s.locale)
  const isOpenModal = useStore(s => s.isOpenModal)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const modalType = useStore(s => s.modalType)
  const setModalType = useStore(s => s.setModalType)

  useEffect(() => {
    windowWidth <= 600 &&
      setModalPositions({ open: 245, closed: window.innerHeight })
  }, [windowWidth])

  function toggleMenu() {
    setIsOpenModal(!isOpenModal)
    setTimeout(() => {
      modalType === 'mobile-menu'
        ? setModalType('null')
        : setModalType('mobile-menu')
    }, 500)
  }

  function handleClick(name) {
    if (name === 'about-me') {
      // setIsOpenModal()
      setModalType('about-me')
    } else if (name === 'mail') {
      // setIsOpenModal()
      setModalType('mail')
    } else console.error('error')
  }

  const content = (
    <div className='mobile-menu'>
      <ul className='mobile-menu__list'>
        {mobileMenuDataset.map((item, index) => (
          <li key={index}>
            <button
              className='menu__button menu__button_type_light'
              onClick={() => handleClick(item.name)}
            >
              {item[locale]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <nav>
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

      {!isWide && (
        <ModalWrapper
          type={modalType}
          modalPositions={modalPositions}
          isOpen={isOpenModal}
          handleClose={toggleMenu}
        >
          {content}
        </ModalWrapper>
      )}
    </>
  )
}

export default MobileMenu
