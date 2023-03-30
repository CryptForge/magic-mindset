import React from "react";
import DashboardInvitation from "../Common/DashboardInvitation";
import Popup from "reactjs-popup";
import AddTraineeInvitationForm from "./AddTraineeInvitationForm";
import DashboardCourse from "./DashboardCourse";
import DashboardSkill from "./DashboardSkill";
import ReportList from "../../Report/ReportList";
import CreateReport from "../Popup/CreateReport";
import { useState, useEffect } from "react";
import { authFetch } from "../../../util";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import SearchInput, { createFilter } from "react-search-input";

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
      .then((data) => setCoachId(data.coach.id));
  }, []);

  const reportArray = [
    {
      name: "report1",
      message: "haha",
      date: "2011-10-10",
    },
    {
      name: "report2",
      message: "hihi",
      date: "2018-10-10",
    },
    {
      name: "report3",
      message: "hoho",
      date: "2016-10-10",
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

  const filteredListReports = reportArray.filter(
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
          <h2>List of All Reports</h2>
          <SearchInput
            className="search-input"
            onChange={(value) => setSearchTermReports(value)}
          />
          <table>
            <thead>
              <tr>
                <th className="padding-th">Name</th>
                <th className="padding-th">Date</th>
                <th>View Skill-reports</th>
                <th>View Evaluation</th>
                <th>View Content</th>
              </tr>
            </thead>
            <tbody>
              {filteredListReports.map((report, index) => (
                <ReportList
                  name={report.name}
                  message={report.message}
                  key={index}
                />
              ))}
            </tbody>
          </table>
          <Popup
            modal
            trigger={<button className="button">Create report</button>}
          >
            <CreateReport />
          </Popup>
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
