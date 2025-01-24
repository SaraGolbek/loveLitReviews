//layout.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { checkAuthenticated } from '../utils/auth';


const Layout = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const isAuthenticated = await checkAuthenticated();

                if (!isAuthenticated && location.pathname !== '/login') {
                    navigate('/login');
                } else {
                    setAuthenticated(isAuthenticated);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setLoading(false);
            }
        };

        authenticate();
    }, [location.pathname, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <React.Fragment>
            <div className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-md sticky-top navbar-light bg-white">
                    <div className="container-fluid">
                        <a className="navbar-brand h3" href="#">
                            L<i className="fa-regular fa-heart fa-xs"></i>veLitReviews
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            {authenticated ? (
                                <ul className="navbar-nav">
                                    <li><Link to="/" className="nav-link">Home</Link></li>
                                    <li><Link className="nav-link" to={`/profile/${localStorage.getItem('username')}`}>
                                        Profile
                                    </Link></li>
                                    <li><Link
                                        to="/login"
                                        className="nav-link"
                                        onClick={() => {
                                            setAuthenticated(false);
                                            localStorage.removeItem('token');
                                        }}
                                    >
                                        Sign Out
                                    </Link></li>
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