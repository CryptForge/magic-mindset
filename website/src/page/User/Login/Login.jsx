import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { postForm } from "../../../util";
import { NavLink } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const auth = useContext(AuthContext);

  if (auth.userIsAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const login = async (event) => {
    try {
      const response = await postForm(event, `${API_BASE}/auth/login`);
      if (response.status === 401) {
        toast.error("Failed to login! Invalid User Credentials", {
          position: "bottom-center",
        });
      } else if (response.status === 400) {
        toast.error("Unverified user!", { position: "bottom-center" });
      } else if (response.status === 202) {
        toast.success("Login succesful, redirecting to dashboard!");
        const data = await response.json();
        auth.userLogin(data);
      }
    } catch (error) {
      toast.warn("Cannot connect to server!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="side-lines-divider">
      <div className="side-lines-left">
        <NavLink to="/" className="link">
          Welcome
        </NavLink>
        <div className="line-container">
          <div className="line"></div>
        </div>
      </div>
      <div className="side-lines-middle">
        <div className="split-flex">
          <div className="home-column-flex"></div>
          <form className="login-flex-column" onSubmit={login}>
            <div className="flex flex-column text">
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
            <div className="flex flex-column">
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
      </div>
      <div className="side-lines-right">
        <div className="side-lines-right-text">
          Let your magical adventure begin
        </div>
      </div>
    </div>
  );
};

export default Login;
