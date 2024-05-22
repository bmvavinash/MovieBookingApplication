import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Typography } from '@mui/material';

const API_URL = 'http://localhost:5000';

const MovieSelection = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state;

    useEffect(() => {
        axios.get(`${API_URL}/movies`).then(res => {
            setMovies(res.data.movies);
        });
    }, []);

    const handleMovieSelect = (movie) => {
        navigate(`/seats/${movie}`, { state: { username } });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Select Movie</Typography>
            {movies.map(movie => (
                <Button
                    key={movie}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    onClick={() => handleMovieSelect(movie)}
                >
                    {movie}
                </Button>
            ))}
        </Container>
    );
};

export default MovieSelection;
