import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const SeatSelection = ({ username, selectedMovie, onBookingComplete }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        if (selectedMovie) {
            axios.get(`${API_URL}/movies/seats/${selectedMovie}`, { params: { username } }).then(res => {
                setSeats(res.data.availableSeats);
                setSelectedSeats(res.data.userBookings);
            });
        }
    }, [selectedMovie]);

    const handleSeatSelect = (seat) => {
        setSelectedSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]);
    };

    const handleBooking = () => {
        axios.post(`${API_URL}/book`, { username, movie: selectedMovie, seats: selectedSeats }).then(res => {
            if (res.data.success) {
                alert('Booking successful!');
                onBookingComplete(selectedMovie);
            }
        });
    };

    return (
        <div>
            {selectedMovie && (
                <div>
                    <h3>Select Seats for {selectedMovie}</h3>
                    {seats.map((seat, index) => seat !== null && (
                        <div key={index}>
                            <input type="checkbox" checked={selectedSeats.includes(seat)} onChange={() => handleSeatSelect(seat)} />
                            Seat {seat + 1}
                        </div>
                    ))}
                    <button onClick={handleBooking}>Confirm Booking</button>
                </div>
            )}
        </div>
    );
};

export default SeatSelection;
