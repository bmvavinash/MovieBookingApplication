import React, { useState } from 'react';
import Login from './components/Login';
import MovieSelection from './components/MovieSelection';
import SeatSelection from './components/SeatSelection';

const App = () => {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState('');

    const handleLogin = (username) => {
        setUsername(username);
        setLoggedIn(true);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBookingComplete = (movie) => {
        setSelectedMovie(movie);
    };

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div>
            <MovieSelection onMovieSelect={handleMovieSelect} />
            <SeatSelection 
                username={username} 
                selectedMovie={selectedMovie} 
                onBookingComplete={handleBookingComplete} 
            />
        </div>
    );
};

export default App;
