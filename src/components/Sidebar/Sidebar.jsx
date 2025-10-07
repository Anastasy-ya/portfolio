import { useEffect, useState } from 'react'
import './Sidebar.css'
import AboutGame from './AboutGame/AboutGame'
import { useStore } from '../store/store'
 
function Sidebar() {
  const setMatrix = useStore(s => s.setMatrix) //вытащить сразу все переменные TODO
  const setMatrixName = useStore(s => s.setMatrixName)
  const matrixName = useStore(s => s.matrixName)
  const matrices = useStore(s => s.matrices)
  const locale = useStore(s => s.locale)
  const sidebarDataset = useStore(s => s.sidebarDataset)
  const activePopup = useStore(s => s.activePopup);
  const gameSpeed = useStore(s => s.gameSpeed)
  const [activeIndex, setActiveIndex] = useState(0)
  

  
  const handleButtonClick = index => {
    if (index === activeIndex) return
    setMatrix(matrices[index])
    setMatrixName(`matrix_${index}`)//
    setActiveIndex(index)
    
  }

  console.log(matrixName, 'matrixName')

  return (
    <section className='sidebar' style={{ right: activePopup ? '-40px' : '0' }}>
      
      {/* Play кнопка */}
      <button
        className='sidebar__addition-button'
        style={{ backgroundImage: `url('${sidebarDataset.play.icon}')` }}
        onClick={sidebarDataset.play.action}
        aria-label={sidebarDataset.play.label[locale]}
        title={sidebarDataset.play.label[locale]}
      />

      {/* Info кнопка (закомментирована) */}
      {/*
      <button
        className='sidebar__addition-button'
        style={{ backgroundImage: `url('${sidebarDataset.info.icon}')` }}
        onClick={sidebarDataset.info.action}
        aria-label={sidebarDataset.info.label[locale]}
        title={sidebarDataset.info.label[locale]}
      />
      */}

      {/* Slider */}
      <div className='sidebar__slider' aria-label='Slider' title='Slider'>
        <div className='sidebar__slider-container'>
          {sidebarDataset.slider.buttons.map((_, index) => (
            <button
              key={index}
              className={`sidebar__slider-button ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Speed кнопка */}
      <button
        className='sidebar__addition-button'
        style={{
          backgroundImage: `url('${
            gameSpeed === 500
              ? sidebarDataset.speed.icon1
              : sidebarDataset.speed.icon2
          }')`
        }}
        onClick={sidebarDataset.speed.action}
        aria-label={sidebarDataset.speed.label[locale]}
        title={sidebarDataset.speed.label[locale]}
        disabled={matrixName === 'matrix_2'}
      />

      

      {/* VR кнопка (закомментирована) */}
      {/*
      <button
        className='sidebar__addition-button'
        style={{ backgroundImage: `url('${sidebarDataset.vr.icon}')` }}
        onClick={sidebarDataset.vr.action}
        aria-label={sidebarDataset.vr.label[locale]}
        title={sidebarDataset.vr.label[locale]}
      />
      */}
    </section>
  )
}

export default Sidebar
