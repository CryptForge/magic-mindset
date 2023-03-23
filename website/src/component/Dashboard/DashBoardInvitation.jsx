import Popup from "reactjs-popup";

const DashboardInvitation = (props) => {
  return (
    <li className="temp-divider">
      <div>{props.date}</div>
      <Popup modal trigger={<button>view</button>}>
        <div className="white-element">MOOIE INVITIATION INNIT</div>
      </Popup>
    </li>
  );
};
export default DashboardInvitation;
