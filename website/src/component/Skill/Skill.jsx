import React from "react";
import Popup from "reactjs-popup";
import "./Skill.css";
import AddCourseForm from "../TraineePage/AddCourseForm";
import Protected from "../Protected";
import SkillCourseList from "./SkillCourseList";
import ReportListPopup from "../Report/ReportListPopup";

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
        <div className="flex space-between button-spacing">
          <button
            className="button"
            onClick={() => props.toggleButton(props.index)}
          >
            Show Courses
          </button>
          <Protected role="COACH|MANAGER">
            <div className="flex space-between button-spacing">
              <Popup
                trigger={<button className="button">Add Course</button>}
                modal
              >
                <AddCourseForm />
              </Popup>
            </div>
          </Protected>
          <div className="flex space-between button-spacing">
            <Popup trigger={<button className="button">Show Reports</button>}>
              {reportArray.map((report, index) => (
                <ReportListPopup name={report.name} message={report.message} />
              ))}
            </Popup>
          </div>
        </div>
      </div>
      <div
        id={props.index}
        className={props.activeSkill === props.index ? "" : "hidden"}
      >
        <div className="bg-whitesmoke skill-course-item">
          <table className="text">
            <thead>
              <tr>
                <th>Name</th>
                <th className="skill-course-list-padding">Progress</th>
                <th>Certification</th>
              </tr>
            </thead>
            <tbody>
              {props.courseArray.map((course, index) => (
                <SkillCourseList
                  key={index}
                  name={course.name}
                  progress={99.99}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Skill;
