import react from "react";
import AuthContext, { useAuthContext } from "../../AuthContext";
import Skill from "../../component/Skill/Skill";
import { useState } from "react";

const SkillPage = () => {
  const auth = useAuthContext();
  const userName = auth.getUser().username;
  const [activeSkill, activateSkill] = useState();
  function toggleButton(index) {
    if (activeSkill === index) {
      activateSkill(null);
      return;
    }
    activateSkill(index);
  }
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
  return (
    <div>
      <h2>
        Logged in as <span>{userName}</span>
      </h2>
      <div>
        <div>
          {skillArray.map((skill, index) => (
            <Skill
              name={skill.name}
              key={index}
              courseArray={courseArray}
              toggleButton={toggleButton}
              activeSkill={activeSkill}
              index={index}
            ></Skill>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SkillPage;
