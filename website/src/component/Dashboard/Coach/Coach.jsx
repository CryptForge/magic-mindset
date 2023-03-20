import React from "react";

const Coach = (props) => {
  return (
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <div>
          <h2>Show all students and also button for single one</h2>
          <ul>
            <li className="temp-divider">
              <div>1 - USER 1</div>
              <div>View (DIFFERENT PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>2 - USER 2</div>
              <div>View (DIFFERENT PAGE)</div>
            </li>
            <li className="temp-divider">
              <div>3 - USER 3</div>
              <div>View (DIFFERENT PAGE)</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="gridelement element box2">
        <div>
          <h2>Show invites to feedback</h2>
          <span>
            Sorted by date (and after that if accepted, top is not-accepted yet,
            rest is accepted)
          </span>
          <ul>
            <li className="temp-divider">
              <div>1 - Meeting 1</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>2 - Meeting 2</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>3 - Meeting 3</div>
              <div>View (POPUP)</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="gridelement element box3">
        <div>
          <h2> advice to student</h2>
          <span>List with old advices</span>
          <ul>
            <li className="temp-divider">
              <div>1 - Advice 1</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>2 - Advice 2</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>3 - Advice 3</div>
              <div>View (POPUP)</div>
            </li>
          </ul>
          <span>Button to create advice</span>
        </div>
      </div>
      <div className="gridelement element box4">
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <span>Button to plan meeting</span>
          </div>
          <div>
            <span>List with awaiting response</span>
          </div>
          <ul>
            <li className="temp-divider">
              <div>1 - Meeting 1</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>2 - Meeting 2</div>
              <div>View (POPUP)</div>
            </li>
            <li className="temp-divider">
              <div>3 - Meeting 3</div>
              <div>View (POPUP)</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coach;
