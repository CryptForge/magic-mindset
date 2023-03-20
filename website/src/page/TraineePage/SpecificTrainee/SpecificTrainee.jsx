import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./SpecificTrainee.css";
import AddCourseForm from "../../../component/TraineePage/AddCourseForm";

const SpecificTrainee = () => {
  const [activeSkill, activateSkill] = useState();

  function toggleButton(index) {
    if (activeSkill === index) {
      activateSkill(null);
      return;
    }
    activateSkill(index);
  }

  const courseArray = [
    {
      name: "course1",
    },
    {
      name: "course2",
    },
    {
      name: "course3",
    },
  ];

  const skillArray = [
    {
      name: "Woodcutting",
    },
    {
      name: "Planning",
    },
    {
      name: "Astral Projection",
    },
  ];
  const { traineeId } = useParams();

  return (
    <div>
      <h1>{traineeId}</h1>
      <h2>Trainee name and skilllist</h2>
      <div className="element flex column list">
        {skillArray.map((skill, index) => (
          <div key={index}>
            <div key={index} className="listelement flex space-around">
              <h3>{skill.name}</h3>
              <div className="flex space-between buttonspacing">
                <button onClick={() => toggleButton(index)}>
                  Show Courses
                </button>
                <Popup trigger={<button>Add Course</button>} modal>
                  <AddCourseForm />
                </Popup>
                <button>Show Reports</button>
              </div>
            </div>
            <div id={index} className={activeSkill === index ? "" : "hidden"}>
              {courseArray.map((course, index) => (
                <div key={index}>
                  <p>{course.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link to="/traineepage">
        <button>Back to Traineepage!</button>
      </Link>
    </div>
  );
};

export default SpecificTrainee;
