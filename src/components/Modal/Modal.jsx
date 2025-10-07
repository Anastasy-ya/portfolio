import './Modal.css'
import { useStore } from '../store/store'
import { useState, useEffect } from 'react'

function Modal() {
  const modalAboutMeDataset = useStore(s => s.modalAboutMeDataset)
  const locale = useStore(s => s.locale)
  const activePopup = useStore(s => s.activePopup)
  const setActivePopup = useStore(s => s.setActivePopup)

  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)

    setTimeout(() => {
      setActivePopup(null)
      setClosing(false)
    }, 300)
  }

  if (!activePopup && !closing) return null

  return (
    <section className='modal-root'>
      <div
        className={`modal ${activePopup && !closing ? 'modal_active' : ''}`}
      />
      <div
        className={`modal__animated-wrapper ${
          activePopup && !closing ? 'modal_active' : ''
        }`}
      >
        <button
          className='modal__close-button'
          onClick={handleClose}
          aria-label='Закрыть модальное окно'
        />
        <div className='modal__container'>
          {activePopup === 'about' && (
            <div className='modal__text-container'>
              <h1 className='modal__title'>
                {modalAboutMeDataset.mainTitle[locale]}
              </h1>
              <article className='modal__text-content'>
                {modalAboutMeDataset.mainArticle[locale]}
              </article>
              <h1 className='modal__title'>{modalAboutMeDataset.aboutProjectTitle[locale]}</h1>
              <article className='modal__text-content'>{modalAboutMeDataset.aboutProjectArticle[locale]}</article>
            </div>
          )}
          {activePopup === 'mail' && (
            <div className='modal__form-container'></div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Modal
