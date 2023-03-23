import react from "react";
import { Link } from "react-router-dom";

const CoachTraineeList = (props) => {
  return (
    <li className="temp-divider">
      <div>
        {props.index} - {props.name}
      </div>
      <Link to={`/trainee/${props.id}`}>
        <button>View</button>
      </Link>
    </li>
  );
};
export default CoachTraineeList;
