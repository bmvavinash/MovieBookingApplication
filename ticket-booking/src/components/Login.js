import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const API_URL = 'http://localhost:5000';

const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post(`${API_URL}/login`, { username }).then(res => {
            if (res.data.success) {
                navigate('/movies', { state: { username } });
            }
        });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                label="Enter username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default Login;
