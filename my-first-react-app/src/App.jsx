import React, { useEffect, useState } from 'react'
import Search from './components/search'
import Spinner from './components/Spinner';
import Moviecard from './components/Moviecard';



const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTION = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` // Remove extra space after Bearer
  }
}



const App = () => {

  const [searchTerm, setsearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setmovieList] = useState([])
  const [isLoading, setisLoading] = useState(false);


  const fetchMovies = async (query = '') => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
       
      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.response === 'false') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setisLoading(false)
        ;
    }
  }



  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>

          <img src="./hero.png.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hussle</h1>

          <Search setsearchTerm={setsearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
          }

        </section>
      </div>
    </main>

  )
}

export default App