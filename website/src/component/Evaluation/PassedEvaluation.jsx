import { Link } from "react-router-dom";

const PassedEvaluation = (props) => {
  return (
    <li className="divider min-width-0">
      <div>
        {props.index} - {props.evaluation.with}
      </div>
      <Link className="button" to={`/evaluation/${props.evaluation.id}`}>
        <button>Change Evaluation</button>
      </Link>
    </li>
  );
};

export default PassedEvaluation;
