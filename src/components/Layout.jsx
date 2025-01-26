//layout.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { checkAuthenticated } from '../utils/auth';
import { API_BASE_URL } from '../utils/api';


const Layout = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authenticate = async () => {
            if (location.pathname === '/login') {
                setLoading(false); // Skip authentication check for the login page
                return;
            }

            try {
                setLoading(true);
                const { authenticated, username } = await checkAuthenticated();

                if (!authenticated) {
                    navigate('/login');
                } else {
                    setAuthenticated(true);
                    setCurrentUser(username);
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            } finally {
                setLoading(false);
            }
        };

        authenticate();
    }, [navigate, location.pathname]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            setAuthenticated(false);
            setCurrentUser(null); // Clear the current username
            navigate('/login'); // Use React Router navigation
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    return (
        <React.Fragment>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-md sticky-top navbar-light bg-white">
                    <div className="container-fluid">
                        <p className="navbar-brand h3">
                            L<i className="fa-regular fa-heart fa-xs"></i>veLitReviews
                        </p>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            {authenticated ? (
                                <ul className="navbar-nav">
                                    <li><Link to="/" className="nav-link">Home</Link></li>
                                    <li><Link className="nav-link" to={`/profile/${currentUser}`}>
                                        Profile
                                    </Link></li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="nav-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLogout();
                                            }}
                                            >Log Out
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="navbar-nav">
                                <li><Link to="/login" className="nav-link">Sign In</Link></li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>


                <div className="container-fluid bg-light w-100 body flex-grow-1">
                    <Outlet />
                </div>

                <footer className="p-3">
                    <div className="container">
                        <span className="me-3 text-secondary">
                            Built by
                            <a href="https://saraperez-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer"> Sara Perez </a>
                            with ☕ and 🐰
                        </span>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}
Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;