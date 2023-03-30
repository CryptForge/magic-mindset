import react from "react";
import AuthContext, { useAuthContext } from "../../AuthContext";
import Skill from "../../component/Skill/Skill";
import { useState, useEffect } from "react";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import "./SkillPage.css";

const SkillPage = () => {
  const auth = useAuthContext();
  const userName = auth.getUser().username;
  const [skillList, setSkillList] = useState([]);
  const [activeSkill, activateSkill] = useState();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    authFetch(
      `${API_BASE}/skill/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
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
  if (skillList.length === 0) {
    return (
      <div className="center align-center skill-margin">
        <div className="element">
          <h3>No skills just yet! Contact your coach to get started!</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div>
            {skillList.map((skill, index) => (
              <Skill
                name={skill.name}
                id={skill.id}
                key={index}
                courseArray={courseList}
                toggleButton={toggleButton}
                activeSkill={activeSkill}
                index={index}
              ></Skill>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
export default SkillPage;
