import Popup from "reactjs-popup";
import AddSkillReport from "./AddSkillReport";
import SkillReportListItem from "./SkillReportListItem";

const SkillReportList = () => {
  const skillReports = [
    {
      skill: 1,
      percentage: 100,
    },
    {
      skill: 2,
      percentage: 99,
    },
    {
      skill: 3,
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
        <Popup
          modal
          trigger={<button className="button">Add Skill Report</button>}
        >
          <AddSkillReport />
        </Popup>
      </div>
    </div>
  );
};

export default SkillReportList;
