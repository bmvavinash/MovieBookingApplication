import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        axios.post(`${API_URL}/login`, { username }).then(res => {
            if (res.data.success) {
                onLogin(username);
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
