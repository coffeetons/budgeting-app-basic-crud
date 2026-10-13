import { useState } from 'react'
import { Homepage, Auth, Finance  } from './pages'
import { } from './assets'

import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  return(
  <>
  <HashRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path ='/finance' element={<Finance/>}/>
    </Routes>
  </HashRouter>
  </>
  )

}

export default App
