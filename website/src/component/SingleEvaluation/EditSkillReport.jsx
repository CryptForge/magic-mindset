import Popup from "reactjs-popup";
import ConformationDeleteSkillReport from "./ConformationDeleteSkillReport";

const EditSkillReport = () => {
  return (
    <div className="popup-container flex flex-column">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div className="width-full">INPUT FOR EDIT SKILLREPORT PROGRESS</div>
      <div>
        <button className="button">Save</button>
        <Popup
          modal
          nested
          trigger={<button className="button button-red">Delete</button>}
        >
          <ConformationDeleteSkillReport />
        </Popup>
      </div>
    </div>
  );
};

export default EditSkillReport;
