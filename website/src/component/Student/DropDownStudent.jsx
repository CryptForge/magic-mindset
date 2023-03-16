import React from "react";
import "./DropDownStudent.css";

const Student = (props) => {
  return (
    <button className="student" onClick={props.handleSelect}>
      {props.name}
    </button>
  );
};

export default Student;
