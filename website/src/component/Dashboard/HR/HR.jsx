import React from "react";
import Popup from "reactjs-popup";
import AddUserForm from "../AddUserForm/AddUserForm";

const HR = (props) => {
  return (
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <h2>Show students + button for single one</h2>
      </div>
      <Popup
        trigger={
          <div className="gridelement element box2 pointer">
            <h2>Add a new user.</h2>
          </div>
        }
        modal
      >
        <AddUserForm />
      </Popup>

      <div className="gridelement element box3">
        <h2>Show progress reports</h2>
      </div>
      <div className="gridelement element box4">
        <h2>Current changes to accounts</h2>
      </div>
    </div>
  );
};

export default HR;
