import { useState } from 'react'
import { Homepage, Auth  } from './pages'
import { } from './assets'

import './App.css'
import { Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  return(
  <>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='/auth' element={<Auth/>}/>
  </Routes>
  </>
  )

}

export default App
