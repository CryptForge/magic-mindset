import React from "react";
import "./Profile.css";

const Profile = (props) => {
  return (
    <div className="profileflexcolumn">
      <form>
        <div className="flex">
          <div className="flex column">
            <label htmlFor="image">Profile Image</label>
            <button id="image">Round button with +</button>
          </div>
          <div className="flex column">
            <label htmlFor="name">Name</label>
            <input id="name"></input>
            <label htmlFor="email">E-Mail</label>
            <input id="email"></input>
            <label htmlFor="password">Password</label>
            <input id="password"></input>
          </div>
        </div>
        <div className="flex">
          <button>Back to Dashboard!</button>
          <input type="submit" value="save"></input>
        </div>
      </form>
    </div>
  );
};

export default Profile;
