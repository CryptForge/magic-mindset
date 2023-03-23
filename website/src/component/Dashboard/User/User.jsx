import React from "react";
import AddInvitationForm from "../AddInvitation/AddInvitiationForm";
import DashboardInvitation from "../DashboardInvitation";
import Popup from "reactjs-popup";
import AddTraineeInvitationForm from "./AddTraineeInvitationForm";
import DashboardCourse from "./DashboardCourse";
import DashboardSkill from "./DashboardSkill";
import ReportList from "../../ReportList";
const User = (props) => {
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
  const skillArray = [
    {
      name: "Woodcutting",
    },
    {
      name: "Planning",
    },
    {
      name: "Astral Projection",
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
        <div>
          <h2>Skills</h2>
          <ul>
            {skillArray.map((skill, index) => (
              <DashboardSkill name={skill.name} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box2">
        <div>
          <h2>Plan Meeting</h2>
          <div>
            <Popup trigger={<button>Add Invitation</button>} modal>
              <AddTraineeInvitationForm />
            </Popup>
          </div>
          <div>
            <span>List with awaiting response</span>
          </div>
          <ul>
            {inviteArray.map((invitation, index) => (
              <DashboardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid-element element box3">
        <div>
          <h2>Rapports</h2>
          <ul>
            {reportArray.map((report, index) => (
              <ReportList name={report.name} message={report.message} />
            ))}
          </ul>
          <div>BUTTON TO CREATE RAPPORT (POPUP)</div>
        </div>
      </div>
      <div className="grid-element element box4">
        <div>
          <h2>Training courses and certifications</h2>
          <ul>
            {courseArray.map((course, index) => (
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
