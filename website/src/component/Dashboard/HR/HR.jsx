import React from "react";
import Popup from "reactjs-popup";
import AddUserForm from "../AddUserForm/AddUserForm";
import DashBoardTraineeList from "../DashboardTraineeList";
import DashboardUserList from "./DashboardUserList";
import ReportList from "../../ReportList";
import PendingChange from "./PendingChange";

const HR = () => {
  const pendingChangesArray = [
    { name: "change1" },
    { name: "change2" },
    { name: "change3" },
  ];
  const traineeArray = [
    {
      name: "Victor",
      id: 0,
    },
    {
      name: "Tijs",
      id: 1,
    },
    {
      name: "Rebecca",
      id: 2,
    },
  ];
  const userArray = [
    {
      name: "HR",
      role: "HR",
    },
    {
      name: "Coach",
      role: "COACH",
    },
    {
      name: "Manager",
      role: "MANAGER",
    },
    {
      name: "Trainee",
      role: "TRAINEE",
    },
  ];
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
  return (
    <div className="grid grid2x2">
      <div className="gridelement element box1">
        <div>
          <h2>Students</h2>
          <ul>
            {traineeArray.map((trainee, index) => (
              <DashBoardTraineeList
                key={index}
                name={trainee.name}
                id={trainee.id}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="gridelement element box2 pointer">
        <div>
          <Popup trigger={<button>Add a new user.</button>} modal>
            <AddUserForm />
          </Popup>
          <span>List with current users</span>
          <ul>
            {userArray.map((user, index) => (
              <DashboardUserList
                name={user.name}
                role={user.role}
                key={index}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="gridelement element box3">
        <h2>List of All Reports</h2>
        <ul>
          {reportArray.map((report, index) => (
            <ReportList name={report.name} message={report.message} />
          ))}
          <span>Progress reports sorted by most recent</span>
        </ul>
      </div>
      <div className="gridelement element box4">
        <div>
          <h2>Current changes to accounts</h2>
          <span>List with all requests</span>
          <ul>
            {pendingChangesArray.map((change, index) => (
              <PendingChange name={change.name} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HR;
