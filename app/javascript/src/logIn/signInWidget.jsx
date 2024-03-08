<form className="log-in" onSubmit={handleLogIn}>
  <h6 className="mb-3">Welcome Back!</h6>
  <input type="text"  className="inputwidth username" id="usernameinput" placeholder="Username" required onChange={(event) => userLogIn(event.target.value)}></input>
  <input type="password" className="password" id="passinput" placeholder="Password" required onChange={(event) => passwordLogIn(event.target.value)}></input>
  <button id="log-in-btn">Sign In</button>
  <label htmlFor="remember"><input type="checkbox" id="remember" className="me-1"></input>
  Remember me</label>
  <a href="#" className="ms-3">Forgot Password?</a>
</form>
