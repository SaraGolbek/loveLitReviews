//layout.jsx
import React, { useState, useEffect } from 'react';
import { safeCredentials, handleErrors} from '@src/utils/fetchHelper';

const Layout = (props) => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthenticated = () => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setAuthenticated(data.authenticated);
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const handleSignOut = (event) => {
    event.preventDefault();

    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
      body: JSON.stringify({})
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        window.location.replace("/loginPage");
      })
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-md sticky-top navbar-light bg-white">
          <div className="container-fluid">
            <a className="navbar-brand h3" href="#">L<i className="fa-regular fa-heart fa-xs"></i>veLitReviews</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                {authenticated ? (
                  <ul className="navbar-nav">
                    <li><a className="nav-link" href="/home">Reviews</a></li>
                    <li><a className="nav-link" href="/profile">Bookshelf</a></li>
                    <li><a className="nav-link" href="/loginPage" onClick={handleSignOut}>Sign Out</a></li>
                  </ul>
                ) : (
                  <ul className="navbar-nav">
                    <li><a className="nav-link" href="/loginPage">Sign In</a></li>
                  </ul>
                )}
            </div>
          </div>
        </nav>
        {authenticated ? (
        <div className="container-fluid bg-light w-100 body flex-grow-1">
          {props.children}
        </div>
        ) : (
          <div className="container-fluid bg-light flex-grow-1 d-flex w-100">
            <div className="row align-items-center justify-content-center w-100">
              <div className="col-6 rounded border shadow-sm text-center"><h3>Oops! You are not logged in. Please <a className="text-danger" href="/loginPage">Sign In</a> to continue.</h3></div>
            </div>
          </div>
          )}
        <footer className="p-3">
          <div className="container">
            <span className="me-3 text-secondary">Built by <a href="https://app.netlify.com/sites/saragolbekportfolio/overview" target="_blank" rel="noopener noreferrer">Sara Golbek</a> with ☕ and 🐰</span>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Layout;
