import { Link } from "react-router-dom";

const DashboardTraineeList = (props) => {
  return (
    <li className="divider min-width-0">
      <div>
        {props.index} - {props.trainee.username}
      </div>
      <Link to={`/trainee/${props.id}`}>
        <button>View</button>
      </Link>
    </li>
  );
};
export default DashboardTraineeList;
