// Стили хранятся в Modal.jsx
import { useStore } from '../../store/store'
// import { useState, useEffect, useRef } from 'react'

function AboutMe() {
  const modalAboutMeDataset = useStore(s => s.modalAboutMeDataset)
  const locale = useStore(s => s.locale)

  return (
    <div className='modal__text-container'>
      <h1 className='modal__title'>{modalAboutMeDataset.mainTitle[locale]}</h1>
      <article className='modal__text-content'>
        {modalAboutMeDataset.mainArticle[locale]}
      </article>
      <h1 className='modal__title'>
        {modalAboutMeDataset.aboutProjectTitle[locale]}
      </h1>
      <article className='modal__text-content'>
        {modalAboutMeDataset.aboutProjectArticle[locale]}
      </article>
    </div>
  )
}

export default AboutMe
