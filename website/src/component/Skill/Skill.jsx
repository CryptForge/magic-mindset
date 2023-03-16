import React from "react";
import Popup from "reactjs-popup";
import "./Skill.css";

const Skill = (props) => {
  return (
    <div className="flex skill">
      <p>{props.name}</p>
      <p>{props.description}</p>
      <Popup
        trigger={<button className="skillbutton">See reports</button>}
        modal
      >
        <div className="popup">test popup</div>
      </Popup>
    </div>
  );
};

export default Skill;
