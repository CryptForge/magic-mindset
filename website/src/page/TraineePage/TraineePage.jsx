import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListedTrainee from "../../component/TraineePage/ListedTrainee";
import SearchInput, { createFilter } from "react-search-input";
import AuthContext, { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import "./TraineePage.css";

const TraineePage = (props) => {
  const auth = useAuthContext();
  const [traineeList, setTraineeList] = useState([]);

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

  const courseArray = [
    {
      name: "course1",
    },
    {
      name: "course2",
    },
    {
      name: "course3",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");

  const KEYS_TO_FILTERS = ["username"];

  const filteredList = traineeList.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS)
  );

  return (
    <div className="flex center align-center trainee-page-margin">
      <div className="flex flex-column element">
        <h2>Full list of students.</h2>
        <div className="flex flex-column space-around">
          <SearchInput
            className="search-input"
            onChange={(value) => setSearchTerm(value)}
          />
          {filteredList.map((trainee, index) => (
            <ListedTrainee
              key={index}
              name={trainee.username}
              id={trainee.id}
            />
          ))}
        </div>
        <div className="flex space-around button-list">
          <Link to="/dashboard">
            <button className="button">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TraineePage;
