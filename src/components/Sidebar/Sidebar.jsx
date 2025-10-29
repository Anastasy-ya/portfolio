import { useEffect, useState } from 'react'
import './Sidebar.css'
import { useStore } from '../store/store'

//TODO вернуть плавное появление и исчезновение и убрать задержку при перерисовке при изменении положения
function Sidebar() {
  const setMatrix = useStore(s => s.setMatrix) //вытащить сразу все переменные TODO
  const setMatrixName = useStore(s => s.setMatrixName)
  const matrixName = useStore(s => s.matrixName)
  const matrices = useStore(s => s.matrices)
  const locale = useStore(s => s.locale)
  const sidebarDataset = useStore(s => s.sidebarDataset)
  const activePopup = useStore(s => s.activePopup)
  const gameSpeed = useStore(s => s.gameSpeed)
  const toggleLiving = useStore(s => s.toggleLiving)
  const isLiving = useStore(s => s.isLiving)
  const windowWidth = useStore(s => s.windowWidth)

  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState('vertical')

  useEffect(() => {
    windowWidth > 1000 ? setPosition('vertical') : setPosition('horizontal')
  }, [windowWidth])

  const handleButtonClick = index => {
    if (index === activeIndex) return
    setMatrix(matrices[index])
    setMatrixName(`matrix_${index}`)
    setActiveIndex(index)
  }

  return (
    <section
      className={`sidebar sidebar--${position}`}
      style={{
        right: position === 'vertical' ? (activePopup ? '-40px' : '0') : 'auto',
        bottom:
          position === 'horizontal' ? (activePopup ? '-40px' : '0') : 'auto'
      }}
    >
      {/* Play */}
      <button
        className='sidebar__addition-button'
        style={{
          backgroundImage: `url('${!isLiving ? sidebarDataset.play.icon1 : sidebarDataset.play.icon2
            }')`
        }}
        onClick={toggleLiving}
        aria-label={sidebarDataset.play.label[locale]}
        title={sidebarDataset.play.label[locale]}
        disabled={matrixName === 'matrix_2'}

      />

      {/* Slider */}
      <div className='sidebar__slider' aria-label='Slider' title='Slider'>
        <div
          className={`sidebar__slider-container sidebar__slider-container--${position}`}
        >
          {sidebarDataset.slider.buttons.map((_, index) => (
            <button
              key={index}
              className={`sidebar__slider-button ${index === activeIndex ? 'active' : ''
                }`}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Speed */}
      <button
        className='sidebar__addition-button'
        style={{
          backgroundImage: `url('${gameSpeed === 500
              ? sidebarDataset.speed.icon1
              : sidebarDataset.speed.icon2
            }')`
        }}
        onClick={sidebarDataset.speed.action}
        aria-label={sidebarDataset.speed.label[locale]}
        title={sidebarDataset.speed.label[locale]}
        disabled={matrixName === 'matrix_2'}
      />
    </section>
  )
}

export default Sidebar
