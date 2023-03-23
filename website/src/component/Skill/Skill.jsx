import React from "react";
import Popup from "reactjs-popup";
import "./Skill.css";
import { useState } from "react";
import AddCourseForm from "../TraineePage/AddCourseForm";
import Protected from "../Protected";
import SkillCourseList from "../SkillCourseList";
import ReportList from "../ReportList";

const Skill = (props) => {
  const reportArray = [
    {
      name: "report1",
      message: "haha",
    },
    {
      name: "report2",
      message: "hihi",
    },
    {
      name: "report3",
      message: "hoho",
    },
  ];
  return (
    <div>
      <div className="flex skill">
        <h3>{props.name}</h3>
        <div className="flex space-between buttonspacing">
          <button onClick={() => props.toggleButton(props.index)}>
            Show Courses
          </button>
          <Protected role="COACH|MANAGER">
            <Popup trigger={<button>Add Course</button>} modal>
              <AddCourseForm />
            </Popup>
          </Protected>
          <Popup trigger={<button>Show Reports</button>}>
            {reportArray.map((report, index) => (
              <ReportList name={report.name} message={report.message} />
            ))}
          </Popup>
        </div>
      </div>
      <div
        id={props.index}
        className={props.activeSkill === props.index ? "" : "hidden"}
      >
        <div>
          {props.courseArray.map((course, index) => (
            <SkillCourseList key={index} name={course.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skill;
