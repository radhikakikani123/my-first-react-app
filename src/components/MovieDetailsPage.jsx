// MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from './appwrite-config'; // your appwrite file

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieData = await getMovieDetails(movieId);
                setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    if (loading) {
        return <div className="loading">Loading movie details...</div>;
    }

    if (!movie) {
        return <div className="error">Movie not found</div>;
    }

    return (
        <div className="movie-details-page">
            <div className="movie-hero" style={{
                backgroundImage: movie.backdrop_url ? `url(${movie.backdrop_url})` : 'none'
            }}>
                <div className="movie-content">
                    <div className="movie-poster">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>
                    
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <div className="movie-meta">
                            <span className="release-date">
                                Released: {new Date(movie.release_date).getFullYear()}
                            </span>
                            <span className="rating">
                                ⭐ {movie.vote_average}/10
                            </span>
                            <span className="view-count">
                                👁️ {movie.count} views
                            </span>
                        </div>
                        
                        <div className="movie-overview">
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
