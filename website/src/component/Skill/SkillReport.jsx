const SkillReport = (props) => {
  return (
    <li>
      <div>
        Report: {props.index + 1} - {props.skillReport.progress}%
      </div>
    </li>
  );
};

export default SkillReport;
