import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../AuthContext";
import wand from "../../img/wand.png";
import "./Home.css";

const Home = () => {
  const auth = useContext(AuthContext);

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
        <div className="home-split-flex">
          <div className="home-column-flex">
            <h1>The Magic Starts Here</h1>
            <h2>
              Learn the ins and outs of magic through the fake works of Magic
              Mindset! And yes, this is completely fake. So all info is
              protected and life will not be better by trying this :)
            </h2>
            {!isLoggedIn && (
              <Link to="/login" className="login">
                Login Now
              </Link>
            )}
          </div>
          <div>
            <img src={wand} alt="Wand"></img>
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

export default Home;
