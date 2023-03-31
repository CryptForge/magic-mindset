import Popup from "reactjs-popup";
import Protected from "../Protected";
import AddSkillReport from "./AddSkillReport";
import SkillReportListItem from "./SkillReportListItem";

const SkillReportList = () => {
  const skillReports = [
    {
      skillId: 1,
      skill: "Woodworking",
      percentage: 100,
    },
    {
      skillId: 2,
      skill: "Woodworking 2",
      percentage: 99,
    },
    {
      skillId: 3,
      skill: "Woodworking 3",
      percentage: 67,
    },
  ];

  return (
    <div className="grid-element element box1">
      <div className="min-width-0">
        <h2>All Skill Reports</h2>
        <ul className="alternating-ul flex flex-column padding-bottom-alternating-ul">
          {skillReports.map((skillReport, index) => (
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
            <AddSkillReport />
          </Popup>
        </Protected>
      </div>
    </div>
  );
};

export default SkillReportList;
