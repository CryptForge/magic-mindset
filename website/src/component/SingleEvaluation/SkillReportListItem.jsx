import Popup from "reactjs-popup";
import Protected from "../Protected";
import EditSkillReport from "./EditSkillReport";

const SkillReportListItem = (props) => {
  return (
    <li className="divider min-width-0">
      <div>
        {props.skillReport.skill} - {props.skillReport.percentage}%
      </div>
      <Protected role="COACH|MANAGER">
        <Popup modal nested trigger={<button className="button">Edit</button>}>
          <EditSkillReport />
        </Popup>
      </Protected>
    </li>
  );
};

export default SkillReportListItem;
