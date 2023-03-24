import Popup from "reactjs-popup";
import PendingChangeDenial from "./PendingChangeDenial";

const PendingChangeValues = (props) => {
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <table>
          <thead className="table-dark-blue">
            <tr>
              <th></th>
              <th>Old Value</th>
              <th>New Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{"OLD NAME"}</td>
              <td>{"NEW NAME"}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{"OLD EMAIL"}</td>
              <td>{"NEW EMAIL"}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{"OLD ADDRESS"}</td>
              <td>{"NEW ADDRESS"}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{"OLD CITY"}</td>
              <td>{"NEW CITY"}</td>
            </tr>
          </tbody>
        </table>
        <button className="button">Approve</button>
        <Popup trigger={<button className="button">Deny</button>} modal nested>
          <PendingChangeDenial changeId={props.changeId} />
        </Popup>
      </div>
    </div>
  );
};

export default PendingChangeValues;
