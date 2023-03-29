import Popup from "reactjs-popup";
import EvaluationViewer from "../Dashboard/Popup/EvaluationViewer";
import SkillReportViewer from "../Skill/SkillReportViewer";

const ReportList = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.date}</td>
      <Popup
        modal
        trigger={
          <td>
            <div className="flex center">
              <button className="button">View Skill Report</button>
            </div>
          </td>
        }
      >
        <SkillReportViewer message={props.message} />
      </Popup>
      <Popup
        modal
        nested
        trigger={
          <td>
            <div className="flex center">
              <button className="button">View Content</button>
            </div>
          </td>
        }
      >
        <EvaluationViewer message={props.messsage} />
      </Popup>
    </tr>
  );
};

export default ReportList;
