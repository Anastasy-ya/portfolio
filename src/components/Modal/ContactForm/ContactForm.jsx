import './ContactForm.css'
import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../../store/store' // TODO привести в порядок импорты

const ContactForm = () => {
  const { formDataset, locale } = useStore()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '' })
  const textareaRef = useRef(null)

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
      // Здесь можно добавить обработку отправки
    }
  }

  return (
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
}

export default ContactForm
