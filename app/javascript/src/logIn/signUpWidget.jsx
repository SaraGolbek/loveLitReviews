import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/login';

class SignUpWidget extends React.Component {

  render() {
   return ( 
     <React.Fragment>
       <form className="sign-up" onSubmit={handleSignUp}>
         <h6 className="mb-3">New to Twitter?</h6>
         <input type="text" className="inputwidth email" id="newemail" placeholder="Email" required onChange={(event) => setEmail(event.target.value)}></input>
         <input type="text" className="inputwidth username" id="newusername" placeholder="Username" required onChange={(event) => setUsername(event.target.value)}></input>
         <input type="password" className="inputwidth password" id="newpass" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}></input>
         <button className="inputwidth" id="sign-up-btn">Sign Up for Twitter</button>
       </form>
     </React.Fragment>
     );
  }
}

export defualt SignUpWidget;
