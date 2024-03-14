// login page component
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors} from '@src/utils/fetchHelper';
import SignInWidget from './signInWidget';
import SignUpWidget from './signUpWidget';
import '@src/stylesheets/login';

const LogInPage = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [displaySignUp, setDisplaySignUp] = useState(false);

  const toggleDisplaySignIn = () => {
    setDisplaySignIn(true);
    setDisplaySignUp(false);
  };

  const toggleDisplaySignUp = () => {
    setDisplaySignIn(false);
    setDisplaySignUp(true);
  };

  const handleLogIn = (event) => {
    event.preventDefault();

    fetch('/api/sessions', safeCredentials ({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        window.location.replace("/home");
      })

  }

  const handleSignUp = (event) => {
    event.preventDefault();

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: newUsername,
          email: newEmail,
          password: newPassword,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data);
        window.location.replace("/home");
      })
  };

  return (
    <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-md sticky-top navbar-light bg-white">
          <div className="container-fluid">
          <a className="navbar-brand h3" href="#">L<i className="fa-regular fa-heart fa-xs"></i>veLitReviews</a>
          </div>
        </nav>
        <div className="container-fluid bg-light w-100 body flex-grow-1">
          <div className="row mt-5">
            <div className="col-8 offset-2 col-xxl-6 offset-xxl-3 mt-5" id="hero">
              <div className="row p-5 welcome-message rounded">
                <h3  className="mb-4" id="welcome">Welcome to LoveLitReviews</h3>
                <p style={{textIndent: "3em"}}>Join our passionate community of romance enthusiasts! Dive into the world of love, intrigue, and excitement with our unique platform where readers share their thoughts on the latest page-turners. Whether you're seeking heart-pounding tales or sizzling encounters, our users rate books based on overall enjoyment, captivating storytelling, writing style, and the delicious 'spiciness' factor. Join us and discover your next obsession in the realm of romance!</p>
              </div>
              <div className="row mt-3  p-5 login-widgets rounded">
                  {displaySignIn && <SignInWidget onSignUpClick={toggleDisplaySignUp} signIn={handleLogIn} setUsername={setUsername} setPassword={setPassword}/>}
                  {displaySignUp && <SignUpWidget onSignInClick={toggleDisplaySignIn} signUp={handleSignUp} setNewUsername={setNewUsername} setNewEmail={setNewEmail} setNewPassword={setNewPassword}/>}
              </div>
            </div>
          </div>
      </div>
      <footer className="p-3">
        <div className="container">
          <span className="me-3 text-secondary">Built by <a href="https://app.netlify.com/sites/saragolbekportfolio/overview" target="_blank" rel="noopener noreferrer">Sara Golbek</a> with ☕ and 🐰</span>
        </div>
      </footer>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LogInPage />,
    document.body.appendChild(document.createElement('div')),
  )
})
