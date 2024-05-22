import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MovieSelection from './components/MovieSelection';
import SeatSelection from './components/SeatSelection';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/movies" element={<MovieSelection />} />
                <Route path="/seats/:movie" element={<SeatSelection />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
