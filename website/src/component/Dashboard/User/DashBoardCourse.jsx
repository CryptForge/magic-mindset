import react from "react";
import Popup from "reactjs-popup";

const DashboardCourse = (props) => {
  return (
    <li className="temp-divider">
      <div>{props.name}</div>
      <div>
        <span>Progress: </span>
        {props.progress}
      </div>
      <Popup trigger={<button>Add Certificate</button>} modal>
        <div className="white-element">UPLOAD CERTIFICATE HERE</div>
      </Popup>
    </li>
  );
};
export default DashboardCourse;
