import { useState } from "react";
import Popup from "reactjs-popup";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import PendingChangeDenial from "./PendingChangeDenial";

const PendingChangeValues = (props) => {
  const auth = useAuthContext();
  const [openNested, setOpenNested] = useState(false);
  const closeModal = () => setOpenNested(false);

  const approve = async () => {
    await fetch(`${API_BASE}/changes/accept/${props.value.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getUser().token}`,
      },
    });
    props.setOpen(false);
    props.changeValues(true);
  };

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
              <td>{props.value.oldName}</td>
              <td>{props.value.newName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{props.value.oldEmail}</td>
              <td>{props.value.newEmail}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{props.value.oldAddress}</td>
              <td>{props.value.newAddress}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{props.value.oldCity}</td>
              <td>{props.value.newCity}</td>
            </tr>
          </tbody>
        </table>
        <button className="button" onClick={approve}>
          Approve
        </button>
        <Popup
          open={openNested}
          closeOnDocumentClick
          onClose={closeModal}
          trigger={<button className="button">Deny</button>}
          modal
          nested
        >
          <PendingChangeDenial
            value={props.value}
            changeValues={props.changeValues}
            setOpen={props.setOpen}
            setOpenNested={setOpenNested}
          />
        </Popup>
      </div>
    </div>
  );
};

export default PendingChangeValues;
