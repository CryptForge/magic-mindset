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
            <h1>Info</h1>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              natus dolores repellat recusandae est, dicta rem doloremque
              ratione quis reiciendis explicabo cupiditate, mollitia placeat
              nisi voluptatibus velit optio deserunt. Debitis. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Quisquam natus dolores
              repellat recusandae est, dicta rem doloremque ratione quis
              reiciendis explicabo cupiditate, mollitia placeat nisi
              voluptatibus velit optio deserunt. Debitis. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quisquam natus dolores repellat
              recusandae est, dicta rem doloremque ratione quis reiciendis
              explicabo cupiditate, mollitia placeat nisi voluptatibus velit
              optio deserunt. Debitis. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam natus dolores repellat recusandae est,
              dicta rem doloremque ratione quis reiciendis explicabo cupiditate,
              mollitia placeat nisi voluptatibus velit optio deserunt. Debitis.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              natus dolores repellat recusandae est, dicta rem doloremque
              ratione quis reiciendis explicabo cupiditate, mollitia placeat
              nisi voluptatibus velit optio deserunt. Debitis. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Quisquam natus dolores
              repellat recusandae est, dicta rem doloremque ratione quis
              reiciendis explicabo cupiditate, mollitia placeat nisi
              voluptatibus velit optio deserunt. Debitis.
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
