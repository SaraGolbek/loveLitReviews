// SignInWidget component
import React, { useState } from 'react';
import '@src/stylesheets/login';

const SignInWidget = ({ onSignUpClick, signIn, setUsername, setPassword }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
    setPassword(event.target.value);
  };

  return (
    <React.Fragment>
      <form className="log-in">
        <h4 className="mb-4">Sign In</h4>
        <input type="text" className="username form-control  mb-3" id="usernameinput" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
        <input type="password" className="password form-control  mb-3" id="passinput" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
        <p className="text-danger d-inline toggle-widget" onClick={onSignUpClick}>No Account? Sign Up</p>
        <button className="btn btn-danger d-inline float-end" id="log-in-btn" onClick={signIn}>Sign In</button>
      </form>
    </React.Fragment>
  );
}

export default SignInWidget;


