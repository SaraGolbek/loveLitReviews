// SignInWidget component
import React, { useState } from 'react';
import { safeCredentials, handleErrors} from '@src/utils/fetchHelper';
import '@src/stylesheets/login';

const SignInWidget = ({ onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
  return (
    <React.Fragment>
      <form className="log-in" onSubmit={handleLogIn}>
        <h4 className="mb-4">Sign In</h4>
        <input type="text" className="username form-control  mb-3" id="username" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
        <input type="password" className="password form-control  mb-3" id="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
        <p className="text-danger d-inline toggle-widget" onClick={onSignUpClick}>No Account? Sign Up</p>
        <button className="btn btn-danger d-inline float-end" id="log-in-btn">Sign In</button>
      </form>
    </React.Fragment>
  );
}

export default SignInWidget;

