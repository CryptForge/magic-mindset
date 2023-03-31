import ComingEvaluation from "./ComingEvaluation";

const ComingEvaluations = (props) => {
  return (
    <div className="grid-element element box1">
      <div className="min-width-0">
        <h2>Coming up Evaluations</h2>
        <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
          {props.evaluations.map((evaluation, index) => (
            <ComingEvaluation
              evaluation={evaluation}
              refreshEvaluations={props.refreshEvaluations}
              index={index}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComingEvaluations;
