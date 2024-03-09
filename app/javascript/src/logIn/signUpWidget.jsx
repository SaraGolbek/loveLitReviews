import React from 'react';
import '@src/stylesheets/login';

class SignUpWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form className="log-in">
          <h4 className="mb-4">Sign Up</h4>
          <input type="email" className="username form-control  mb-3" id="usernameinput" placeholder="Email@Example.com"></input>
          <input type="text" className="username form-control  mb-3" id="usernameinput" placeholder="Username"></input>
          <input type="password" className="password form-control  mb-3" id="passinput" placeholder="Password"></input>
          <p className="text-danger d-inline toggle-widget" onClick={this.props.onSignInClick}>No Account? Sign Up</p>
          <button className="btn btn-danger d-inline float-end" id="log-in-btn">Sign In</button>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUpWidget;
