import { useAuthContext } from "../../AuthContext";
import { API_BASE } from "../../main";

const DeleteCourseConformation = (props) => {
  const auth = useAuthContext();

  const deleteCourse = async () => {
    await fetch(`${API_BASE}/course/${props.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.getUser().token}`,
      },
    });
    props.setReloadCourses(true);
  };

  return (
    <div className="popup-container">
      <button className="button button-red" onClick={deleteCourse}>
        Click here to delete, click outside the box to return
      </button>
    </div>
  );
};

export default DeleteCourseConformation;
