import { useState } from "react";
import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";

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
      <button className="button button-red" onClick={deleteCourse}>
        Delete
      </button>
    </div>
  );
};

export default EditCourse;
