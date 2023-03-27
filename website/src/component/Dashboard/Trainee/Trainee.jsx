import React from "react";
import DashboardInvitation from "../DashboardInvitation";
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

const User = () => {
  const auth = useAuthContext();
  const [skillList, setSkillList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    console.log(auth.getUser().id);
    authFetch(
      `${API_BASE}/skill/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkillList(data));
    console.log(skillList);
    authFetch(
      `${API_BASE}/course/all/user/${auth.getUser().id}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setCourseList(data));
    console.log(courseList);
  }, []);

  useEffect(() => {
    console.log(skillList);
  }, [skillList]);

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
  const courseArray = [
    {
      name: "course1",
      progress: 1,
    },
    {
      name: "course2",
      progress: 0.75,
    },
    {
      name: "course3",
      progress: 0,
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
  ];

  courseArray.sort((a, b) => a.progress - b.progress);

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Skills</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {skillList.map((skill, index) => (
              <DashboardSkill name={skill.name} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box2">
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <Popup
              trigger={<button className="button">Add Invitation</button>}
              modal
            >
              <AddTraineeInvitationForm />
            </Popup>
          </div>
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
          <h2>Report</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {reportArray.map((report, index) => (
              <ReportList name={report.name} message={report.message} />
            ))}
          </ul>
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
