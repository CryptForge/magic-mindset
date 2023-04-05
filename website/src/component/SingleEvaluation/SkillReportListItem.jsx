import { useEffect, useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import { authFetch } from "../../util";

const SkillReportListItem = (props) => {
  const auth = useAuthContext();
  const [skill, setSkill] = useState({});

  useEffect(() => {
    authFetch(
      `${API_BASE}/skill/${props.skillReport.skillId}`,
      auth.getUser().token
    )
      .then((response) => response.json())
      .then((data) => setSkill(data));
  }, []);
  return (
    <li className="divider min-width-0">
      <div>
        {skill.name} - {props.skillReport.progress}%
      </div>
    </li>
  );
};

export default SkillReportListItem;
