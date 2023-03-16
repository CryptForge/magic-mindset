import React from "react";
import { Link } from "react-router-dom";
import "./AuthButton.css";

const LoginButton = (props) => {
  return (
    <Link to="/login">
      <button className="auth-button">Log In</button>
    </Link>
  );
};

export default LoginButton;
