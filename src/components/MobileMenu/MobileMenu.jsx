import { useEffect, useState } from 'react'
import './MobileMenu.css'
import { useStore } from '../store/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

function MobileMenu() {
  const windowWidth = useStore(s => s.windowWidth)
  const isWide = windowWidth > 1000
  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })
  const menuDataset = useStore(s => s.menuDataset)
  const locale = useStore(s => s.locale)
  const isOpenModal = useStore(s => s.isOpenModal)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const modalType = useStore(s => s.modalType)
  const setModalType = useStore(s => s.setModalType)

  useEffect(() => {
    windowWidth <= 600 &&
      setModalPositions({ open: 230, closed: window.innerHeight })
  }, [windowWidth, modalType])

  function toggleMenu() {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true)
    modalType === 'mobile-menu'
      ? setTimeout(() => {
        setModalType(null)
      }, 500)
      : setModalType('mobile-menu')
  }

  function handleClick(name) {
    if (name === 'about-me') {
      setModalType('about-me')
    } else if (name === 'mail') {
      setModalType('mail')
    } else console.error('error')
  }

  const content = (
    <div className='mobile-menu'>
      <ul className='mobile-menu__list'>
        {menuDataset.map((item, index) =>
          item.label ? (
            <li key={index}>
              <button
                className='menu__button menu__button_type_light'
                onClick={() => handleClick(item.name)}
              >
                {item.label[locale]}
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )

  return (
    <>
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
