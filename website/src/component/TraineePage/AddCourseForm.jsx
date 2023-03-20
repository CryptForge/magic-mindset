import react from "react";
import { postForm } from "../../util";
import { API_BASE } from "../../main";

const AddCourseForm = () => {
  return (
    <div className="whiteelement">
      <form
        className="flex column"
        onSubmit={(event) => {
          postForm(event, `${API_BASE}/course/create`);
        }}
      >
        <label htmlFor="help">help</label>
        <input name="help"></input>
        <label htmlFor="text">vul dingen hier in</label>
        <input type="text" required />
        <input type="submit" required />
      </form>
    </div>
  );
};

export default AddCourseForm;
