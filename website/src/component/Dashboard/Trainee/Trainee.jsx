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

const User = () => {
  const auth = useAuthContext();
  const [skillList, setSkillList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [coachId, setCoachId] = useState(-1);

  const [searchTermReports, setSearchTermReports] = useState("");

  useEffect(() => {
    authFetch(
      `${API_BASE}/skill/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkillList(data));
    
    authFetch(
      `${API_BASE}/course/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setCourseList(data));

    authFetch(`${API_BASE}/trainee/${auth.getUser().id}`, auth.getUser().token)
      .then((response) => response.json())
      .then((data) => setCoachId(data.coach));
  }, []);

  const evaluationArray = [
    {
      date: "2011-10-10",
      participator: "coachmans",
      id: "1",
    },
    {
      participator: "managermans",
      date: "2018-10-10",
      id: "2",
    },
    {
      participator: "coachmans",
      date: "2016-10-10",
      id: "3",
    },
  ];
  const inviteArray = [
    {
      date: new Date("1994-10-21"),
      answered: true,
    },
    {
      date: new Date("2006-07-06"),
      answered: true,
    },
    {
      date: new Date("2003-04-03"),
      answered: false,
    },
    {
      date: new Date("2016-05-16"),
      answered: true,
    },
    {
      date: new Date("2020-01-12"),
      answered: false,
    },
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const KEYS_TO_FILTERS_REPORTS = ["name"];

  const filteredListEvaluation = evaluationArray.filter(
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
          <div>
            <span>List with awaiting response</span>
          </div>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {inviteArray.map((invitation, index) => (
              <DashboardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
                mine={true}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box3">
        <div>
          <h2>List of All Evaluations</h2>
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
          <h2>Training courses and certifications</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {courseList.map((course, index) => (
              <DashboardCourse
                name={course.name}
                progress={course.progress}
                key={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
