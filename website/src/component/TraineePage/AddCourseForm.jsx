import { postFormCustomValues } from "../../util";
import { API_BASE } from "../../main";
import { useAuthContext } from "../../AuthContext";

const AddCourseForm = (props) => {
  const auth = useAuthContext();
  return (
    <div className="white-element text">
      <form
        className="flex flex-column"
        onSubmit={async (event) => {
          const value = {
            name: event.target.name.value,
            skill: props.skillId,
          };
          await postFormCustomValues(
            event,
            value,
            `${API_BASE}/course/create`,
            auth.getUser().token
          );
          event.preventDefault();
          props.setReloadCourses(true);
          props.setOpen(false);
        }}
      >
        <label htmlFor="name" required>
          Name
        </label>
        <input name="name" type="text"></input>
        <input type="submit" required />
      </form>
    </div>
  );
};

export default AddCourseForm;
