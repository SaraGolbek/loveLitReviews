// SignUpWidget component
import React, { useState } from 'react';
import { safeCredentials, handleErrors} from '@src/utils/fetchHelper';
import '@src/stylesheets/login';

const SignUpWidget = ({ onSignInClick }) => {
const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (e) => {
    if (e) { e.preventDefault(); }
    setError('');

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.user) {
          handleLogin();
        }
      })
      .catch(error => {
        setError('Could not sign up.');
      });
  };

  const handleLogin = () => {
    fetch('/api/sessions', safeCredentials({
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
        if (data.success) {
          window.location.replace("/home");
        }
      })
      .catch(error => {
        setError('Could not log in.');
      });
  };


  return (
    <React.Fragment>
      <form className="log-in" onClick={handleSignUp}>
        <h4 className="mb-4">Sign Up</h4>
        <input type="email" className="username form-control  mb-3" id="email" placeholder="Email@Example.com" value={email} onChange={handleEmailChange}></input>
        <input type="text" className="username form-control  mb-3" id="username" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
        <input type="password" className="password form-control  mb-3" id="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
        <p className="text-danger d-inline toggle-widget" onClick={onSignInClick}>Have An Account? Sign In</p>
        <button className="btn btn-danger d-inline float-end" id="log-in-btn">Sign Up</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </React.Fragment>
  );
}

export default SignUpWidget;
