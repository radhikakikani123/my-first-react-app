import React from 'react'
import { useNavigate } from 'react-router-dom'

const Moviecard = ({ movie: { 
    id, 
    movie_id, // for Appwrite stored movies
    title, 
    vote_average, 
    vote_Average, // your current typo
    poster_path, 
    poster_url, // for Appwrite stored movies
    release_date, 
    original_language 
}}) => {
    const navigate = useNavigate();
    
    // Handle different data sources (TMDB API vs Appwrite database)
    const movieId = id || movie_id;
    const rating = vote_average || vote_Average;
    const posterImage = poster_path 
        ? `https://image.tmdb.org/t/p/w500${poster_path}` 
        : poster_url || '/no-movie.png';

    const handleCardClick = () => {
        if (movieId) {
            navigate(`/movie/${movieId}`);
        }
    };

    return (
        <div className='movie-card' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img
                src={posterImage}
                alt={title} 
            />
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src="star.svg" alt="Star Icon" />
                        <p>{rating ? rating.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>●</span>
                    <p className='lang'>{original_language}</p>
                    <span>●</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default Moviecard
