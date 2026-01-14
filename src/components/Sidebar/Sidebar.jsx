import { useState, useLayoutEffect } from 'react'
import './Sidebar.css'
import { useStore } from '../store/store'

function Sidebar() {
  const setMatrix = useStore(s => s.setMatrix) //вытащить сразу все переменные TODO
  const setMatrixName = useStore(s => s.setMatrixName)
  const matrices = useStore(s => s.matrices)
  const locale = useStore(s => s.locale)
  const sidebarDataset = useStore(s => s.sidebarDataset)
  const windowWidth = useStore(s => s.windowWidth)
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState(windowWidth > 1000 ? 'vertical' : 'horizontal')

  useLayoutEffect(() => {
    setPosition(windowWidth > 1000 ? 'vertical' : 'horizontal')
  }, [windowWidth])

  const handleButtonClick = index => {
    if (index === activeIndex) return
    setMatrix(matrices[index])
    setMatrixName(`matrix_${index}`)
    setActiveIndex(index)
  }

  console.count('render Sidebar')

  return (
    <div
      className={`sidebar sidebar--${position}`}
      style={{
        right: position === 'vertical' ? 0 : 'auto',
        bottom: position === 'horizontal' ? 0 : 'auto'
      }}
    >
      {/* Play */}
      {/* <button
        className='sidebar__addition-button'
        style={{
          backgroundImage: `url('${!isLiving ? sidebarDataset.play.icon1 : sidebarDataset.play.icon2
            }')`
        }}
        onClick={toggleLiving}
        aria-label={sidebarDataset.play.label[locale]}
        title={sidebarDataset.play.label[locale]}
        disabled={matrixName === 'matrix_2'}

      /> */}

      {/* Slider */}
      <div className='sidebar__slider'>
        <div
          role='tablist'
          className={`sidebar__slider-container sidebar__slider-container--${position}`}
        >
          {sidebarDataset.slider.buttons.map((_, index) => (
            <button
              key={index}
              id={index}
              className={`sidebar__slider-button ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(index)}
              role='tab'
              aria-label={sidebarDataset.slider.label[locale]}
              title={sidebarDataset.slider.label[locale]}
              aria-selected={index === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Speed */}
      {/* <button
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
      /> */}
    </div>
  )
}

export default Sidebar
