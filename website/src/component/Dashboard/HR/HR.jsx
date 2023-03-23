import React from "react";
import Popup from "reactjs-popup";
import AddUserForm from "../AddUserForm/AddUserForm";

const HR = () => {
  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div>
          <h2>Show students + button for single one</h2>
          <ul>
            <li className="temp-divider">
              <div>1 - TRAINEE 1</div>
              <div>View (OTHER PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>2 - TRAINEE 2</div>
              <div>View (OTHER PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>3 - TRAINEE 3</div>
              <div>View (OTHER PAGE)</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid-element element box2 pointer">
        <div>
          <Popup trigger={<h2>Add a new user.</h2>} modal>
            <AddUserForm />
          </Popup>
          <span>List with current users</span>
          <ul>
            <li className="temp-divider">
              <div>1 - USER 1</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>2 - USER 2</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>3 - USER 3</div>
              <div>View (Popup)</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid-element element box3">
        <div>
          <h2>Show progress reports</h2>
          <span>Progress reports sorted by most recent</span>
          <ul>
            <li className="temp-divider">
              <div>1 - REPORT 1</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>2 - REPORT 2</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>3 - REPORT 3</div>
              <div>View (Popup)</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid-element element box4">
        <div>
          <h2>Current changes to accounts</h2>
          <span>List with all requests</span>
          <ul>
            <li className="temp-divider">
              <div>1 - CHANGE 1</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>2 - CHANGE 2</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>3 - CHANGE 3</div>
              <div>View (Popup)</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HR;
