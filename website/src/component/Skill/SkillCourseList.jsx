import Popup from "reactjs-popup";
import FileViewer from "../Dashboard/Popup/FileViewer";

const SkillCourseList = (props) => {
  return (
    <tr className="text">
      <td>{props.name}</td>
      <td className="skill-course-list-padding">{props.progress}</td>
      <td>
        <Popup
          modal
          trigger={
            <td className="skill-course-list-padding">
              <div className="flex center">
                <button className="button">View Certification</button>
              </div>
            </td>
          }
        >
          <FileViewer fileId={0} />
        </Popup>
      </td>
    </tr>
  );
};

export default SkillCourseList;
