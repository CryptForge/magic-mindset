import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { postForm } from "../../util";
import "./Login.css";

const Login = (props) => {
  const auth = useContext(AuthContext);

  const login = async (event) => {
    const response = await postForm(event, `${API_BASE}/auth/login`);
    const data = await response.json();

    props.authenticate(data.token, data.username, data.role);
  };

  return (
    <div>
      <p>You are currently {auth.authenticated ? "" : "not"} logged in.</p>
      <p>{auth.authenticated ? "You are a " + auth.info.role : ""}</p>
      <form className="loginflexcolumn" onSubmit={login}>
        <label htmlFor="email">email</label>
        <input id="email" name="email" required></input>
        <p>status</p>
        <label htmlFor="password">password</label>
        <input id="password" name="password" required></input>
        <p>status</p>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
};

export default Login;
