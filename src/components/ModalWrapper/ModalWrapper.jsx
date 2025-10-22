import './ModalWrapper.css'
// import { useStore } from '../store/store'
import { useState, useEffect, useRef } from 'react'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import gsap from 'gsap'

gsap.registerPlugin(Draggable, InertiaPlugin)

function ModalWrapper({ children, type, modalPositions, isOpen, handleClose }) {
  // const [closing, setClosing] = useState(false)
  const wrapperRef = useRef(null)
  const draggableRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (modalPositions && wrapper) {
      const draggableEl = wrapper.closest('.modal-wrapper-root') || wrapper

      draggableRef.current = Draggable.create(draggableEl, {
        type: 'y',
        inertia: true,
        edgeResistance: 0.5,
        maxDuration: 0.3,
        bounds: { minY: modalPositions.open, maxY: modalPositions.closed },
        snap: { y: [modalPositions.open, modalPositions.closed] },
        onRelease() {
          if (
            this.endY - modalPositions.closed <= 5 &&
            this.endY - modalPositions.closed > -5
          ) {
            handleClick()
          } else {
            // setIsOpen(true)
          }
        }
      })[0]

      gsap.to(draggableEl, {
        y: isOpen ? modalPositions.open : modalPositions.closed,
        duration: 0.8,
        ease: 'back.out(1.4)'
      })
    }

    return () => draggableRef.current?.kill()
  }, [modalPositions, isOpen])

  const handleClick = () => {
    // setClosing(true)
    setTimeout(() => {
      handleClose?.()
      // setClosing(false)
    }, 300)
  }

  if (!type) return null

  return (
    <section
      className={`modal-wrapper-root ${
        isOpen && 'modal-wrapper-root_type_active'
      }`}
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
        className={`modal-wrapper ${isOpen ? 'modal-wrapper_active' : ''}`}
      />

      {/* <div
      className={'modal-wrapper'}
    /> */}

      <div
        ref={wrapperRef}
        className={`modal-wrapper__animated-wrapper modal-wrapper_active modal-wrapper_type_${type}`}
      >
        <button
          className='modal-wrapper__close-button'
          onClick={handleClick}
          aria-label='Закрыть модальное окно'
        />
        {/* <div className='modal-wrapper__container modal-wrapper__container_clickable'> */}
        {children}
        {/* </div> */}
      </div>
    </section>
  )
}

export default ModalWrapper
