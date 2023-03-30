import Popup from "reactjs-popup";
import EditSkillReport from "./EditSkillReport";

const SkillReportListItem = (props) => {
  return (
    <li className="divider min-width-0">
      <div>
        {props.skillReport.skill} - {props.skillReport.percentage}%
      </div>
      <Popup modal nested trigger={<button className="button">Edit</button>}>
        <EditSkillReport />
      </Popup>
    </li>
  );
};

export default SkillReportListItem;
