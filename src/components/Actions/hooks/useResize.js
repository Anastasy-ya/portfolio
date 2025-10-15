import { useState, useEffect } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = event => {
      ;(function throttle() {
        setTimeout(() => {
          setWidth(event.target.innerWidth)
        }, 1000)
      })()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
