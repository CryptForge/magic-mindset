import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./SpecificTrainee.css";
import AddCourseForm from "../../../component/TraineePage/AddCourseForm";
import Skill from "../../../component/Skill/Skill";

const SpecificTrainee = () => {
  const { traineeId } = useParams();
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

  return (
    <div>
      <h1>{traineeId}</h1>
      <h2>Trainee name and skilllist</h2>
      <div className="element flex column ">
        {skillArray.map((skill, index) => (
          <Skill
            name={skill.name}
            key={index}
            courseArray={courseArray}
            toggleButton={toggleButton}
            activeSkill={activeSkill}
            index={index}
          />
        ))}
      </div>
      <Link to="/traineepage">
        <button>Back to Traineepage!</button>
      </Link>
    </div>
  );
};

export default SpecificTrainee;
