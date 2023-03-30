import React from "react";
import ComingEvaluations from "../../component/Evaluation/ComingEvaluations";
import PassedEvaluations from "../../component/Evaluation/PassedEvaluations";
import "./Evaluation.css";

const Evaluation = () => {
  return (
    <div className="evaluation-page">
      <div className="grid grid-1x2">
        <ComingEvaluations />
        <PassedEvaluations />
      </div>
    </div>
  );
};

export default Evaluation;
