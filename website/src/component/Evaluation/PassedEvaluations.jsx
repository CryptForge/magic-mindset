import PassedEvaluation from "./PassedEvaluation";

const PassedEvaluations = (props) => {
  return (
    <div className="grid-element element box2">
      <div className="min-width-0">
        <h2>Finished Evaluations</h2>
        <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
          {props.evaluations.map((evaluation, index) => (
            <PassedEvaluation
              evaluation={evaluation}
              index={index}
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PassedEvaluations;
