import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../AuthContext";
import SkillReportList from "../../component/SingleEvaluation/SkillReportList";
import TraineeInfo from "../../component/SingleEvaluation/TraineeInfo";
import UploadFile from "../../component/SingleEvaluation/UploadFile";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import "./Evaluation.css";

const SingleEvaluation = () => {
  const { evaluationId } = useParams();
  const auth = useAuthContext();

  const [refreshEvaluation, setRefreshEvaluation] = useState(true);
  const [evaluation, setEvaluation] = useState({});
  const [trainee, setTrainee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await authFetch(
        `${API_BASE}/evaluation/${evaluationId}`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setEvaluation(data));
    };
    if (refreshEvaluation) {
      setRefreshEvaluation(false);
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(evaluation) !== "{}") {
      authFetch(
        `${API_BASE}/user/get/${evaluation.trainee}`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setTrainee(data));
    }

    //TODO GET ALL SKILL REPORTS WHEN EVALUATION IS SEND
  }, [evaluation]);

  return (
    <div className="evaluation-page">
      <div className="grid grid-2x2first1x2">
        <SkillReportList />
        <TraineeInfo trainee={trainee} />
        <UploadFile
          fileName={evaluation.conclusionFileName}
          evaluationId={evaluationId}
          refreshEvaluation={setRefreshEvaluation}
        />
      </div>
    </div>
  );
};

export default SingleEvaluation;
