import { useState } from "react";
import { useAuthContext } from "../../../AuthContext";
import { API_BASE } from "../../../main";
import { authFetch } from "../../../util";

const AddSkill = (props) => {
  const auth = useAuthContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isHardSkill, setHardSkill] = useState(false);

  return (
    <div className="popup-container">
      <div className="float-right small-text">
        Click somewhere else to close
      </div>
      <div>
        <form
          className="flex flex-column white-element"
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("traineeId", props.id);
            const request = Object.fromEntries(formData);
            event.currentTarget.reset();

            await authFetch(
              `${API_BASE}/skill/create`,
              auth.getUser().token,
              JSON.stringify(request),
              "POST"
            );

            props.setRecallValues(true);
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description of Skill"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div>
            <label htmlFor="type">Is it a Hard Skill</label>
            <input
              type="checkbox"
              id="type"
              name="type"
              value={isHardSkill}
              onChange={(event) => setHardSkill(event.target.value)}
            ></input>
          </div>
          <input type="submit" value="Add Skill" className="button"></input>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
