import Popup from "reactjs-popup";

const DashboardCourse = (props) => {
  return (
    <li className="divider min-width-0">
      <div>{props.name}</div>
      <div>
        <span>Progress: </span>
        {props.progress}
      </div>
      <Popup
        trigger={<button className="button">Add Certificate</button>}
        modal
      >
        <div className="white-element">UPLOAD CERTIFICATE HERE NEEDS IMPL</div>
      </Popup>
    </li>
  );
};
export default DashboardCourse;
