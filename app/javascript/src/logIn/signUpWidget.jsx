// SignUpWidget component
import React, { useState } from 'react';
import '@src/stylesheets/login';

const SignUpWidget = ({ onSignInClick, signUp, setNewUsername, setNewEmail, setNewPassword }) => {
  const [username, setUsernameInput] = useState('');
  const [email, setEmailInput] = useState('');
  const [password, setPasswordInput] = useState('');

  const handleUsernameChange = (event) => {
    setUsernameInput(event.target.value);
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
    setNewPassword(event.target.value);
  };

  return (
    <React.Fragment>
      <form className="log-in">
        <h4 className="mb-4">Sign Up</h4>
        <input type="email" className="username form-control  mb-3" id="emailinput" placeholder="Email@Example.com" value={email} onChange={handleEmailChange}></input>
        <input type="text" className="username form-control  mb-3" id="usernameinput" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
        <input type="password" className="password form-control  mb-3" id="passinput" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
        <p className="text-danger d-inline toggle-widget" onClick={onSignInClick}>Have An Account? Sign In</p>
        <button className="btn btn-danger d-inline float-end" id="log-in-btn" onClick={signUp}>Sign Up</button>
      </form>
    </React.Fragment>
  );
}

export default SignUpWidget;
