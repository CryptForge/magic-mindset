import React from "react";
import "./StudentsPage.css";

const StudentsPage = (props) => {
  return (
    <div classname="flex column">
      <div className="flex spacearound">
        <div className="flex column">
          <h2>Student-Name</h2>
          <p>Current Skills</p>
        </div>
        <button>Dropdown menu</button>
      </div>
      <div className="flex spacearound">
        {/* component here! */}
        <p>name</p>
        <p>status</p>
        <button>See reports: popup</button>
      </div>
      <div className="flex spacearound">
        <button>Back to Dashboard</button>
        <button>Change User Info</button>
        <button>Invite to Meeting</button>
      </div>
    </div>
  );
};

export default StudentsPage;
