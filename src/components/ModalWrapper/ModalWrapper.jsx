import './ModalWrapper.css'
import { useState, useEffect, useRef } from 'react'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

import gsap from 'gsap'

gsap.registerPlugin(Draggable, InertiaPlugin)

function ModalWrapper({ children, type, modalPositions, isOpen, handleClose }) {
  const wrapperRef = useRef(null)
  const draggableRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!modalPositions || !wrapper) return

    const draggableRoot = wrapper.closest('.modal-wrapper-root') || wrapper
    const closeBtn = wrapper.querySelector('.modal-wrapper__close-button')
    const scrollable = wrapper.querySelector('.modal-wrapper__container')

    // if (!closeBtn) {
    //   console.warn('ModalWrapper: close button not found for draggable handle.')
    //   return
    // }

    draggableRef.current = Draggable.create(draggableRoot, {
      trigger: closeBtn,
      type: 'y',
      inertia: true,
      edgeResistance: 0.1,
      maxDuration: 0.5,
      bounds: { minY: modalPositions.open, maxY: modalPositions.closed },
      snap: { y: [modalPositions.open, modalPositions.closed, 0] },
      zIndexBoost: false,
      allowNativeTouchScrolling: true,
      onRelease() {
        if (this.endY === modalPositions.closed) {
          this.wasReleasedAtBottom = true
        } else {
          this.wasReleasedAtBottom = false
        }
      },
      onThrowComplete() {
        if (this.wasReleasedAtBottom) {
          handleClick()
        }
      }
    })[0]

    gsap.to(draggableRoot, {
      y: isOpen ? modalPositions.open : modalPositions.closed,
      duration: 0.8,
      ease: 'back.out(1.4)'
    })

    return () => {
      draggableRef.current?.kill()
    }
  }, [modalPositions, isOpen])

  const handleClick = () => {
    handleClose?.()
  }

  if (!type) return null

  return (
    <section
      className={`modal-wrapper-root ${isOpen && 'modal-wrapper-root_type_active'
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
        className={`modal-wrapper  ${isOpen ? 'modal-wrapper_active' : ''}`}
      />

      <div
        ref={wrapperRef}
        className={`modal-wrapper__animated-wrapper modal-wrapper_active modal-wrapper_type_${type}`}
      >
        <button
          className='modal-wrapper__close-button'
          onClick={handleClick}
          aria-label='Закрыть модальное окно'
          tabIndex='0'
        />
        <div className='modal-wrapper__container modal-wrapper__container_clickable'>
          {children}
        </div>
      </div>
    </section>
  )
}

export default ModalWrapper
