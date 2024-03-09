import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import SignInWidget from './signInWidget';
import SignUpWidget from './signUpWidget';
import '@src/stylesheets/login';

const LogInPage = () => {
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
  
  return (
    <Layout>
      <div className="row mt-5">
        <div className="col-8 offset-2 col-xxl-6 offset-xxl-3 mt-5" id="hero">
          <div className="row p-5 welcome-message rounded">
            <h3  className="mb-4" id="welcome">Welcome to LoveLitReviews</h3>
            <p style={{textIndent: "3em"}}>Join our passionate community of romance enthusiasts! Dive into the world of love, intrigue, and excitement with our unique platform where readers share their thoughts on the latest page-turners. Whether you're seeking heart-pounding tales or sizzling encounters, our users rate books based on overall enjoyment, captivating storytelling, writing style, and the delicious 'spiciness' factor. Join us and discover your next obsession in the realm of romance!</p>
          </div>
          <div className="row mt-3  p-5 login-widgets rounded">
              {displaySignIn && <SignInWidget onSignUpClick={toggleDisplaySignUp} />}
              {displaySignUp && <SignUpWidget onSignInClick={toggleDisplaySignIn} />}
          </div>
        </div>
      </div>
    </Layout>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LogInPage />,
    document.body.appendChild(document.createElement('div')),
  )
})

