import React from "react";
import Popup from "reactjs-popup";
import DashboardInvitation from "../Common/DashboardInvitation";
import CoachRecommendation from "./CoachRecommendation";
import DashboardTraineeList from "../Common/DashboardTraineeList";
import AddInvitationForm from "../Common/AddInvitiationForm";
import { Link } from "react-router-dom";
import { authFetch } from "../../../util";
import { useEffect, useState } from "react";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";
import RecommendationForm from "../Common/RecommendationForm";

const Coach = () => {
  const auth = useAuthContext();
  const [traineeList, setTraineeList] = useState([]);
  const [recommendationList, setRecommendationList] = useState([]);
  const [refreshCall, setRefreshCall] = useState(false);
  const [refreshInvitations, setRefreshInvitations] = useState(true);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchTrainees = async () => {
      await authFetch(
        `${API_BASE}/trainee/all/${auth.getUser().role.toLowerCase()}/${
          auth.getUser().id
        }`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setTraineeList(data));
      setRefreshCall(true);
    };
    fetchTrainees();
  }, []);

  useEffect(() => {
    const getRecommendationList = async () => {
      const result = [];
      for await (const trainee of traineeList) {
        await authFetch(
          `${API_BASE}/recommendation/all/user/${trainee.id}`,
          auth.getUser().token
        )
          .then((response) => response.json())
          .then((data) => {
            data.forEach((value) => result.push(value));
          });
      }
      setRecommendationList(result);
    };
    if (refreshCall) {
      setRefreshCall(false);
      getRecommendationList();
    }
  }, [refreshCall]);

  useEffect(() => {
    const getInvitations = async () => {
      await authFetch(
        `${API_BASE}/invitation/all/user/${auth.getUser().id}`,
        auth.getUser().token
      )
        .then((response) => response.json())
        .then((data) => setInvitations(data));
    };
    if (refreshInvitations) {
      setRefreshInvitations(false);
      getInvitations();
    }
  }, [refreshInvitations]);

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Your Trainee's</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {traineeList.map((trainee, index) => (
              <DashboardTraineeList
                key={index}
                trainee={trainee}
                id={trainee.id}
                index={index}
              />
            ))}
          </ul>
          <Link to="/traineepage">
            <button className="button">View all</button>
          </Link>
        </div>
      </div>
      <div className="grid-element element box2">
        <div className="min-width-0">
          <h2>Show invitations</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {invitations.map((invitation, index) => (
              <DashboardInvitation
                key={index}
                invitation={invitation}
                refreshInvitations={setRefreshInvitations}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box3">
        <div className="min-width-0">
          <h2>Recommendation to student</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {recommendationList.map((recommendation, index) => (
              <CoachRecommendation
                userId={recommendation.trainee}
                date={recommendation.date}
                message={recommendation.message}
                key={index}
              />
            ))}
          </ul>
          <Popup
            modal
            trigger={<button className="button">Add Recommendation</button>}
          >
            <RecommendationForm
              traineeList={traineeList}
              refreshCall={setRefreshCall}
            />
          </Popup>
        </div>
      </div>
      <div className="grid-element element box4">
        <div className="min-width-0">
          <h2>Plan Meeting</h2>
          <div>
            <Popup
              trigger={<button className="button">Add Invitation</button>}
              modal
            >
              <AddInvitationForm traineeList={traineeList} />
            </Popup>
          </div>
          <div className="margin-top">
            <Link to="/evaluation" className="button">
              See All Evaluations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
