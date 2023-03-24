import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListedTrainee from "../../component/TraineePage/ListedTrainee";
import SearchInput, { createFilter } from "react-search-input";
import "./TraineePage.css";

const TraineePage = (props) => {
  let traineeArray = [
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
    {
      name: "Rob",
      id: 3,
    },
    {
      name: "Bob",
      id: 4,
    },
    {
      name: "David",
      id: 5,
    },
  ];
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

  const KEYS_TO_FILTERS = ["name"];

  const filteredList = traineeArray.filter(
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
            <ListedTrainee key={index} name={trainee.name} id={trainee.id} />
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
