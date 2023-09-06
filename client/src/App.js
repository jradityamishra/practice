import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomePage from './page/HomePage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
  )
}

export default App