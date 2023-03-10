import React from "react";
import Skill from "../../component/Skill/Skill";
import StudentDropdown from "../../component/StudentsPage/StudentDropdown";

import "./StudentsPage.css";

const StudentsPage = (props) => {
  return (
    <div className="flex column">
      <div className="flex spacearound">
        <div className="flex column">
          <h2>Student-Name</h2>
          <p>Current Skills</p>
        </div>
        <StudentDropdown />
      </div>
      <Skill />
      <div className="flex spacearound">
        <button>Back to Dashboard</button>
        <button>Change User Info</button>
        <button>Invite to Meeting</button>
      </div>
    </div>
  );
};

export default StudentsPage;
