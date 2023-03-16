import React from "react";
import Popup from "reactjs-popup";
import Student from "../Student/DropDownStudent";
import "./StudentDropdown.css";

const StudentDropdown = (props) => {
  return (
    <div>
      <Popup trigger={<button>Select Student</button>}>
        <div className="studentlist">
          {props.studentList.map((students, index) => (
            <Student key={index} name={students.name} />
          ))}
        </div>
      </Popup>
    </div>
  );
};
export default StudentDropdown;
