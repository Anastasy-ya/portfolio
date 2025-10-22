import './Modal.css'
import { useStore } from '../store/store'
import { useState, useEffect, useRef } from 'react'
import ContactForm from './ContactForm/ContactForm'
import AboutMe from './AboutMe/AboutMe'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import gsap from 'gsap'

gsap.registerPlugin(Draggable, InertiaPlugin)

function Modal() {


  // const modalAboutMeDataset = useStore(s => s.modalAboutMeDataset)
  // const locale = useStore(s => s.locale)
  const windowWidth = useStore(s => s.windowWidth)
  const activePopup = useStore(s => s.activePopup)
  const setActivePopup = useStore(s => s.setActivePopup)

  const [closing, setClosing] = useState(false)
  const [modalPositions, setModalPositions] = useState({ open: 0, closed: 0 })

  const wrapperRef = useRef(null)
  const draggableRef = useRef(null)


  useEffect(() => {
    if (activePopup) {
      windowWidth > 1001
        ? setModalPositions({ open: 254, closed: window.innerHeight })
        : windowWidth <= 1000 && windowWidth > 500
        ? setModalPositions({ open: 197, closed: window.innerHeight })
        : setModalPositions({ open: 104, closed: window.innerHeight })
    }
  }, [windowWidth, activePopup])

  //   useEffect(() => {
  //   const handleClick = (e) => {
  //     console.log('Клик по элементу:', e.target);
  //     console.log('Полный путь (parents):', e.composedPath());
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const draggableEl = wrapper.closest('.modal-root') || wrapper

    draggableRef.current = Draggable.create(draggableEl, {
      type: 'y',
      inertia: true,
      edgeResistance: 0.5,
      maxDuration: 0.3,
      bounds: { minY: modalPositions.open, maxY: modalPositions.closed },
      snap: { y: [modalPositions.open, modalPositions.closed] },
      onRelease() {
        // 5 - допустимая разница на случай если библиотека позволяет неточное положение
        if (
          this.endY - modalPositions.closed <= 5 &&
          this.endY - modalPositions.closed > -5
        ) {
          handleClose()
        }
      }
    })[0]

    return () => draggableRef.current?.kill()
  }, [activePopup, modalPositions.open, modalPositions.closed])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setActivePopup(null)
      setClosing(false)
    }, 300)
  }

  if (!activePopup && !closing) return null

  return (
    <section
      className='modal-root'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <div
        className={`modal ${activePopup && !closing ? 'modal_active' : ''}`}
      />

      <div
        ref={wrapperRef}
        className={`modal__animated-wrapper ${
          activePopup && !closing ? 'modal_active' : ''
        }`}
      >
        <button
          className='modal__close-button'
          onClick={handleClose}
          aria-label='Закрыть модальное окно'
        />
        <div className='modal__container modal__container_clickable'>
          {activePopup === 'about' && <AboutMe />}
          {activePopup === 'mail' && <ContactForm />}
        </div>
      </div>
    </section>
  )
}

export default Modal
