import react from "react";
import Popup from "reactjs-popup";

const DashBoardCourse = (props) => {
  return (
    <li className="temp-divider">
      <div>{props.name}</div>
      <div>
        <span>Progress: </span>
        {props.progress}
      </div>
      <Popup trigger={<button>Add Certificate</button>} modal>
        <div className="whiteelement">UPLOAD CERTIFICATE HERE</div>
      </Popup>
    </li>
  );
};
export default DashBoardCourse;
