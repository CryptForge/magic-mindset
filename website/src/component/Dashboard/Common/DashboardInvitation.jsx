import Popup from "reactjs-popup";
import InvitationPopup from "../Popup/InvitationPopup";

const DashboardInvitation = (props) => {
  return (
    <li className="divider min-width-0">
      <div>{props.date}</div>
      <Popup modal trigger={<button>view</button>}>
        <InvitationPopup id={0} mine={props.mine} />
      </Popup>
    </li>
  );
};
export default DashboardInvitation;
