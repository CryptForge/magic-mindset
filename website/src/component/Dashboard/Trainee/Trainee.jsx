import React from "react";
import DashboardInvitation from "../Common/DashboardInvitation";
import Popup from "reactjs-popup";
import AddTraineeInvitationForm from "./AddTraineeInvitationForm";
import DashboardCourse from "./DashboardCourse";
import DashboardSkill from "./DashboardSkill";
import { useState, useEffect } from "react";
import { authFetch } from "../../../util";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import SearchInput, { createFilter } from "react-search-input";
import DashboardEvaluationList from "../Common/DashboardEvaluationList";
import { Link } from "react-router-dom";

const User = () => {
  const auth = useAuthContext();
  const [skillList, setSkillList] = useState([]);
  const [coachId, setCoachId] = useState(-1);
  const [evaluations, setEvaluations] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const [refreshInvitations, setRefreshInvitations] = useState(true);

  const [searchTermReports, setSearchTermReports] = useState("");

  useEffect(() => {
    authFetch(
      `${API_BASE}/skill/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkillList(data));
    authFetch(
      `${API_BASE}/evaluation/all/trainee/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) =>
        setEvaluations(
          data.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        )
      );
    authFetch(`${API_BASE}/trainee/${auth.getUser().id}`, auth.getUser().token)
      .then((response) => response.json())
      .then((data) => setCoachId(data.coach));
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

  const KEYS_TO_FILTERS_REPORTS = ["evaluatorName", "location"];

  const filteredListEvaluation = evaluations.filter(
    createFilter(searchTermReports, KEYS_TO_FILTERS_REPORTS)
  );

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Skills</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {skillList.length > 0 ? (
              skillList.map((skill, index) => (
                <DashboardSkill name={skill.name} key={index} />
              ))
            ) : (
              <div>No current skills</div>
            )}
          </ul>
        </div>
      </div>
      <div className="grid-element element box2">
        <div>
          {coachId >= 0 ? (
            <div>
              <h2>Plan Meeting</h2>
              <div>
                <Popup
                  trigger={<button className="button">Add Invitation</button>}
                  modal
                >
                  <AddTraineeInvitationForm coachId={coachId} />
                </Popup>
              </div>
            </div>
          ) : (
            <div>
              <h2>No Coach yet</h2>
            </div>
          )}
          <div className="margin-top">
            <Link to="/evaluation" className="button">
              View Evaluations
            </Link>
          </div>
        </div>
      </div>
      <div className="grid-element element box3">
        <div>
          <h2>List of All Passed Evaluations</h2>
          <SearchInput
            className="search-input"
            onChange={(value) => setSearchTermReports(value)}
          />
          <table>
            <thead>
              <tr>
                <th className="padding-th">Number</th>
                <th className="padding-th">Date</th>
                <th>Participator</th>
                <th>View Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {filteredListEvaluation.map((evaluation, index) => (
                <DashboardEvaluationList
                  evaluation={evaluation}
                  index={index}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid-element element box4">
        <div>
          <h2>Evaluation Invitations</h2>
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
    </div>
  );
};

export default User;
