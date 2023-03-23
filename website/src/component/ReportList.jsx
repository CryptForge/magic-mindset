import react from "react";
import Popup from "reactjs-popup";
import Report from "./Report";

const ReportList = (props) => {
  return (
    <li className="white-element">
      <div>{props.name}</div>
      <Popup modal trigger={<button>View Report</button>}>
        <Report message={props.message} />
      </Popup>
    </li>
  );
};

export default ReportList;
