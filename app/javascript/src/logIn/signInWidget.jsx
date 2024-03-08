import React from 'react';
import './stylesheets/login';

class SignInWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form className="log-in">
          <h6 className="mb-3">Sign In</h6>
          <input type="text" className="username" id="usernameinput" placeholder="Username"></input>
          <input type="password" className="password" id="passinput" placeholder="Password"></input>
          <p onClick={this.props.onSignUpClick}>No Account? Sign Up</p>
          <button id="log-in-btn">Sign In</button>
        </form>
      </React.Fragment>
    );
  }
}

export default SignInWidget;

