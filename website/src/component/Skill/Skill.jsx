import React from "react";
import Popup from "reactjs-popup";
import "./Skill.css";
import { useState } from "react";
import AddCourseForm from "../TraineePage/AddCourseForm";
import Protected from "../Protected";
import SkillCourseList from "../SkillCourseList";

const Skill = (props) => {
  const courseArray = props.courseArray;
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
          <button>Show Reports</button>
        </div>
      </div>
      <div
        id={props.index}
        className={props.activeSkill === props.index ? "" : "hidden"}
      >
        <div>
          {courseArray.map((course, index) => (
            <SkillCourseList key={index} name={course.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skill;
