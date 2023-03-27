import { useState } from "react";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";

const PendingChangeDenial = (props) => {
  const [reason, setReason] = useState("");
  const auth = useAuthContext();

  const deny = async () => {
    const body = {
      to: props.value.oldEmail,
      reason: reason,
    };
    await fetch(`${API_BASE}/changes/deny/${props.value.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getUser().token}`,
      },
      body: JSON.stringify(body),
    });
    props.setOpenNested(false);
    props.setOpen(false);
    props.changeValues(true);
  };

  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <div>
          <textarea
            value={reason}
            placeholder="Reason for denial"
            onChange={(value) => {
              setReason(value.target.value);
            }}
          ></textarea>
        </div>
        <button className="button" onClick={deny}>
          Send denial
        </button>
      </div>
    </div>
  );
};

export default PendingChangeDenial;
