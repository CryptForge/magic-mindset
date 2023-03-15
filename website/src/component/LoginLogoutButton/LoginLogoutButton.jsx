import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

const LoginLogoutButton = (props) => {
  const auth = useContext(AuthContext);
  if (auth.authenticated) {
    return (
      <Link to="/login">
        <button className="headerbutton" onClick={props.logOut}>
          Log Out
        </button>
      </Link>
    );
  }
  return (
    <Link to="/login">
      <button className="headerbutton">Log In</button>
    </Link>
  );
};

export default LoginLogoutButton;
