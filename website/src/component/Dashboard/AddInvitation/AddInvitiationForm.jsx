import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";
import { authPostForm } from "../../../util";

const AddInvitationForm = (props) => {
  const auth = useAuthContext();
  return (
    <form
      className="flex column whiteelement"
      onSubmit={(event) =>
        authPostForm(
          event,
          `${API_BASE}/invitation/create`,
          auth.getUser().token
        )
      }
    >
      <label htmlFor="trainee">Trainees</label>
      <select id="trainee" name="trainee">
        {props.traineeArray.map((trainee, index) => (
          <option value={trainee.id}>{trainee.name}</option>
        ))}
      </select>
      <label htmlFor="date">Date</label>
      <input type="date" id="date"></input>
      <input type="submit" value="invite!" />
    </form>
  );
};
export default AddInvitationForm;
