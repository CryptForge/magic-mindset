import React from "react";

const Coach = (props) => {
  return (
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <h2>Show all students + Button for single one</h2>
      </div>
      <div className="gridelement element box2">
        <h2>Show invites to feedback meetings</h2>
      </div>
      <div className="gridelement element box3">
        <h2> advice to student</h2>
      </div>
      <div className="gridelement element box4">
        <h2>Plan meeting with student</h2>
      </div>
    </div>
  );
};

export default Coach;
