import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddUserForm from "./AddUserForm";
import DashboardTraineeList from "../common/DashboardTraineeList";
import DashboardUserList from "./DashboardUserList";
import ReportList from "../../Report/ReportList";
import PendingChange from "./PendingChange";
import { Link } from "react-router-dom";
import SearchInput, { createFilter } from "react-search-input";
import { API_BASE } from "../../../main";
import AuthContext from "../../../AuthContext";

const HR = () => {
  const auth = useContext(AuthContext);

  const [pendingChanges, setPendingChanges] = useState([]);
  const [recallPendingRequests, setRecallPendingRequests] = useState(true);

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
      date: new Date("2011-10-10"),
    },
    {
      name: "report2",
      message: "hihi",
      date: new Date("2018-10-10"),
    },
    {
      name: "report3",
      message: "hoho",
      date: new Date("2016-10-10"),
    },
  ];

  useEffect(() => {
    async function fetchPendingRequests() {
      const request = await fetch(`${API_BASE}/changes/get/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      setPendingChanges(data);
    }
    if (recallPendingRequests) {
      setRecallPendingRequests(false);
      fetchPendingRequests();
    }
  }, [recallPendingRequests]);

  reportArray.sort((a, b) => a.date.getTime() - b.date.getTime());

  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [searchTermReports, setSearchTermReports] = useState("");

  const KEYS_TO_FILTERS_USERS = ["name"];
  const KEYS_TO_FILTERS_REPORTS = ["name"];

  const filteredListUsers = userArray.filter(
    createFilter(searchTermUsers, KEYS_TO_FILTERS_USERS)
  );
  const filteredListReports = reportArray.filter(
    createFilter(searchTermReports, KEYS_TO_FILTERS_REPORTS)
  );

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Trainees</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {traineeArray.map((trainee, index) => (
              <DashboardTraineeList
                key={index}
                name={trainee.name}
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
          <div className="flex flex-row space-between align-center">
            <h2>List with current users</h2>
            <Popup
              trigger={
                <button className="button button-100">Add a new user</button>
              }
              modal
            >
              <AddUserForm />
            </Popup>
          </div>
          <ul className="alternating-ul flex flex-column">
            <SearchInput
              className="search-input"
              onChange={(value) => setSearchTermUsers(value)}
            />
            {filteredListUsers.map((user, index) => (
              <DashboardUserList
                name={user.name}
                role={user.role}
                key={index}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="grid-element element box3">
        <div className="min-width-0">
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
                  key={index}
                  name={report.name}
                  message={report.message}
                  date={report.date.toLocaleDateString()}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-element element box4">
        <div>
          <h2>Current changes to accounts</h2>
          <span>List with all requests</span>
          <ul className="alternating-ul flex flex-column">
            {pendingChanges.length > 0
              ? pendingChanges.map((change, index) => (
                  <PendingChange
                    value={change}
                    key={index}
                    changeValues={setRecallPendingRequests}
                  />
                ))
              : "No current changes"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HR;
