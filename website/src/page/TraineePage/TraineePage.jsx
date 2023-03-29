import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListedTrainee from "../../component/TraineePage/ListedTrainee";
import SearchInput, { createFilter } from "react-search-input";
import AuthContext, { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import "./TraineePage.css";
import { API_BASE } from "../../main";
import { useAuthContext } from "../../AuthContext";

const TraineePage = (props) => {
  const auth = useAuthContext();
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      const request = await fetch(`${API_BASE}/user/get/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      const trainees = data.filter((a) => a.user.role === "TRAINEE");
      console.log(trainees);
      setTrainees(trainees);
    }

    fetchAllUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const KEYS_TO_FILTERS = ["name", "user.email"];

  const filteredList = trainees.filter(
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
