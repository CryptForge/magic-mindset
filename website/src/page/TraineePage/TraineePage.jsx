import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Protected from "../../component/Protected";
import ListedTrainee from "../../component/TraineePage/ListedTrainee";

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
    { name: "Rebecca", id: 2 },
  ];

  return (
    <div className="flex column element traineelist">
      <h2>Full list of students.</h2>
      <div className="flex column spacearound">
        {traineeArray.map((trainee, index) => (
          <ListedTrainee key={index} name={trainee.name} id={trainee.id} />
        ))}
      </div>
      <div className="flex spacearound buttonlist">
        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default TraineePage;
