import { Link } from "react-router-dom";

const DashboardEvaluationList = (props) => {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.evaluation.date}</td>
      <td>{props.evaluation.participator}</td>
      <td>
        <Link to={`/evaluation/${props.evaluation.id}`}>
          <button className="button">View Evaluation</button>
        </Link>
      </td>
    </tr>
  );
};
export default DashboardEvaluationList;
