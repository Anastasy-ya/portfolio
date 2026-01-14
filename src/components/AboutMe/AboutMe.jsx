import './AboutMe.css'
import { useStore } from '../store/store'
import { useState, useEffect } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

function AboutMe() {
  const modalAboutMeDataset = useStore(s => s.modalAboutMeDataset)
  const locale = useStore(s => s.locale)
  const windowWidth = useStore(s => s.windowWidth)
  const isOpenAboutMeModal = useStore(s => s.isOpenAboutMeModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenAboutMeModal = useStore(s => s.setIsOpenAboutMeModal)
  const setModalType = useStore(s => s.setModalType)
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
