import React from "react";
import "./Info.css";
import { useAuthContext } from "../../AuthContext";
import { NavLink, Link } from "react-router-dom";

const Info = () => {
  const auth = useAuthContext();

  const isLoggedIn = auth.userIsAuthenticated();

  return (
    <div className="side-lines-divider">
      <div className="side-lines-left">
        {isLoggedIn ? (
          <NavLink to="/profile" className="link">
            Profile
          </NavLink>
        ) : (
          <NavLink to="/login" className="link">
            Login
          </NavLink>
        )}
        <div className="line-container">
          <div className="line"></div>
        </div>
      </div>
      <div className="side-lines-middle">
        <div className="split-flex">
          <div className="home-column-flex">
            <h1>
              Welcome to <span className="sparkle">Magic Mindset</span>!
            </h1>
            <h2>
              Wether a beginner, or an expert in any given field, skill or
              ability, magic mindset is the place to learn. An enthusiastic team
              of coaches and managers stand ready to assist you in learing any
              discipline, from skill to even mindsets! We work with personalized
              learning processes and embedded coaches and managers to keep an
              eye on your progress with frequent progress reports and
              evaluations. A simple skill/course system will let you work on any
              skill you desire to learn, or master. So don't wait and become a
              part of the magic experience that is the magic mindset! Sign up
              now and start your learning journey today!
            </h2>
            {!isLoggedIn && (
              <Link to="/login" className="login">
                Login Now
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/dashboard" className="login">
                Go To Dashboard
              </Link>
            )}
          </div>
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

export default Info;
