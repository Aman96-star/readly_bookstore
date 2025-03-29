import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar'
import Headpage from './components/headpage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='h-fit w-screen'>
      <Navbar/>
      <Headpage/>
     </div>
    </>
  )
}

export default App
