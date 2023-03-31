import Popup from "reactjs-popup";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { authFetch } from "../../../util";
import InvitationDenyPopup from "./InvitationDenyPopup";

const InvitationPopup = (props) => {
  const auth = useAuthContext();

  const acceptInvitation = async () => {
    await authFetch(
      `${API_BASE}/invitation/accept/${props.invitation.id}`,
      auth.getUser().token
    );
    props.refreshInvitations(true);
  };

  return (
    <div className="popup-container">
      <div>
        <b>Info</b>
      </div>
      <div>
        Date and Time:{" "}
        {props.invitation.date !== undefined
          ? new Date(props.invitation.date).toUTCString()
          : "No date set"}
      </div>
      <div>
        Location:{" "}
        {props.invitation.location !== undefined
          ? props.invitation.location
          : "No location set"}
      </div>
      <div>
        With:{" "}
        {props.invitation.trainee === auth.getUser().id
          ? props.invitation.evaluatorName
          : props.invitation.traineeName}
      </div>
      <div>
        <button className="button" onClick={acceptInvitation}>
          Accept
        </button>
        <Popup
          modal
          nested
          trigger={<button className="button button-red">Deny</button>}
        >
          <InvitationDenyPopup
            invitation={props.invitation}
          ></InvitationDenyPopup>
        </Popup>
      </div>
    </div>
  );
};

export default InvitationPopup;
