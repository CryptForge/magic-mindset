const ConformationDeleteComingEvaluation = (props) => {
  const deleteEvaluation = () => {};

  return (
    <div className="popup-container flex flex-column">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <button className="button button-red" onClick={deleteEvaluation}>
        Delete
      </button>
    </div>
  );
};

export default ConformationDeleteComingEvaluation;
