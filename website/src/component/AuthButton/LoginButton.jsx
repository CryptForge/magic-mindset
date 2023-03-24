import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/login" className="navigation-link">
      Log In
    </Link>
  );
};

export default LoginButton;
