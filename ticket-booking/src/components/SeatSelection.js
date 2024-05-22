import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Checkbox, FormControlLabel, Button, Typography, Grid } from '@mui/material';

const API_URL = 'http://localhost:5000';

const SeatSelection = () => {
    const { movie } = useParams();
    const location = useLocation();
    const { username } = location.state;
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/movies/seats/${movie}`, { params: { username } })
            .then(res => {
                setSeats(res.data.availableSeats);
                setSelectedSeats(res.data.userBookings);
            })
            .catch(error => {
                console.error("There was an error fetching the seats!", error);
            });
    }, [movie, username]);

    const handleSeatSelect = (seat) => {
        setSelectedSeats(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]);
    };

    const handleBooking = () => {
        axios.post(`${API_URL}/book`, { username, movie, seats: selectedSeats })
            .then(res => {
                if (res.data.success) {
                    alert('Booking successful!');
                    navigate('/movies', { state: { username } });
                }
            })
            .catch(error => {
                console.error("There was an error making the booking!", error);
            });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>Select Seats for {movie}</Typography>
            <Grid container spacing={2}>
                {seats.map((seat, index) => seat !== null && (
                    <Grid item xs={6} key={index}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedSeats.includes(seat)}
                                    onChange={() => handleSeatSelect(seat)}
                                />
                            }
                            label={`Seat ${seat + 1}`}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleBooking} style={{ marginTop: '20px' }}>
                Confirm Booking
            </Button>
            <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Your Booked Seats:</Typography>
                {selectedSeats.map(seat => (
                    <Typography key={seat}>{`Seat ${seat + 1}`}</Typography>
                ))}
            </div>
        </Container>
    );
};

export default SeatSelection;
