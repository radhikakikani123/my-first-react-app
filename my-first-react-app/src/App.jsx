import React, { useState } from 'react'
import Search from './components/search'
const App = () => {
  const [searchTerm, setsearchTerm] = useState("")
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          
          <img src="./hero.png.png" alt="Hero banner"/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hussle</h1>

        </header>
       <Search Search={searchTerm}/>
        </div>
    </main>
    
  )
}

export default App