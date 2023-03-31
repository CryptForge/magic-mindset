import React from "react";
import DashboardTraineeList from "../Common/DashboardTraineeList";
import DashboardInvitation from "../Common/DashboardInvitation";
import AddInvitationForm from "../Common/AddInvitiationForm";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../AuthContext";
import { useEffect, useState } from "react";
import { API_BASE } from "../../../main";
import { authFetch } from "../../../util";

const Manager = () => {
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

  return (
    <div className="grid grid-2x2first1x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Students</h2>
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
          <h2>Show invites to evaluations</h2>
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
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <Popup
              trigger={<button className="button">Add Invitation</button>}
              modal
            >
              <AddInvitationForm traineeList={traineeList} />
            </Popup>
          </div>
          <div>
            <span>List with awaiting response</span>
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

export default Manager;
