import React from 'react'
import Search from './components/search'
const App = () => {
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero-bg.png.png"/>
          <img src="./hero.png.png" alt="Hero banner"/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hussle</h1>

        </header>
       <Search/>
        </div>
    </main>
    
  )
}

export default App