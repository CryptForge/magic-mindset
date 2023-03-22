import Popup from "reactjs-popup";

const CoachRecommendation = (props) => {
  return (
    <li className="temp-divider">
      <div>{props.date}</div>
      <Popup modal trigger={<button>View</button>}>
        <div className="whiteelement">{props.message}</div>
      </Popup>
    </li>
  );
};
export default CoachRecommendation;
