import { useAuthContext } from "../../../AuthContext";
import { authPostForm } from "../../../util";
import { API_BASE } from "../../../main";

const AddTraineeInvitationForm = () => {
  const auth = useAuthContext();

  return (
    <div>
      <form
        className="flex flex-column white-element"
        onSubmit={(event) =>
          authPostForm(event, `${API_BASE}/evaluation`, auth.getUser().token)
        }
      >
        <label htmlFor="date">Date</label>
        <input type="datetime-local" id="date" name="date" required></input>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location"></input>
        <input type="submit" value="Contact Coach!"></input>
      </form>
    </div>
  );
};
export default AddTraineeInvitationForm;
