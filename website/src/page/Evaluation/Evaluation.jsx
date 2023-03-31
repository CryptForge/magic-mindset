import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../AuthContext";
import ComingEvaluations from "../../component/Evaluation/ComingEvaluations";
import PassedEvaluations from "../../component/Evaluation/PassedEvaluations";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import "./Evaluation.css";

const Evaluation = () => {
  const auth = useAuthContext();
  const [comingEvaluations, setComingEvaluations] = useState([]);
  const [refreshEvaluations, setRefreshEvaluations] = useState(true);
  const [doneEvaluations, setDoneEvaluations] = useState([]);

  useEffect(() => {
    const getEvaluations = () => {
      if (auth.getUser().role == "TRAINEE") {
        authFetch(
          `${API_BASE}/evaluation/all/trainee/${auth.getUser().id}`,
          auth.getUser().token
        )
          .then((response) => response.json())
          .then((data) => {
            const now = new Date();
            setComingEvaluations(
              data.filter(
                (evaluation) => evaluation.date == null || evaluation.date < now
              )
            );
            setDoneEvaluations(
              data.filter(
                (evaluation) =>
                  evaluation.date != null && evaluation.date >= now
              )
            );
          });
      } else {
        authFetch(
          `${API_BASE}/evaluation/all/user/${auth.getUser().id}`,
          auth.getUser().token
        )
          .then((response) => response.json())
          .then((data) => {
            const now = Date.now();
            setComingEvaluations(
              data.filter((a) => a.date == null || a.date < now)
            );
            setDoneEvaluations(
              data.filter((a) => a.date != null && a.date > now)
            );
          });
      }
    };

    if (refreshEvaluations) {
      setRefreshEvaluations(false);
      getEvaluations();
    }
  }, [refreshEvaluations]);
  return (
    <div className="evaluation-page">
      <div className="grid grid-1x2">
        <ComingEvaluations
          evaluations={comingEvaluations}
          refreshEvaluations={setRefreshEvaluations}
        />
        <PassedEvaluations
          evaluations={doneEvaluations}
          refreshEvaluations={setRefreshEvaluations}
        />
      </div>
    </div>
  );
};

export default Evaluation;
