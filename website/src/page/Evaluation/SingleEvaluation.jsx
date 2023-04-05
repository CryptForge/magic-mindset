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
  const [skillReports, setSkillReports] = useState([]);

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
      authFetch(`${API_BASE}/user/${evaluation.trainee}`, auth.getUser().token)
        .then((response) => response.json())
        .then((data) => setTrainee(data));
      authFetch(
        `${API_BASE}/report/all/evaluation/${evaluationId}`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setSkillReports(data));
    }
  }, [evaluation]);

  return (
    <div className="evaluation-page">
      <div className="grid grid-2x2first1x2">
        <SkillReportList
          skillReports={skillReports}
          traineeId={trainee.id}
          refreshEvaluation={setRefreshEvaluation}
          evaluationId={evaluationId}
        />
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
