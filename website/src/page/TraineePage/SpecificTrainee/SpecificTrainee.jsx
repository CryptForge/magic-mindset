import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SpecificTrainee.css";
import Skill from "../../../component/Skill/Skill";
import { authFetch } from "../../../util";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";

const SpecificTrainee = () => {
  const auth = useAuthContext();
  const { traineeId } = useParams();
  const [activeSkill, activateSkill] = useState();
  const [skillList, setSkillList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    authFetch(`${API_BASE}/skill/all/user/${traineeId}`, auth.getUser().token)
      .then((response) => response.json())
      .then((data) => setSkillList(data));
  }, []);

  useEffect(() => {
    setCourseList([]);
    if (activeSkill !== undefined) {
      authFetch(
        `${API_BASE}/course/all/skill/${activeSkill + 1}`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setCourseList(data));
    }
  }, [activeSkill]);

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
        {skillList.map((skill, index) => (
          <Skill
            name={skill.name}
            key={index}
            courseList={courseList}
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
