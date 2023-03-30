import { NavLink } from "react-router-dom";

const SkillReportViewer = (props) => {
  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td className="large-text padding-th">Skill:</td>
              <td>
                <NavLink to="FAKELINK">SKILLNAME</NavLink>
              </td>
            </tr>
            <tr>
              <td className="large-text">Progress:</td>
              <td>{99.99 + "%"}</td>
            </tr>
            <tr>
              <td className="large-text">Date:</td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillReportViewer;
