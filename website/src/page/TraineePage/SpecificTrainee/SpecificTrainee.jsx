import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SpecificTrainee = () => {
  const { traineeId } = useParams();

  return (
    <div>
      <h1>{traineeId}</h1>
      <Link to="/traineepage">
        <button>Back to Traineepage!</button>
      </Link>
    </div>
  );
};

export default SpecificTrainee;
