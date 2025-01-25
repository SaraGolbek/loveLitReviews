import React, { useState } from 'react';
import "../styles/login.scss"
import PropTypes from "prop-types";
import { API_BASE_URL } from '../utils/api';

const SignInWidget = ({ onSignInClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Invalid username or password');
                }
                return res.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                window.location.replace('/');
            })
            .catch(() => {
                setError('Could not log in.');
            });
    };

    return (
        <form className="log-in" onSubmit={handleLogin}>
            <h4 className="mb-4">Sign In</h4>
            <input type="text" className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn btn-danger d-inline float-end">Sign In</button>
            {error && <p className="text-danger">{error}</p>}
            <p className="mt-3"><button type="button" className="btn btn-link text-danger d-inline" onClick={onSignInClick}>No account? Sign Up</button></p>
        </form>
    );
};

SignInWidget.propTypes = {
    onSignInClick: PropTypes.func.isRequired,
};

export default SignInWidget;
