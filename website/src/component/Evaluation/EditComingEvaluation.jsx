import { useState } from "react";
import Popup from "reactjs-popup";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import DeleteCourseConformation from "../Skill/DeleteCourseConformation";

const EditComingEvaluation = (props) => {
  console.log(props.evaluation);
  const auth = useAuthContext();
  const [location, setLocation] = useState(
    props.evaluation.location !== null ? props.evaluation.location : ""
  );
  const [date, setDate] = useState(
    props.evaluation.date !== null ? props.evaluation.date : ""
  );

  return (
    <div className="popup-container flex flex-column">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div className="width-full">
        You are meeting with:{" "}
        <span className="capitalize">
          {props.evaluation.trainee === auth.getUser().id
            ? props.evaluation.evaluatorName
            : props.evaluation.traineeName}
        </span>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("id", props.evaluation.id);
            formData.append(
              "conclusionFileName",
              props.evaluation.conclusionFileName
            );
            formData.append("evaluatorId", props.evaluation.evaluator);
            formData.append("traineeId", props.evaluation.trainee);
            const request = Object.fromEntries(formData);
            event.currentTarget.reset();

            await authFetch(
              `${API_BASE}/evaluation/edit`,
              auth.getUser().token,
              JSON.stringify(request),
              "PUT"
            );
            props.refreshEvaluations(true);
          }}
        >
          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              value={location}
              onChange={(change) => setLocation(change.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Date and Time</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={(change) => setDate(change.target.value)}
            ></input>
          </div>
          <input className="button" type="submit" value="Save"></input>
        </form>
        <Popup
          modal
          nested
          trigger={<button className="button button-red">Delete</button>}
        >
          <DeleteCourseConformation id={props.evaluation.id} />
        </Popup>
      </div>
    </div>
  );
};

export default EditComingEvaluation;
