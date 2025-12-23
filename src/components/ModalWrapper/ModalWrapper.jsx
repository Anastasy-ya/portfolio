import './ModalWrapper.css'
import { useEffect, useState, useRef } from 'react'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import gsap from 'gsap'
// import { useLayoutEffect } from 'react'

gsap.registerPlugin(Draggable, InertiaPlugin)

function ModalWrapper({ children, type, modalPositions, isOpen, handleClose }) {
  const wrapperRef = useRef(null)
  const draggableRef = useRef(null)
  // const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !modalPositions) return
    if (draggableRef.current) return

    const draggableRoot = wrapper.closest('.modal-wrapper-root') || wrapper
    const closeBtn = wrapper.querySelector('.modal-wrapper__close-button')

    // gsap.set(draggableRoot, {
    //   y: modalPositions.closed,
    // })

    draggableRef.current = Draggable.create(draggableRoot, {
      trigger: closeBtn,
      type: 'y',
      inertia: true,
      edgeResistance: 0.1,
      maxDuration: 0.5,
      zIndexBoost: false,
      allowNativeTouchScrolling: true,
      bounds: {
        minY: modalPositions.open,
        maxY: modalPositions.closed
      },
      snap: {
        y: [modalPositions.open, modalPositions.closed, 0]
      },
      onRelease() {
        this.wasReleasedAtBottom = this.endY === modalPositions.closed
      },
      onThrowComplete() {
        if (this.wasReleasedAtBottom) {
          handleClose?.()
        }
      }
    })[0]

    // setIsInitialized(true)

    return () => {
      draggableRef.current?.kill()
      draggableRef.current = null
    }
  }, [modalPositions])

  /*обновление bounds */
  useEffect(() => {
    if (!draggableRef.current || !modalPositions) return

    draggableRef.current.applyBounds({
      minY: modalPositions.open,
      maxY: modalPositions.closed
    })

    draggableRef.current.vars.snap = {
      y: [modalPositions.open, modalPositions.closed, 0]
    }

    // 🔥 ВАЖНО: Нужно обновить snap функцию
    if (draggableRef.current.snap) {
      draggableRef.current.snap = {
        y: [modalPositions.open, modalPositions.closed, 0]
      }
    }
  }, [modalPositions])

  /*открытие и закрытие */
  useEffect(() => {
    const wrapper = wrapperRef.current // 🔥 Определяем внутри эффекта
    if (!wrapper || !modalPositions || !draggableRef.current) return

    const draggableRoot = wrapper.closest('.modal-wrapper-root') || wrapper

    gsap.to(draggableRoot, {
      y: isOpen ? modalPositions.open : modalPositions.closed,
      duration: 0.8,
      ease: 'back.out(1.4)'
    })
  }, [isOpen, modalPositions])

  // console.count('render modalWrapper')

  // if (!type) return null

  return (
    <section
      className={`modal-wrapper-root ${
        isOpen ? 'modal-wrapper-root_type_active' : ''
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
          onClick={handleClose}
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
