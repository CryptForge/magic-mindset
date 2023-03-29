import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";
import { authPostForm } from "../../../util";

const AddInvitationForm = (props) => {
  const auth = useAuthContext();
  return (
    <form
      className="flex flex-column white-element"
      onSubmit={(event) =>
        authPostForm(event, `${API_BASE}/evaluation`, auth.getUser().token)
      }
    >
      <label htmlFor="trainee">Trainees</label>
      <select id="trainee" name="trainee">
        {props.traineeList.map((trainee, index) => (
          <option key={index} value={trainee.id}>
            {trainee.username}
          </option>
        ))}
      </select>
      <label htmlFor="date">Date</label>
      <input type="datetime-local" id="date"></input>
      <label htmlFor="location">Location</label>
      <input type="text" id="location"></input>
      <input type="submit" value="invite!" />
    </form>
  );
};
export default AddInvitationForm;
