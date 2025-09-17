import { useState } from 'react'
import './Overlay.css'
import matrix_1 from '../Matrices/1'
import matrix_2 from '../Matrices/2'
import matrix_0 from '../Matrices/0'


function Overlay({ setMatrix }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const buttons = [1, 2, 0]
  const matrixes = [matrix_1, matrix_2, matrix_0]

  const handleButtonClick = index => {
    if (index === activeIndex) return
    setMatrix(matrixes[index])
    setActiveIndex(index)
  }

  return (
    <>
      <div className='overlay'>
        <div className='overlay__content'></div>
      </div>

      {/* <div className='overlay__slider slider'>
        <div className='slider__container'>
          {buttons.map((_, index) => (
            <div
              key={index}
              className={`slider__button ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => handleButtonClick(index)}
            ></div>
          ))}
        </div>
      </div> */}

     
    </>
  )
}

export default Overlay
