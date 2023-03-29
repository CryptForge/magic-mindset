import { useState } from "react";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";
import DeleteCourseConformation from "./DeleteCourseConformation";

const EditCourse = (props) => {
  const auth = useAuthContext();

  const [localFile, setLocalFile] = useState(undefined);
  const [name, setName] = useState(props.course.name);
  const [progress, setProgress] = useState(props.course.progress);

  const saveCourse = async () => {
    if (localFile != undefined) {
      const formData = new FormData();
      formData.append("id", props.course.id);
      formData.append("file", localFile);
      await fetch(`${API_BASE}/course/edit/certification`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.getUser().token}`,
        },
        body: formData,
      });
    }

    if (progress < 0 || progress > 100) {
      toast.error("Your progress is too high, it should be between 0 and 100");
    } else {
      await fetch(`${API_BASE}/course/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.getUser().token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.course.id,
          name: name,
          progress: progress,
        }),
      });
    }
    toast.success("Saved the course!");
    props.setReloadCourses(true);
    props.open(false);
  };

  const deleteCourse = () => {};

  return (
    <div className="popup-container">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="progress">Progress</label>
        <input
          id="progress"
          value={progress}
          type="number"
          onChange={(event) => {
            setProgress(event.target.value);
          }}
        ></input>
      </div>
      <div>
        <label htmlFor="file">Certification</label>
        <input
          type="file"
          id="file"
          onChange={(event) => {
            setLocalFile(event.target.files[0]);
          }}
          accept="application/pdf"
        />
      </div>
      <button className="button" onClick={saveCourse}>
        Save
      </button>
      <Popup
        modal
        nested
        trigger={
          <button className="button button-red" onClick={deleteCourse}>
            Delete
          </button>
        }
      >
        <DeleteCourseConformation
          id={props.course.id}
          setReloadCourses={props.setReloadCourses}
        />
      </Popup>
    </div>
  );
};

export default EditCourse;
