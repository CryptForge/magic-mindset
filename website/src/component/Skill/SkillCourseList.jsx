import { useState } from "react";
import Popup from "reactjs-popup";
import FileViewer from "../Dashboard/Popup/FileViewer";
import Protected from "../Protected";
import EditCourse from "./EditCourse";

const SkillCourseList = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <tr className="text">
      <td>{props.course.name}</td>
      <td className="skill-course-list-padding">{props.course.progress}</td>
      <td>
        {props.course.certificationFileName !== null ? (
          <Popup
            modal
            trigger={
              <div className="skill-course-list-padding">
                <div className="flex center">
                  <button className="button">View Certification</button>
                </div>
              </div>
            }
          >
            <FileViewer courseId={props.course.id} />
          </Popup>
        ) : (
          <div>No Certification</div>
        )}
      </td>
      <Protected role="COACH|MANAGER">
        <td>
          <Popup
            open={open}
            closeOnDocumentClick
            onClose={() => {
              setOpen(false);
            }}
            nested
            modal
            trigger={
              <div className="skill-course-list-padding">
                <div className="flex center">
                  <button className="button">Edit Course</button>
                </div>
              </div>
            }
          >
            <EditCourse
              course={props.course}
              setReloadCourses={props.setReloadCourses}
              open={setOpen}
            />
          </Popup>
        </td>
      </Protected>
    </tr>
  );
};

export default SkillCourseList;
