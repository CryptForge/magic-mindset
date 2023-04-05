import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { authFetch } from "../../../util";
import InvitationPopup from "../Popup/InvitationPopup";

const DashboardInvitation = (props) => {
  const auth = useAuthContext();
  const [invitation, setInvitation] = useState({});

  useEffect(() => {
    authFetch(
      `${API_BASE}/evaluation/${props.invitation.evaluationId}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setInvitation(data));
  }, []);

  return (
    <li className="divider min-width-0">
      <div>
        {invitation.trainee === auth.getUser().id
          ? invitation.evaluatorName
          : invitation.traineeName}
      </div>
      <Popup modal nested trigger={<button>view</button>}>
        <InvitationPopup
          invitation={invitation}
          refreshInvitations={props.refreshInvitations}
        />
      </Popup>
    </li>
  );
};
export default DashboardInvitation;
