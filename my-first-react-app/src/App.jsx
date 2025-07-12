import React, { useEffect,useState } from 'react'
import Search from './components/search'
const App = () => {
  const [searchTerm, setsearchTerm] = useState("")

  const API_BASE_URL ='https://api.themoviedb.org/3';
  
  const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTION={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }

  }

  
  useEffect(()=>{

  },[])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          
          <img src="./hero.png.png" alt="Hero banner"/>
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hussle</h1>

        </header>
       <Search setsearchTerm={setsearchTerm} />
        </div>
    </main>
    
  )
}

export default App