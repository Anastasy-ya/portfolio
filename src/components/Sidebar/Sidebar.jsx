import { useEffect, useState } from 'react'
import './Sidebar.css'
// import AboutGame from './AboutGame/AboutGame'
import { useStore } from '../store/store'
import { useResize } from '../Actions/hooks/useResize'

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

  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState('vertical')
  // custom hooks
  const width = useResize()

  useEffect(() => {
    width > 1000 ? setPosition('vertical') : setPosition('horizontal')
  }, [width])

  const handleButtonClick = index => {
    if (index === activeIndex) return
    setMatrix(matrices[index])
    setMatrixName(`matrix_${index}`) //
    setActiveIndex(index)
  }

  function handlePlayClick() {
    toggleLiving()
  }

  // return (
  //   <section className='sidebar' style={{
  //       right: position === 'vertical' ? (activePopup ? '-40px' : '0') : 'auto',
  //       bottom: position === 'horizontal' ? (activePopup ? '-40px' : '0') : 'auto',
  //     }}>

  //     {/* Play*/}
  //     <button
  //       className='sidebar__addition-button'
  //       // style={{ backgroundImage: `url('${sidebarDataset.play.icon}')` }}
  //       style={{
  //         backgroundImage: `url('${
  //           !isLiving
  //             ? sidebarDataset.play.icon1
  //             : sidebarDataset.play.icon2
  //         }')`
  //       }}
  //       onClick={toggleLiving}//TODO убрать из стора данные
  //       // {sidebarDataset.play.action}
  //       aria-label={sidebarDataset.play.label[locale]}
  //       title={sidebarDataset.play.label[locale]}
  //     />

  //     {/* Info кнопка */}
  //     {/*
  //     <button
  //       className='sidebar__addition-button'
  //       style={{ backgroundImage: `url('${sidebarDataset.info.icon}')` }}
  //       onClick={sidebarDataset.info.action}
  //       aria-label={sidebarDataset.info.label[locale]}
  //       title={sidebarDataset.info.label[locale]}
  //     />
  //     */}

  //     {/* Slider */}
  //     <div className='sidebar__slider' aria-label='Slider' title='Slider'>
  //       <div className='sidebar__slider-container'>
  //         {sidebarDataset.slider.buttons.map((_, index) => (
  //           <button
  //             key={index}
  //             className={`sidebar__slider-button ${
  //               index === activeIndex ? 'active' : ''
  //             }`}
  //             onClick={() => handleButtonClick(index)}
  //           />
  //         ))}
  //       </div>
  //     </div>

  //     {/* Speed*/}
  //     <button
  //       className='sidebar__addition-button'
  //       style={{
  //         backgroundImage: `url('${
  //           gameSpeed === 500
  //             ? sidebarDataset.speed.icon1
  //             : sidebarDataset.speed.icon2
  //         }')`
  //       }}
  //       onClick={sidebarDataset.speed.action}//TODO перенести из стора сюда, в сторе не должно быть логики
  //       aria-label={sidebarDataset.speed.label[locale]}
  //       title={sidebarDataset.speed.label[locale]}
  //       disabled={matrixName === 'matrix_2'}
  //     />

  //     {/* VR*/}
  //     {/*
  //     <button
  //       className='sidebar__addition-button'
  //       style={{ backgroundImage: `url('${sidebarDataset.vr.icon}')` }}
  //       onClick={sidebarDataset.vr.action}
  //       aria-label={sidebarDataset.vr.label[locale]}
  //       title={sidebarDataset.vr.label[locale]}
  //     />
  //     */}
  //   </section>
  // )
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
          backgroundImage: `url('${
            !isLiving ? sidebarDataset.play.icon1 : sidebarDataset.play.icon2
          }')`
        }}
        onClick={toggleLiving}
        aria-label={sidebarDataset.play.label[locale]}
        title={sidebarDataset.play.label[locale]}
      />

      {/* Slider */}
      <div className='sidebar__slider' aria-label='Slider' title='Slider'>
        <div
          className={`sidebar__slider-container sidebar__slider-container--${position}`}
        >
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

      {/* Speed */}
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
    </section>
  )
}

export default Sidebar
