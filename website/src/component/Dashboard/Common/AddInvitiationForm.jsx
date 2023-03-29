import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";
import { authFetch, authPostForm } from "../../../util";
import { useState } from "react";
import "react-select-search/style.css";

import SelectSearch from "react-select-search";
const AddInvitationForm = (props) => {
  const auth = useAuthContext();
  const [traineeId, setTraineeId] = useState(-1);

  const options = [];

  props.traineeList.forEach((value) =>
    options.push({ name: value.username, value: value.id })
  );

  return (
    <form
      className="flex flex-column white-element"
      onSubmit={async (event) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        formData.append("evaluatorId", auth.getUser().id);
        formData.append("traineeId", traineeId);
        const request = Object.fromEntries(formData);
        event.currentTarget.reset();

        await authFetch(
          `${API_BASE}/evaluation`,
          auth.getUser().token,
          JSON.stringify(request),
          "POST"
        );
        toast.success("Send invitation to Trainee");
      }}
    >
      <label htmlFor="traineeId" className="text">
        Trainees
      </label>
      <SelectSearch
        options={options}
        onChange={(value) => setTraineeId(value)}
        value={traineeId}
        name="traineeId"
        placeholder="Choose a trainee"
        search
      />
      <label htmlFor="date" className="text">
        Date
      </label>
      <input type="datetime-local" id="date" name="date"></input>
      <label htmlFor="location" className="text">
        Location
      </label>
      <input type="text" id="location" name="location"></input>
      <input type="submit" className="text" value="invite!" />
    </form>
  );
};
export default AddInvitationForm;
