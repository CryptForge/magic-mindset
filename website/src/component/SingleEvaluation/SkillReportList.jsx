import Popup from "reactjs-popup";
import { useAuthContext } from "../../AuthContext";
import Protected from "../Protected";
import AddSkillReport from "./AddSkillReport";
import SkillReportListItem from "./SkillReportListItem";

const SkillReportList = (props) => {
  return (
    <div className="grid-element element box1">
      <div className="min-width-0">
        <h2>All Skill Reports</h2>
        <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
          {props.skillReports.map((skillReport, index) => (
            <SkillReportListItem
              skillReport={skillReport}
              index={index}
              key={index}
            />
          ))}
        </ul>
        <Protected role="COACH|MANAGER">
          <Popup
            modal
            trigger={<button className="button">Add Skill Report</button>}
          >
            <AddSkillReport
              traineeId={props.traineeId}
              refreshEvaluation={props.refreshEvaluation}
              evaluationId={props.evaluationId}
            />
          </Popup>
        </Protected>
      </div>
    </div>
  );
};

export default SkillReportList;
