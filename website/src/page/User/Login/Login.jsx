import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { postForm } from "../../../util";
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
      console.log(response);
      if (response.status === 401) {
        toast.error("Failed to login! Invalid User Credentials", {
          position: "bottom-center",
        });
      }
      toast.success("Login succesful, redirecting to dashboard!");
      const data = await response.json();

      auth.userLogin(data);
    } catch (error) {
      toast.warn("Cannot connect to server!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="white-element">
      <form className="login-flex-column" onSubmit={login}>
        <div className="flex column">
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
