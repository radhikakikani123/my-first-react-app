import React, { useEffect, useState } from 'react'
import Search from './components/search'
import Spinner from './components/Spinner';
import Moviecard from './components/Moviecard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, upadateSearchCount } from './appwrite';



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
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  useDebounce(() =>
    setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

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

       if (query && data.results.length > 0) {
      
        await upadateSearchCount(query, data.results[0]

        )
      }


    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setisLoading(false)
        ;
    }
  }

   const loadtrendingMovies = async () => {
    
    try{
      const movies = await getTrendingMovies()

      setTrendingMovies(movies);
    }

    catch (erroe){
      console.error(`Error fetching trending movies: ${error}`);
      
    }


   }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadtrendingMovies();
  },[])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>

          <img src="./hero.png.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hussle</h1>

          <Search setsearchTerm={setsearchTerm} />
        </header>

       {trendingMovies.length > 0 && (
        <section className='trending'>
          <h2>Trending Movies</h2>

          <ul>
            
            {trendingMovies.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />


              </li>))}
          </ul>
        </section>

       )}

        <section className='all-movies'>
          <h2 >All Movies</h2>

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