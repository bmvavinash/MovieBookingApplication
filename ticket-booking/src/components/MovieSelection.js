import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const MovieSelection = ({ onMovieSelect }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/movies`).then(res => {
            setMovies(res.data.movies);
        });
    }, []);

    return (
        <div>
            <h2>Select Movie</h2>
            {movies.map(movie => (
                <button key={movie} onClick={() => onMovieSelect(movie)}>{movie}</button>
            ))}
        </div>
    );
};

export default MovieSelection;
