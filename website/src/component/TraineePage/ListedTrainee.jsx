import React from "react";
import { Link } from "react-router-dom";
import "./ListedTrainee.css";
import Protected from "../Protected";

const ListedTrainee = (props) => {
  return (
    <div className="trainee-page-flex alternate-background">
      <p>{props.name}</p>
      <div className="flex trainee-list-buttons">
        <Link to={`/trainee/${props.id}`}>
          <button className="button trainee-button">Manage Trainee</button>
        </Link>
        <Protected role="COACH|MANAGER">
          <button className="button trainee-button">Invite Trainee</button>
        </Protected>
      </div>
    </div>
  );
};

export default ListedTrainee;
