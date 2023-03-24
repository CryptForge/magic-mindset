import Popup from "reactjs-popup";

const CoachRecommendation = (props) => {
  return (
    <li className="divider min-width-0">
      <div>{props.user}</div>
      <div>{props.date}</div>
      <Popup modal trigger={<button>View</button>}>
        <div className="white-element">{props.message}</div>
      </Popup>
    </li>
  );
};
export default CoachRecommendation;
