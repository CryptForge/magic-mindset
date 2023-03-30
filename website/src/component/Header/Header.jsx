import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import AuthButton from "../AuthButton/AuthButton";
import Protected from "../Protected";

const Header = () => {
  const renderMenu = () => {
    var hamburgerLinks = document.getElementById("hamburger-links");
    if (hamburgerLinks.style.display === "block") {
      hamburgerLinks.style.display = "none";
    } else {
      hamburgerLinks.style.display = "block";
    }
  };
  return (
    <div className="header">
      <div className="hamburger-header">
        <NavLink to="/" className="title">
          Magic Mindset
        </NavLink>
        <div id="hamburger-links">
          <div>
            <Protected role="TRAINEE">
              <NavLink to="/skills" className="navigation-link">
                Skills
              </NavLink>
            </Protected>
          </div>
          <div>
            <Protected role="TRAINEE|COACH|MANAGER">
              <NavLink to="/evaluation" className="navigation-link">
                Evaluations
              </NavLink>
            </Protected>
          </div>
          <div>
            <Protected role="COACH|MANAGER|HR">
              <NavLink to="/traineepage" className="navigation-link">
                Trainees
              </NavLink>
            </Protected>
          </div>
          <div>
            <NavLink to="/info" className="navigation-link">
              Info
            </NavLink>
          </div>
          <div>
            <Protected>
              <NavLink to="/dashboard" className="navigation-link">
                Dashboard
              </NavLink>
            </Protected>
          </div>
          <div>
            <Protected>
              <NavLink to="/profile" className="navigation-link">
                Profile
              </NavLink>
            </Protected>
          </div>
          <div>
            <AuthButton />
          </div>
        </div>
        <a className="icon" onClick={renderMenu}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
      <div className="header-grid min-width-0">
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
          <Protected role="COACH|MANAGER|TRAINEE">
            <NavLink to="/evaluation" className="navigation-link">
              Evaluations
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
