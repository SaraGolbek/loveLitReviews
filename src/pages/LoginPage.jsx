import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInWidget from '../components/SignInWidget';
import SignUpWidget from '../components/SignUpWidget';

const LogInPage = () => {
    const [displaySignIn, setDisplaySignIn] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const checkAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:5000/api/authenticated', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    setAuthenticated(data.authenticated);
                })
                .catch(() => setAuthenticated(false));
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    const toggleDisplaySignIn = () => setDisplaySignIn(true);
    const toggleDisplaySignUp = () => setDisplaySignIn(false);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100 login-page">
            <nav className="navbar navbar-expand-md sticky-top navbar-light bg-white">
                <div className="container-fluid">
                    <a className="navbar-brand h3" href="#">L<i className="fa-regular fa-heart fa-xs"></i>veLitReviews</a>
                </div>
            </nav>
            <div className="container-fluid bg-light w-100 body flex-grow-1">
                <div className="row mt-5">
                    <div className="col-8 offset-2 col-xxl-6 offset-xxl-3 mt-5" id="hero">
                        <div className="row p-5 welcome-message rounded">
                            <h3 className="mb-4" id="welcome">Welcome to LoveLitReviews</h3>
                            <p style={{textIndent: "3em"}}>Join our passionate community of romance enthusiasts! Dive
                                into the world of love, intrigue, and excitement with our unique platform where readers
                                share their thoughts on the latest page-turners. Whether you&#39;re seeking heart-pounding
                                tales or sizzling encounters, our users rate books based on overall enjoyment,
                                captivating storytelling, writing style, and the delicious &#39;spiciness&#39; factor. Join us
                                and discover your next obsession in the realm of romance!</p>
                        </div>
                            {authenticated ? (
                                <div className="row mt-3  p-5 login-widgets rounded">You are already Signed in! Do you want to go to:
                                    <ul className="navbar-nav">
                                        <li><a className="nav-link" href="/home">Reviews</a></li>
                                        {/*<li><a className="nav-link" href="/profile">Bookshelf</a></li>*/}
                                        <li><a className="nav-link" href="/login" onClick={handleSignOut}>Sign Out</a></li>
                                    </ul>
                                </div>
                            ) : (
                                displaySignIn ? (
                                    <div className="row mt-3 mb-5 p-5 login-widgets rounded">
                                        <SignInWidget onSignInClick={toggleDisplaySignUp}/>
                                    </div>
                                ) : (
                                    <div className="row mt-3 mb-5 p-5 login-widgets rounded">
                                        <SignUpWidget onSignUpClick={toggleDisplaySignIn}/>
                                    </div>
                                )
                            )}
                        <div className=" row spacer mt-5 mb-5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
