import React from 'react';
import '@src/stylesheets/login';

class SignInWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form className="log-in">
          <h4 className="mb-4">Sign In</h4>
          <input type="text" className="username form-control  mb-3" id="usernameinput" placeholder="Username"></input>
          <input type="password" className="password form-control  mb-3" id="passinput" placeholder="Password"></input>
          <p className="text-danger d-inline toggle-widget" onClick={this.props.onSignUpClick}>No Account? Sign Up</p>
          <button className="btn btn-danger d-inline float-end" id="log-in-btn">Sign In</button>
        </form>
      </React.Fragment>
    );
  }
}

export default SignInWidget;

