import Popup from "reactjs-popup";
const DashboardUserList = (props) => {
  return (
    <div className="div divider min-width-0">
      <li>{props.user.user.email}</li>
      <Popup trigger={<button>View User</button>} modal>
        <div className="white-element">
          <p>
            <span>Name: </span>
            {props.user.name}
          </p>
          <p>
            <span>Email: </span>
            {props.user.user.email}
          </p>
          <p>
            <span>Address: </span>
            {props.user.address}
          </p>
          <p>
            <span>City: </span>
            {props.user.city}
          </p>
          <p>
            <span>Role: </span>
            {props.user.user.role}
          </p>
        </div>
      </Popup>
    </div>
  );
};
export default DashboardUserList;
