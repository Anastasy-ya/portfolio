import { useEffect, useState } from 'react'
import './MobileMenu.css'
import { useStore } from '../store/store'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

function MobileMenu() {
  const windowWidth = useStore(s => s.windowWidth)
  const isWide = windowWidth > 1000
  const [modalPositions, setModalPositions] = useState({
    open: 0,
    closed: window.innerHeight
  })
  const menuDataset = useStore(s => s.menuDataset)
  const locale = useStore(s => s.locale)
  const isOpenMobileMenuModal = useStore(s => s.isOpenMobileMenuModal)
  const setIsOpenMobileMenuModal = useStore(s => s.setIsOpenMobileMenuModal)
  const setIsOpenAboutMeModal = useStore(s => s.setIsOpenAboutMeModal)
  const modalType = useStore(s => s.modalType)
  const setModalType = useStore(s => s.setModalType)

  useEffect(() => {
    windowWidth <= 600 &&
      setModalPositions({ open: 230, closed: window.innerHeight })
  }, [windowWidth, modalType])

  function closeMenu() {
    // setIsOpenMobileMenuModal(isOpenMobileMenuModal ? false : true)
    setIsOpenMobileMenuModal(false)
    modalType === 'mobile-menu'
      ? setTimeout(() => {
          setModalType(null)
        }, 500)
      : ''
    // setModalType('mobile-menu')
  }

  function handleClick(name) {
    if (name === 'about-me') {
      setModalType('about-me')
      setIsOpenMobileMenuModal(false)
      setIsOpenAboutMeModal(true)
      // } else if (name === 'mail') {
      //   //заготовка для формы обратной связи
      //   setModalType('mail')
      // setIsOpenAboutMeModal(true)
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

  // console.count('render mobileMenu')

  return (
    <>
      {!isWide && (
        <ModalWrapper
          type={modalType}
          modalPositions={modalPositions}
          isOpen={isOpenMobileMenuModal}
          handleClose={closeMenu}
        >
          {content}
        </ModalWrapper>
      )}
    </>
  )
}

export default MobileMenu
