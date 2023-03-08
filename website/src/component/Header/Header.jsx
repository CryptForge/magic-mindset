import React from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <>Hello world! - Header</>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavLink to="/studentpage">Studentpage</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="profile">Profile</NavLink>
      </div>
    </div>
  );
};

export default Header;
