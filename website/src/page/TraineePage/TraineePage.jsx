import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListedTrainee from "../../component/TraineePage/ListedTrainee";
import SearchInput, { createFilter } from "react-search-input";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import "./TraineePage.css";

const TraineePage = (props) => {
  const auth = useAuthContext();
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      if (auth.getUser().role === "HR") {
        const request = await fetch(`${API_BASE}/trainee/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getUser().token}`,
          },
        });
        const data = await request.json();
        setTrainees(data);
      } else {
        const request = await fetch(
          `${API_BASE}/trainee/all/${auth.getUser().role.toLowerCase()}/${
            auth.getUser().id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.getUser().token}`,
            },
          }
        );
        const data = await request.json();
        setTrainees(data);
      }
    }

    fetchAllUsers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const KEYS_TO_FILTERS = ["username"];

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
