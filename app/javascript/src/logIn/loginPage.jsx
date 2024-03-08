import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import './stylesheets/login';

const LogIn = () => {
  
  return (
    <Layout>
      <div className="row">
        <div className="col-5 mt-5 offset-2" id="hero">
          <h3 id="welcome">Welcome to LoveLitReviews</h3>
          <p>Welcome to our passionate community of romance aficionados! Dive into the world of love, intrigue, and excitement with our unique platform where readers share their thoughts on the latest page-turners. Whether you're seeking heart-pounding tales or sizzling encounters, our users rate books based on overall enjoyment, captivating storytelling, writing style, and the delicious 'spiciness' factor. Join us and discover your next obsession in the realm of romance!</p>
        </div>
        <div className="col-4 mt-5">
          <div className="row border shadow rounded" id="acc">
            <form className="log-in" onSubmit={handleLogIn}>
              <h6 className="mb-3">Welcome Back!</h6>
              <input type="text"  className="inputwidth username" id="usernameinput" placeholder="Username" required onChange={(event) => userLogIn(event.target.value)}></input>
              <input type="password" className="password" id="passinput" placeholder="Password" required onChange={(event) => passwordLogIn(event.target.value)}></input>
              <button id="log-in-btn">Sign In</button>
              <label htmlFor="remember"><input type="checkbox" id="remember" className="me-1"></input>
              Remember me</label>
              <a href="#" className="ms-3">Forgot Password?</a>
            </form>
          </div>
          <div className="row border shadow rounded mt-3" id="acc">
            <form className="sign-up" onSubmit={handleSignUp}>
              <h6 className="mb-3">New to Twitter?</h6>
              <input type="text" className="inputwidth email" id="newemail" placeholder="Email" required onChange={(event) => setEmail(event.target.value)}></input>
              <input type="text" className="inputwidth username" id="newusername" placeholder="Username" required onChange={(event) => setUsername(event.target.value)}></input>
              <input type="password" className="inputwidth password" id="newpass" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}></input>
              <button className="inputwidth" id="sign-up-btn">Sign Up for Twitter</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LogIn />,
    document.body.appendChild(document.createElement('div')),
  )
})
