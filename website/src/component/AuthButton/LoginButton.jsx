import React from "react";
import { Link } from "react-router-dom";
import "./AuthButton.css";

const LoginButton = () => {
  return (
    <Link to="/login" className="navigation-link">
      Log In
    </Link>
  );
};

export default LoginButton;
