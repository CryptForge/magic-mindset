import React from "react";
import Popup from "reactjs-popup";
import "./Skill.css";

const Skill = (props) => {
  return (
    <div className="flex skillflex">
      <p>name</p>
      <p>status</p>
      <Popup trigger={<button>popup button</button>} modal>
        <div className="popup">test popup</div>
      </Popup>
    </div>
  );
};

export default Skill;
