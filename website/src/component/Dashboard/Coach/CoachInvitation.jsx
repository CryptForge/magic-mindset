import Popup from "reactjs-popup";

const CoachInvitation = (props) => {
  return (
    <li className="temp-divider">
      <div>{props.date}</div>
      <Popup modal trigger={<button>view</button>}>
        <div className="whiteelement">MOOIE INVITIATION INNIT</div>
      </Popup>
    </li>
  );
};
export default CoachInvitation;
