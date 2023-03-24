import Popup from "reactjs-popup";
import PendingChangeValues from "./PendingChangeValues";

const PendingChange = (props) => {
  return (
    <li className="divider min-width-0">
      <div>{props.name}</div>
      <Popup modal nested trigger={<button>View Requested Changes</button>}>
        <PendingChangeValues changeId={0} />
      </Popup>
    </li>
  );
};
export default PendingChange;
