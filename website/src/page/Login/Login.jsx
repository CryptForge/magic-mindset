import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <div>
      <form className="loginflexcolumn">
        <label>email</label>
        <input></input>
        <p>status</p>
        <label>password</label>
        <input></input>
        <p>status</p>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
