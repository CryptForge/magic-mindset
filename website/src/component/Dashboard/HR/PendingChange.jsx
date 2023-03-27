import { useState } from "react";
import Popup from "reactjs-popup";
import PendingChangeValues from "./PendingChangeValues";

const PendingChange = (props) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <li className="divider min-width-0">
      <div>{props.value.oldEmail}</div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        nested
        trigger={<button>View Requested Changes</button>}
      >
        <PendingChangeValues
          value={props.value}
          changeValues={props.changeValues}
          setOpen={setOpen}
        />
      </Popup>
    </li>
  );
};
export default PendingChange;
