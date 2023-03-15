import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import LoginLogoutButton from "../LoginLogoutButton/LoginLogoutButton";

const Header = (props) => {
  return (
    <div>
      <div className="headerflex">
        <LoginLogoutButton logOut={props.logOut} />
        <h2>
          <NavLink to="/studentspage">Studentspage</NavLink>
        </h2>
        <h1>
          <NavLink to="/">Magic Mindset</NavLink>
        </h1>
        <h2>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </h2>
        <h2>
          <NavLink to="/profile">Profile</NavLink>
        </h2>
      </div>
      <div>
        <h2>lazy nav, to reach pages not accessible through nav</h2>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/info">Info</NavLink>
      </div>
    </div>
  );
};

export default Header;
