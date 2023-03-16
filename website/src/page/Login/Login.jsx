import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { postForm } from "../../util";
import "./Login.css";

const Login = (props) => {
  const auth = useContext(AuthContext);

  if (auth.authenticated) {
    return <Navigate to="/" replace />;
  }

  const login = async (event) => {
    const response = await postForm(event, `${API_BASE}/auth/login`);
    const data = await response.json();

    props.authenticate(data.token, data.username, data.role);
  };

  return (
    <div className="whiteelement">
      <form className="loginflexcolumn" onSubmit={login}>
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
            className="inputfield"
          ></input>
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            required
            className="inputfield"
            type="password"
          ></input>
        </div>
        <input type="submit" value="Login" className="inputbutton"></input>
      </form>
    </div>
  );
};

export default Login;
