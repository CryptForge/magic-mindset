import Popup from "reactjs-popup";
import EditComingEvaluation from "./EditComingEvaluation";

const ComingEvaluation = (props) => {
  return (
    <li className="divider min-width-0">
      <div>
        {props.index} - {props.evaluation.with}
      </div>
      <Popup modal trigger={<button>Edit</button>}>
        <EditComingEvaluation evaluation={props.evaluation} />
      </Popup>
    </li>
  );
};
export default ComingEvaluation;
