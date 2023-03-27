import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Skill.css";
import AddCourseForm from "../TraineePage/AddCourseForm";
import Protected from "../Protected";
import SkillCourseList from "./SkillCourseList";
import ReportListPopup from "../Report/ReportListPopup";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";

const Skill = (props) => {
  const auth = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(true);
  const [openAddCourse, setOpenAddCourse] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const request = await fetch(`${API_BASE}/course/all/skill/${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getUser().token}`,
        },
      });
      const data = await request.json();
      setCourses(data);
    }
    if (reloadCourses) {
      setReloadCourses(false);
      fetchCourses();
    }
  }, [reloadCourses]);

  const reportArray = [
    {
      name: "report1",
      message: "haha",
    },
    {
      name: "report2",
      message: "hihi",
    },
    {
      name: "report3",
      message: "hoho",
    },
  ];
  return (
    <div>
      <div className="flex skill">
        <h3>{props.name}</h3>
        <div className="flex space-between button-spacing">
          <button
            className="button"
            onClick={() => props.toggleButton(props.index)}
          >
            Show Courses
          </button>
          <Protected role="COACH|MANAGER">
            <div className="flex space-between button-spacing">
              <Popup
                trigger={<button className="button">Add Course</button>}
                modal
                open={openAddCourse}
                onClose={() => setOpenAddCourse(false)}
                closeOnDocumentClick
              >
                <AddCourseForm
                  setOpen={setOpenAddCourse}
                  setReloadCourses={setReloadCourses}
                  skillId={props.id}
                />
              </Popup>
            </div>
          </Protected>
          <div className="flex space-between button-spacing">
            <Popup
              trigger={<button className="button">Show Reports</button>}
              modal
              nested
            >
              {reportArray.map((report, index) => (
                <ReportListPopup
                  name={report.name}
                  message={report.message}
                  key={index}
                />
              ))}
            </Popup>
          </div>
        </div>
      </div>
      <div
        id={props.index}
        className={props.activeSkill === props.index ? "" : "hidden"}
      >
        <div className="bg-whitesmoke skill-course-item">
          <table className="text">
            <thead>
              <tr>
                <th>Name</th>
                <th className="skill-course-list-padding">Progress</th>
                <th>Certification</th>
                <Protected role="COACH|MANAGER">
                  <th>Edit Course</th>
                </Protected>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <SkillCourseList
                  key={index}
                  course={course}
                  setReloadCourses={setReloadCourses}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Skill;
