// import { useState } from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import Scene from '../Scene/Scene'
import Overlay from '../Overlay/Overlay'
import matrix_1 from '../Matrices/1'
import matrix_2 from '../Matrices/2'
import matrix_0 from '../Matrices/0'
import Footer from '../Footer/Footer'

function App() {
  const [matrix, setMatrix] = useState(matrix_1)

  return (
    <>
      <Overlay setMatrix={setMatrix} />
      <Scene matrix={matrix} />
      {/* <Footer/> */}
    </>
  )
}

export default App
