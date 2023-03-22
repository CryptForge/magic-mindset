import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import AuthButton from "../AuthButton/AuthButton";
import Protected from "../Protected";
import AuthContext, { useAuthContext } from "../../AuthContext";

const Header = () => {
  const auth = useAuthContext();
  return (
    <div>
      <div className="headergrid">
        <div className="header-side-one">
          <AuthButton />
          <Protected role="TRAINEE">
            <NavLink to="/skills" className="navigation-link">
              Skills
            </NavLink>
          </Protected>
          <Protected role="COACH|MANAGER|HR">
            <NavLink to="/traineepage" className="navigation-link">
              Trainees
            </NavLink>
          </Protected>
        </div>

        <div className="header-middle">
          <NavLink to="/" className="title">
            Magic Mindset
          </NavLink>
        </div>

        <div className="header-side-two">
          <NavLink to="/info" className="navigation-link">
            Info
          </NavLink>

          <Protected>
            <NavLink to="/dashboard" className="navigation-link">
              Dashboard
            </NavLink>
          </Protected>

          <Protected>
            <NavLink to="/profile" className="navigation-link">
              Profile
            </NavLink>
          </Protected>
        </div>
      </div>
    </div>
  );
};

export default Header;
