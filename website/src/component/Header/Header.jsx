import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import AuthButton from "../AuthButton/AuthButton";
import Protected from "../Protected";

const Header = (props) => {
  return (
    <div>
      <div className="headerflex">
        <AuthButton logOut={props.logOut} />

        <Protected role="COACH|MANAGER|HR">
          <NavLink to="/studentspage">
            <h2 className="navigation-link">Students</h2>
          </NavLink>
        </Protected>

        <NavLink to="/">
          <h1 className="title">Magic Mindset</h1>
        </NavLink>

        <NavLink to="/info">
          <h2 className="navigation-link">Info</h2>
        </NavLink>

        <Protected>
          <NavLink to="/dashboard">
            <h2 className="navigation-link">Dashboard</h2>
          </NavLink>
        </Protected>

        <Protected>
          <NavLink to="/profile">
            <h2 className="navigation-link">Profile</h2>
          </NavLink>
        </Protected>
      </div>
    </div>
  );
};

export default Header;
