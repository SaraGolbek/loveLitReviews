import React from 'react';
import ReactDOM from 'react-dom';

import './stylesheets/login';

class SignUpWidget extends React.Component {

  render() {
   return ( 
     <React.Fragment>
       <form className="sign-up">
         <h6 className="mb-3">Sign Up</h6>
         <input type="text" className="inputwidth email" id="newemail" placeholder="Email" ></input>
         <input type="text" className="inputwidth username" id="newusername" placeholder="Username" ></input>
         <input type="password" className="inputwidth password" id="newpass" placeholder="Password"></input>
         <p>Have an Account? Sign In</p>
         <button className="inputwidth" id="sign-up-btn">Sign Up</button>
       </form>
     </React.Fragment>
     );
  }
}

export defualt SignUpWidget;
