import './AboutMe.css'
import { useStore } from '../store/store'
import { useState, useEffect } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useShallow } from 'zustand/react/shallow'

function AboutMe() {
  const {
    modalAboutMeDataset,
    locale,
    windowWidth,
    isOpenAboutMeModal,
    modalType,
    setIsOpenAboutMeModal,
    setModalType
  } = useStore(
    useShallow(s => ({
      modalAboutMeDataset: s.modalAboutMeDataset,
      locale: s.locale,
      windowWidth: s.windowWidth,
      isOpenAboutMeModal: s.isOpenAboutMeModal,
      modalType: s.modalType,
      setIsOpenAboutMeModal: s.setIsOpenAboutMeModal,
      setModalType: s.setModalType
    }))
  )
  const [height] = useState(window.innerHeight)
  const [modalPositions, setModalPositions] = useState({
    open: 0,
    closed: height
  })

  useEffect(() => {
    windowWidth > 1001
      ? setModalPositions({ open: 240, closed: height })
      : windowWidth <= 1000 && windowWidth > 500
        ? setModalPositions({ open: 165, closed: height })
        : setModalPositions({ open: 100, closed: height })
  }, [windowWidth, height])

  function closeAboutMeModal() {
    setIsOpenAboutMeModal(false)
    modalType === 'about-me'
      ? setTimeout(() => {
          setModalType(null)
        }, 500)
      : ''
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
        isOpen={isOpenAboutMeModal}
        handleClose={closeAboutMeModal}
      >
        {content}
      </ModalWrapper>
    </>
  )
}

export default AboutMe
