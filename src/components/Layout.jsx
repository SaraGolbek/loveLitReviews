//layout.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Layout = (props) => {

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
                            <ul className="navbar-nav">
                                <li><Link className="nav-link" to="/">Reviews</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <div className="container-fluid bg-light w-100 body flex-grow-1">
                    {props.children}
                </div>

                <footer className="p-3">
                    <div className="container">
                        <span className="me-3 text-secondary">
                            Built by
                            <a href="https://saraperez-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
                                Sara Golbek
                            </a>
                            with ☕ and 🐰
                        </span>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
}
Layout.propTypes = {
    children: PropTypes.node, // Accepts any valid React node as children
};

export default Layout;