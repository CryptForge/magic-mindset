import React from "react";
import Popup from "reactjs-popup";
import "./StudentDropdown.css";

const StudentDropdown = () => {
  return (
    <div>
      <Popup trigger={<button>Select Student</button>}>
        <div className="studentlist">
          <div className="student">A student</div>
          <div className="student">Another student</div>
        </div>
      </Popup>
    </div>
  );
};
export default StudentDropdown;
