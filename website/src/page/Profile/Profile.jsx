import React from "react";
import "./Profile.css";

const Profile = (props) => {
  return (
    <div className="profileflexcolumn">
      <form>
        <div className="flex">
          <div className="flex column">
            <label>Profile Image</label>
            <button>Round button with +</button>
          </div>
          <div className="flex column">
            <label>Name</label>
            <input></input>
            <label>E-Mail</label>
            <input></input>
            <label>Password</label>
            <input></input>
          </div>
        </div>
        <div className="flex">
          <button>Back to Dashboard</button>
          <input type="submit" value="save"></input>
        </div>
      </form>
    </div>
  );
};

export default Profile;
