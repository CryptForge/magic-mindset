import React from "react";
const User = (props) => {
  return (
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <div>
          <h2>Show all goals. ex:</h2>
          <ul>
            <li className="temp-divider">
              <div>1 - NAME</div>
              <div>View OTHER PAGE</div>
            </li>
            <li className="temp-divider">
              <div>2 - NAME</div>
              <div>View OTHER PAGE</div>
            </li>
            <li className="temp-divider">
              <div>3 - NAME</div>
              <div>View OTHER PAGE</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="gridelement element box2">
        <div>
          <h2>Invite for feedback / coming up meetings</h2>
          <ul>
            <li className="temp-divider">
              <div>1 - MEETING 1</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>2 - MEETING 2</div>
              <div>View (Popup)</div>
            </li>
            <li className="temp-divider">
              <div>3 - MEETING 3</div>
              <div>View (Popup)</div>
            </li>
          </ul>
          <div>Button to popup to create meeting</div>
        </div>
      </div>
      <div className="gridelement element box3">
        <div>
          <h2>Create a rapport button</h2>
          <ul>
            <li className="temp-divider">
              <div>1 - RAPPORT 1 (One send earlier)</div>
              <div>View (OTHER PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>2 - RAPPORT 2 (One send earlier)</div>
              <div>View (OTHER PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>3 - RAPPORT 3 (One send earlier)</div>
              <div>View (OTHER PAGE)</div>
            </li>
          </ul>
          <div>BUTTON TO CREATE RAPPORT (POPUP)</div>
        </div>
      </div>
      <div className="gridelement element box4">
        <div>
          <h2>Training courses and certifications</h2>
          <ul>
            <li className="temp-divider">
              <div>
                1 - COURSE 1 SORTED BY COMPLETED (END IS COMPLETED, BEGINNING IS
                TO DO)
              </div>
              <div>EDIT (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>
                2 - COURSE 2 SORTED BY COMPLETED (END IS COMPLETED, BEGINNING IS
                TO DO)
              </div>
              <div>EDIT (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>
                3 - COURSE 3 SORTED BY COMPLETED (END IS COMPLETED, BEGINNING IS
                TO DO)
              </div>
              <div>EDIT (POPUP)</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
