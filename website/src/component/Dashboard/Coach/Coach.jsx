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
  const [refreshInvitations, setRefreshInvitations] = useState(true);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    authFetch(
      `${API_BASE}/trainee/all/${auth.getUser().role.toLowerCase()}/${
        auth.getUser().id
      }`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setTraineeList(data));
  }, []);

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

  const recommendationArray = [
    {
      date: "1994-10-21",
      message: "Terrible",
    },
    {
      date: "2006-07-06",
      message: "Amazing",
    },
    {
      date: "2003-04-03",
      message: "What is this?",
    },
  ];

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
            {recommendationArray.map((recommendation, index) => (
              <CoachRecommendation
                user={"Bob"}
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
            <RecommendationForm traineeList={traineeList} />
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
