import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import AddUserForm from "../Common/AddUserForm";
import DashboardTraineeList from "../Common/DashboardTraineeList";
import DashboardUserList from "./DashboardUserList";
import PendingChange from "./PendingChange";
import { Link } from "react-router-dom";
import SearchInput, { createFilter } from "react-search-input";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";
import { authFetch } from "../../../util";
import DashboardEvaluationList from "../Common/DashboardEvaluationList";

const HR = () => {
  const auth = useAuthContext();

  const [pendingChanges, setPendingChanges] = useState([]);
  const [users, setUsers] = useState([]);
  const [recallPendingRequests, setRecallPendingRequests] = useState(true);
  const [recallUsers, setRecallUsers] = useState(true);

  const [trainees, setTrainees] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  const [openAddUserForm, setOpenAddUserForm] = useState(false);
  const closeAddUserForm = () => setOpenAddUserForm(false);

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

  useEffect(() => {
    authFetch(`${API_BASE}/evaluation/all`, auth.getUser().token)
      .then((response) => response.json())
      .then((data) =>
        setEvaluations(data.filter((a) => a.date < new Date().getTime()))
      );
  }, []);

  useEffect(() => {
    async function fetchAllUsers() {
      const request = await fetch(`${API_BASE}/user/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      setUsers(data);
      authFetch(`${API_BASE}/trainee/all`, auth.getUser().token)
        .then((response) => response.json())
        .then((data) => setTrainees(data));
      if (trainees.lenth > 3) {
        setTrainees(trainees.slice(0, 3));
      }
    }
    if (recallUsers) {
      setRecallUsers(false);
      fetchAllUsers();
    }
  }, [recallUsers]);

  reportArray.sort((a, b) => a.date.getTime() - b.date.getTime());

  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [searchTermReports, setSearchTermReports] = useState("");

  const KEYS_TO_FILTERS_USERS = ["name"];
  const KEYS_TO_FILTERS_REPORTS = ["name"];

  const filteredListUsers = users.filter(
    createFilter(searchTermUsers, KEYS_TO_FILTERS_USERS)
  );
  const filteredListEvaluation = evaluations.filter(
    createFilter(searchTermReports, KEYS_TO_FILTERS_REPORTS)
  );

  return (
    <div className="grid grid-2x2">
      <div className="grid-element element box1">
        <div className="min-width-0">
          <h2>Trainees</h2>
          <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
            {trainees.map((trainee, index) => (
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
        <div className="min-width-0 overflow-hidden max-height-fit flex flex-column">
          <div className="flex flex-row space-between align-center">
            <h2>List with current users</h2>
            <Popup
              trigger={
                <button className="button button-100">Add a new user</button>
              }
              modal
              open={openAddUserForm}
              closeOnDocumentClick
              onClose={closeAddUserForm}
            >
              <AddUserForm
                changeValues={setRecallUsers}
                callClose={closeAddUserForm}
              />
            </Popup>
          </div>
          <SearchInput
            className="search-input"
            onChange={(value) => setSearchTermUsers(value)}
          />
          <ul className="alternating-ul flex flex-column scroll-size">
            {filteredListUsers.map((user, index) => (
              <DashboardUserList user={user} key={index} />
            ))}
          </ul>
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
