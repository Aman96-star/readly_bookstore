import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar'
import Headpage from './components/headpage'
import Categories from './components/categories'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='h-fit w-full overflow-x-hidden'>
      <Navbar/>
      <Headpage/>
      {/* category list books type  */}
      <Categories/>
      {/* main ecommerce items items gird map is used */}
      {/*1st is top sellers 2nd is recommended for you  */}

      {/* top authers */}
      {/*feedback or rating*/}
      {/* Footer */}
     </div>
    </>
  )
}

export default App
