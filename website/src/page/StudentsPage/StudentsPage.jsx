import React from "react";
import Skill from "../../component/Skill/Skill";
import StudentDropdown from "../../component/StudentsPage/StudentDropdown";
import { Link } from "react-router-dom";

import "./StudentsPage.css";

const StudentsPage = (props) => {
  let skillArray = [
    {
      type: true,
      name: "Houthakken 1",
      description: "Bomen slopen voor hout.",
      finished: true,
    },
    {
      type: true,
      name: "Skateboarden 1",
      description: "Radicaal zijn",
      finished: false,
    },
  ];

  let studentArray = [
    {
      name: "Victor",
    },
    {
      name: "Tijs",
    },
    { name: "Rebecca" },
  ];

  return (
    <div className="flex column element">
      <div className="flex spacearound columncenter">
        <div className="flex column">
          <h2>Student - Place McHolder</h2>
          <h3>Current Skills</h3>
        </div>
        <StudentDropdown studentList={studentArray} />
      </div>
      <div className="flex column skillist">
        {skillArray.map((skill, index) => (
          <Skill
            key={index}
            name={skill.name}
            finished={skill.finished}
            description={skill.description}
            type={skill.type}
          />
        ))}
      </div>
      <div className="flex spacearound buttonlist">
        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>

        <button>Change User Info</button>
        <button>Invite to Meeting</button>
      </div>
    </div>
  );
};

export default StudentsPage;
