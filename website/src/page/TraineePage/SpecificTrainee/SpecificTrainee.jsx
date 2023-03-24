import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SpecificTrainee.css";
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
    <div className="flex center align-center trainee-page-margin">
      <h2 className="white">{"TRAINEE NAME"}'s Skill List</h2>
      <div className="element flex flex-column ">
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
      <Link to="/traineepage" className="back-button-top">
        <button className="button">Back to Traineepage!</button>
      </Link>
    </div>
  );
};

export default SpecificTrainee;
