import { useState, useEffect, useRef, useMemo } from 'react'
import { useStore } from '../store/store'
import './Preloader.css'

function Preloader() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  const isPreloaderHides = useStore(s => s.isPreloaderHides)//TODO вернуть false
  const setIsPreloaderHides = useStore(s => s.setIsPreloaderHides)
  const preloaderDataset = useStore(s => s.preloaderDataset)
  const locale = useStore(s => s.locale)

  const timers = useRef([])

  const clearAll = () => {
    timers.current.forEach(t => clearTimeout(t))
    timers.current = []
  }

  useEffect(() => {
    if (step >= preloaderDataset.length) return

    clearAll()

    const { pauseBefore, display } = preloaderDataset[step]

    timers.current.push(
      setTimeout(() => {
        requestAnimationFrame(() => {
          setVisible(true)

          timers.current.push(
            setTimeout(() => {
              setVisible(false)

              timers.current.push(
                setTimeout(() => {
                  setStep(s => s + 1)
                }, 300)
              )
            }, display)
          )
        })
      }, pauseBefore)
    )

    return clearAll
  }, [step, preloaderDataset])

  const current = preloaderDataset[step]

  useEffect(() => {
    if (step >= preloaderDataset.length && !isPreloaderHides) {
      setIsHiding(true)

      const t = setTimeout(() => {
        setIsPreloaderHides(true)
      }, 1500)

      return () => clearTimeout(t)
    }
  }, [step, isPreloaderHides, preloaderDataset.length])

  if (isPreloaderHides) return null

  return (
    <section className={`preloader ${isHiding ? 'preloader--hide' : ''}`}>
      <p className='preloader__text' style={{ opacity: visible ? 1 : 0 }}>
        {current?.node[locale]}
      </p>
    </section>
  )
}

export default Preloader
