import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { postForm } from "../../../util";
import "./Login.css";

const Login = () => {
  const auth = useContext(AuthContext);

  if (auth.userIsAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const login = async (event) => {
    const response = await postForm(event, `${API_BASE}/auth/login`);
    const data = await response.json();

    auth.userLogin(data);
  };

  return (
    <div className="white-element">
      <form className="login-flex-column" onSubmit={login}>
        <div className="flex column">
          <h3>
            You are currently {auth.authenticated ? "" : "not"} logged in.
          </h3>
          <h3>{auth.authenticated ? "You are a " + auth.info.role : ""}</h3>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            required
            className="input-field"
          ></input>
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            required
            className="input-field"
            type="password"
          ></input>
        </div>
        <input type="submit" value="Login" className="input-button"></input>
      </form>
    </div>
  );
};

export default Login;
