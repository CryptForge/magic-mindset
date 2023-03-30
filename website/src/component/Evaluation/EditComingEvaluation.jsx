const EditComingEvaluation = (props) => {
  return (
    <div className="popup-container flex flex-column">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div className="width-full">
        You are meeting with: {props.evaluation.with}
      </div>
    </div>
  );
};

export default EditComingEvaluation;
