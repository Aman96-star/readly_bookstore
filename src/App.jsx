import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar'
import Headpage from './components/headpage'
import Fiction from './components/fiction'
import NonFiction from './components/nonfiction'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='h-fit w-full overflow-x-hidden'>
      <Navbar/>
      <Headpage/>
      {/* category list books type  */}
    <Fiction/>
{/* Adventure stories
Classics
Crime
Fairy tales, fables, and folk tales
Fantasy
Historical fiction
Horror
Humour and satire
Literary fiction
Mystery
Poetry
Plays
Romance
Science fiction
Short stories
Thrillers
War
Women’s fiction
Young adult      */}
      <NonFiction/>
{/* Autobiography and memoir
Biography
Essays
Non-fiction novel
Self-help */}



      {/* main ecommerce items items gird map is used */}
      {/*1st is top sellers 2nd is recommended for you  */}

      {/* top authers */}
      {/*feedback or rating*/}
      {/* Footer */}
      {/* new  */}
      {/* sdjosudiou */}
     {/* Strak */}
     {/* streak 2  */}
     {/* aadmakmd */}
     </div>
    </>
  )
}

export default App
