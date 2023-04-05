import { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";

const AddSkillReport = (props) => {
  const auth = useAuthContext();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    authFetch(
      `${API_BASE}/skill/all/user/${props.traineeId}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <div className="popup-container flex flex-column">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          formData.append("date", new Date().getTime());
          formData.append("evaluationId", props.evaluationId);
          const request = Object.fromEntries(formData);
          event.currentTarget.reset();

          console.log(request);

          await authFetch(
            `${API_BASE}/report`,
            auth.getUser().token,
            JSON.stringify(request),
            "POST"
          );

          props.refreshEvaluation(true);
        }}
      >
        <div>
          <label htmlFor="skillId"></label>
          <select id="skillId" name="skillId">
            {skills.map((skill, index) => (
              <option value={skill.id} key={index}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="progress">Progress</label>
          <input type="number" id="progress" name="progress"></input>
        </div>
        <div>
          <input type="submit" value="submit" className="button" />
        </div>
      </form>
    </div>
  );
};

export default AddSkillReport;
