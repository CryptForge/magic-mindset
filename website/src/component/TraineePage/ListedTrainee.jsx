import React from "react";
import { Link } from "react-router-dom";
import "./ListedTrainee.css";
import Protected from "../Protected";

const ListedTrainee = (props) => {
  return (
    <div className="flex listedelement">
      <p>{props.name}</p>
      <div className="flex traineelistbuttons">
        <button>Manage Trainee</button>
        <Protected role="COACH|MANAGER">
          <button>Invite Trainee</button>
        </Protected>
      </div>
    </div>
  );
};

export default ListedTrainee;
