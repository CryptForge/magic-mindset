import ComingEvaluation from "./ComingEvaluation";

const ComingEvaluations = () => {
  const evaluations = [
    { id: "1", with: "PERSON 1", date: new Date("2023-11-23") },
    { id: "2", with: "PERSON 2", date: new Date("2023-11-23") },
    { id: "3", with: "PERSON 1", date: null },
  ];
  return (
    <div className="grid-element element box1">
      <div className="min-width-0">
        <h2>Coming up Evaluations</h2>
        <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
          {evaluations.map((evaluation, index) => (
            <ComingEvaluation
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

export default ComingEvaluations;
