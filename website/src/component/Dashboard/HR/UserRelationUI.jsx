import react from "react";
import { authPostForm } from "../../../util";
import AuthContext, { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { useState } from "react";
import { authFetch } from "../../../util";

const UserRelationUI = (props) => {
  const [traineeCoachId, setTraineeCoachId] = useState(0);
  const [traineeManagerId, setTraineeManagerId] = useState(0);

  const auth = useAuthContext();
  const traineeArray = props.users.filter((user) => user.role === "TRAINEE");
  const coachArray = props.users.filter((user) => user.role === "COACH");
  const managerArray = props.users.filter((user) => user.role === "MANAGER");

  return (
    <div className="flex">
      <div className="white-element">
        <form
          className="flex flex-column"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const request = formData.get("coachId");
            event.currentTarget.reset();

            return authFetch(
              `${API_BASE}/trainee/${traineeCoachId}/coach`,
              auth.getUser().token,
              JSON.stringify(request),
              "POST"
            );
          }}
        >
          <label htmlFor="trainee">Trainee</label>
          <select
            id="trainee"
            name="trainee"
            onChange={(event) => setTraineeCoachId(event.target.value)}
          >
            {traineeArray.map((trainee, index) => (
              <option value={trainee.id} key={index}>
                {trainee.name}
              </option>
            ))}
          </select>
          <label htmlFor="coachId">Coach</label>
          <select id="coachId" name="coachId">
            {coachArray.map((coach, index) => (
              <option value={coach.id} key={index}>
                {coach.name}
              </option>
            ))}
          </select>
          <input
            className="button"
            type="submit"
            value="Assign Coach to Trainee"
          ></input>
        </form>
      </div>
      <div className="white-element">
        <form
          className="flex flex-column"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const request = formData.get("managerId");
            event.currentTarget.reset();

            return authFetch(
              `${API_BASE}/trainee/${traineeManagerId}/manager`,
              auth.getUser().token,
              JSON.stringify(request),
              "POST"
            );
          }}
        >
          <label htmlFor="trainee">Trainee</label>
          <select
            id="trainee"
            name="trainee"
            onChange={(event) => setTraineeManagerId(event.target.value)}
          >
            {traineeArray.map((trainee, index) => (
              <option value={trainee.id} key={index}>
                {trainee.name}
              </option>
            ))}
          </select>
          <label htmlFor="managerId">Manager</label>
          <select id="managerId" name="managerId">
            {managerArray.map((manager, index) => (
              <option value={manager.id} key={index}>
                {manager.name}
              </option>
            ))}
          </select>
          <input
            className="button"
            type="submit"
            value="Assign Manager to Trainee"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default UserRelationUI;
