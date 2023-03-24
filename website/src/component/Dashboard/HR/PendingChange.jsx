import react from "react";
import Popup from "reactjs-popup";

const PendingChange = (props) => {
  return (
    <li>
      <div>{props.name}</div>
      <Popup trigger={<button>View Requested Changes</button>} modal>
        <div className="white-element" modal>
          <div>OLD STUFF</div>
          <div>NEW STUFF</div>
        </div>
      </Popup>
    </li>
  );
};
export default PendingChange;
