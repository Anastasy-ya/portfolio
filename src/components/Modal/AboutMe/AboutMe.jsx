import './AboutMe.css'
import { useStore } from '../../store/store'
import { useState, useEffect, useRef } from 'react'
import ModalWrapper from '../../ModalWrapper/ModalWrapper'

function AboutMe() {
  const modalAboutMeDataset = useStore(s => s.modalAboutMeDataset)
  const locale = useStore(s => s.locale)
  const windowWidth = useStore(s => s.windowWidth)
  const isOpenModal = useStore(s => s.isOpenModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const setModalType = useStore(s => s.setModalType)

  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })

  useEffect(() => {
    windowWidth > 1001
      ? setModalPositions({ open: 240, closed: window.innerHeight })
      : windowWidth <= 1000 && windowWidth > 500
        ? setModalPositions({ open: 230, closed: window.innerHeight })
        : setModalPositions({ open: 100, closed: window.innerHeight })
  }, [windowWidth])

  function toggleAboutMeModal() {
    setIsOpenModal()
    modalType === 'about-me' ? setTimeout(() => { setModalType(null) }, 500) : setModalType('about-me')
  }


  const content = (
    <div className='about-me'>
      <h1 className='about-me__title'>
        {modalAboutMeDataset.mainTitle[locale]}
      </h1>
      <article className='about-me__text-content'>
        {modalAboutMeDataset.mainArticle[locale]}
      </article>
      <h1 className='about-me__title'>
        {modalAboutMeDataset.aboutProjectTitle[locale]}
      </h1>
      <article className='about-me__text-content'>
        {modalAboutMeDataset.aboutProjectArticle[locale]}
      </article>
    </div>
  )

  return (
    <>
      <ModalWrapper
        type={modalType}
        modalPositions={modalPositions}
        isOpen={isOpenModal}
        handleClose={toggleAboutMeModal}
      >
        {content}
      </ModalWrapper>
    </>
  )
}

export default AboutMe
