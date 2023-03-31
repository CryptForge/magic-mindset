import { Link } from "react-router-dom";

const DashboardEvaluationList = (props) => {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{new Date(props.evaluation.date).toUTCString()}</td>
      <td>{props.evaluation.evaluatorName}</td>
      <td>
        <Link to={`/evaluation/${props.evaluation.id}`}>
          <button className="button">View Evaluation</button>
        </Link>
      </td>
    </tr>
  );
};
export default DashboardEvaluationList;
