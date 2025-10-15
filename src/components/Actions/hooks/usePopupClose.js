// custom hook for closing popup by clicking on an empty space, pressing ESC
import { useEffect } from 'react'

function usePopupClose({ isOpen, handleOpenClosePopup }) {
  useEffect(() => {
    if (!isOpen) return

    const handleOverlay = event => {
      if (event.target.classList.contains('popup_opened')) {
        handleOpenClosePopup()
      }
    }

    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleOpenClosePopup()
      }
    }
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleOverlay)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleOverlay)
    }
  }, [isOpen, handleOpenClosePopup])
}

export default usePopupClose
