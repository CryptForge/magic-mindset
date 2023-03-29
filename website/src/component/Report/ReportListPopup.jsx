import Popup from "reactjs-popup";
import EvaluationViewer from "../Dashboard/Popup/EvaluationViewer";
import FileViewer from "../Dashboard/Popup/FileViewer";
import SkillReportViewer from "../Skill/SkillReportViewer";

const ReportListPopup = (props) => {
  return (
    <div className="bg-whitesmoke text">
      <table>
        <tr>
          <td className="capitalize">{props.name}</td>
          <td>{props.date}</td>
          <Popup
            modal
            nested
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
      </table>
    </div>
  );
};

export default ReportListPopup;
