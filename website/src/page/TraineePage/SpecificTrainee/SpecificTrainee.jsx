import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SpecificTrainee.css";
import Skill from "../../../component/Skill/Skill";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";

const SpecificTrainee = () => {
  const { traineeId } = useParams();
  const auth = useAuthContext();

  const [activeSkill, activateSkill] = useState();
  const [recallValues, setRecallValues] = useState(true);
  const [user, setUser] = useState({});
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchAllUser() {
      const request = await fetch(`${API_BASE}/user/get/${traineeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      setUser(data);
    }
    async function fetchSkills() {
      const request = await fetch(`${API_BASE}/skill/all/user/${traineeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      setSkills(data);
    }
    if (recallValues) {
      setRecallValues(false);
      if (JSON.stringify(user) === "{}") {
        fetchAllUser();
      }
      fetchSkills();
    }
  }, [recallValues]);

  function toggleButton(index) {
    if (activeSkill === index) {
      activateSkill(null);
      return;
    }
    activateSkill(index);
  }

  if (JSON.stringify(user) === "{}") {
    return (
      <div className="flex center align-center trainee-page-margin">
        <h2 className="white">Loading...</h2>
        <Link to="/traineepage" className="back-button-top">
          <button className="button">Back to Traineepage!</button>
        </Link>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="flex center align-center trainee-page-margin">
        <h2 className="white">
          <span className="capitalize header-text">{user.name}</span>'s Skill
          List
        </h2>
        <div className="element flex flex-column header-text">
          No Skills Yet!
        </div>
        <Link to="/traineepage" className="back-button-top">
          <button className="button">Back to Traineepage!</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex center align-center trainee-page-margin">
      <h2 className="white">
        <span className="capitalize header-text">{user.name}</span>'s Skill List
      </h2>
      <div className="element flex flex-column ">
        {skills.map((skill, index) => (
          <Skill
            name={skill.name}
            id={skill.id}
            key={index}
            toggleButton={toggleButton}
            activeSkill={activeSkill}
            setRecallValues={setRecallValues}
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
