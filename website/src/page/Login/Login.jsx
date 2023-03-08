import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <div>
      <form className="loginflexcolumn">
        <label htmlFor="email">email</label>
        <input id="email" required></input>
        <p>status</p>
        <label htmlFor="password">password</label>
        <input id="password" required></input>
        <p>status</p>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
