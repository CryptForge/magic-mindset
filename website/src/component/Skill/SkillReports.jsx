import { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";
import SkillReport from "./SkillReport";

const SkillReports = (props) => {
  const auth = useAuthContext();
  const [skillReports, setSkillReports] = useState([]);

  useEffect(() => {
    authFetch(
      `${API_BASE}/report/all/skill/${props.skillId}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkillReports(data));
  }, []);

  return (
    <div className="popup-container">
      <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
        {skillReports.map((skillReport, index) => {
          return (
            <SkillReport skillReport={skillReport} key={index} index={index} />
          );
        })}
      </ul>
    </div>
  );
};

export default SkillReports;
