import { Link } from "react-router-dom";
import { useAuthContext } from "../../AuthContext";

const PassedEvaluation = (props) => {
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
      <Link className="button" to={`/evaluation/${props.evaluation.id}`}>
        <button>Change Evaluation</button>
      </Link>
    </li>
  );
};

export default PassedEvaluation;
