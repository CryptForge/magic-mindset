import React from "react";
import { useParams } from "react-router-dom";
import SkillReportList from "../../component/SingleEvaluation/SkillReportList";
import TraineeInfo from "../../component/SingleEvaluation/TraineeInfo";
import UploadFile from "../../component/SingleEvaluation/UploadFile";
import "./Evaluation.css";

const SingleEvaluation = () => {
  const { evaluationId } = useParams();
  return (
    <div className="evaluation-page">
      <div className="grid grid-2x2first1x2">
        <SkillReportList />
        <TraineeInfo />
        <UploadFile evaluationId={evaluationId} />
      </div>
    </div>
  );
};

export default SingleEvaluation;
