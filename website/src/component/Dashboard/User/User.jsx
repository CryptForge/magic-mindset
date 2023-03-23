import React from "react";
import AddInvitationForm from "../AddInvitation/AddInvitiationForm";
import DashBoardInvitation from "../DashBoardInvitation";
import Popup from "reactjs-popup";
import AddTraineeInvitationForm from "./AddTraineeInvitationForm";
import DashBoardCourse from "./DashBoardCourse";
import DashboardSkill from "./DashboardSkill";
import ReportList from "../../ReportList";
const User = (props) => {
  const reportArray = [
    {
      name: "report1",
      message: "haha",
    },
    {
      name: "report2",
      message: "hihi",
    },
    {
      name: "report3",
      message: "hoho",
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
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <div>
          <h2>Skills</h2>
          <ul>
            {skillArray.map((skill, index) => (
              <DashboardSkill name={skill.name} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className="gridelement element box2">
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
              <DashBoardInvitation
                key={index}
                date={invitation.date.toLocaleDateString()}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="gridelement element box3">
        <div>
          <h2>Rapports</h2>
          <ul>
            {reportArray.map((report, index) => (
              <ReportList name={report.name} message={report.message} />
            ))}
            <span>Progress reports sorted by most recent</span>
          </ul>
          <div>BUTTON TO CREATE RAPPORT (POPUP)</div>
        </div>
      </div>
      <div className="gridelement element box4">
        <div>
          <h2>Training courses and certifications</h2>
          <ul>
            {courseArray.map((course, index) => (
              <DashBoardCourse
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
