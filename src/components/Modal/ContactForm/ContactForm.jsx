import './ContactForm.css'
import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../../store/store' // TODO привести в порядок импорты
import ModalWrapper from '../../ModalWrapper/ModalWrapper'

const ContactForm = () => {
  const formDataset = useStore(s => s.formDataset)
  const locale = useStore(s => s.locale)
  const isOpenModal = useStore(s => s.isOpenModal)
  const modalType = useStore(s => s.modalType)
  const setIsOpenModal = useStore(s => s.setIsOpenModal)
  const setModalType = useStore(s => s.setModalType)
  const windowWidth = useStore(s => s.windowWidth)

  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '' })
  const textareaRef = useRef(null)

  useEffect(() => {
    windowWidth > 1001
      ? setModalPositions({ open: 254, closed: window.innerHeight })
      : windowWidth <= 1000 && windowWidth > 500
        ? setModalPositions({ open: 197, closed: window.innerHeight })
        : setModalPositions({ open: 104, closed: window.innerHeight })
  }, [windowWidth])

  // Авто-рост textarea при вводе
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto' // сброс для перерасчета
    el.style.height = el.scrollHeight + 'px'
  }, [formData.message])

  const handleChange = (e) => {
    e.stopPropagation()
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = { name: '', email: '' }
    if (!formData.name.trim()) newErrors.name = locale === 'ru' ? 'Введите имя' : 'Enter your name'
    if (!formData.email.trim()) newErrors.email = locale === 'ru' ? 'Введите e-mail' : 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = locale === 'ru' ? 'Некорректный e-mail' : 'Invalid email'
    setErrors(newErrors)
    return !newErrors.name && !newErrors.email
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log('Submit form data:', formData)
    }
  }

  function toggleFormModal() {
    setIsOpenModal()
    setTimeout(() => {
      modalType === 'form' ? setModalType(null) : setModalType('form')
    }, 500)
  }

  const content = (
    <div className="modal__form-container">
      <h2 className="modal__form-title">{formDataset.title[locale]}</h2>
      <form className="modal__form" onSubmit={handleSubmit}>
        <div className="modal__form-field">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="modal__form-input"
            placeholder={formDataset.nameLabel[locale]}
          />
          <span className="modal__form-underline"></span>
          {errors.name && <span className="modal__form-error">{errors.name}</span>}
        </div>

        <div className="modal__form-field">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="modal__form-input"
            placeholder={formDataset.mailLabel[locale]}
          />
          <span className="modal__form-underline"></span>
          {errors.email && <span className="modal__form-error">{errors.email}</span>}
        </div>

        <div className="modal__form-field">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="modal__form-input modal__form-input_textarea"
            placeholder={formDataset.messageLabel[locale]}
            ref={textareaRef}
            rows={1} // начальная высота = 1 строка
          ></textarea>
          <span className="modal__form-underline"></span>
        </div>

        <button type="submit" className="modal__form-submit">
          {formDataset.submitButton[locale]}
        </button>
      </form>
    </div>
  )

  return (
    <>
      <ModalWrapper
        type={modalType}
        modalPositions={modalPositions}
        isOpen={isOpenModal}
        handleClose={toggleFormModal}
      >
        {content}
      </ModalWrapper>
    </>
  )
}

export default ContactForm
