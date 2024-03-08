// layout.jsx
import React from 'react';

const Layout = (props) => {
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
              <ul className="navbar-nav">
                <li><a className="nav-link" href="home">Reviews</a></li>
                <li><a className="nav-link" href="profile">Bookshelf</a></li>
                <li><a className="nav-link" href="loginPage">Sign In</a></li>
                <li><a className="nav-link" href="loginPage">Sign Up</a></li>
                <li><input className="form-control me-2" type="search" placeholder="Search for a book..." aria-label="Search"/></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid bg-light w-100 body flex-grow-1">
          {props.children}
        </div>
        <footer className="p-3">
          <div className="container">
            <p>Made by</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Layout;
