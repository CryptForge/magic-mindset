import Popup from "reactjs-popup";
import { useAuthContext } from "../../AuthContext";
import EditComingEvaluation from "./EditComingEvaluation";

const ComingEvaluation = (props) => {
  const auth = useAuthContext();
  return (
    <li className="divider min-width-0">
      <div>
        <span className="capitalize">
          {props.evaluation.trainee === auth.getUser().id
            ? props.evaluation.evaluatorName
            : props.evaluation.traineeName}
        </span>
        {" - "}
        {props.evaluation.date !== null
          ? new Date(props.evaluation.date).toUTCString()
          : "No time yet"}
        {" - "}
        {props.evaluation.location !== null
          ? props.evaluation.location
          : "No location yet"}
      </div>
      <Popup modal nested trigger={<button>Edit</button>}>
        <EditComingEvaluation
          evaluation={props.evaluation}
          refreshEvaluations={props.refreshEvaluations}
        />
      </Popup>
    </li>
  );
};
export default ComingEvaluation;
