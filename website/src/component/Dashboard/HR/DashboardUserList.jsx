import react from "react";
import Popup from "reactjs-popup";
const DashboardUserList = (props) => {
  return (
    <div>
      <li>{props.name}</li>
      <Popup trigger={<button>View User</button>} modal>
        <div className="white-element">
          <p>
            <span>Name: </span>
            {props.name}
          </p>
          <p>
            <span>Role: </span>
            {props.role}
          </p>
        </div>
      </Popup>
    </div>
  );
};
export default DashboardUserList;
