import react from "react";
import { useAuthContext } from "../../../AuthContext";
import { authPostForm } from "../../../util";
import { API_BASE } from "../../../main";

const AddTraineeInvitationForm = (props) => {
  const auth = useAuthContext();

  return (
    <div>
      <form
        className="flex column white-element"
        onSubmit={(event) =>
          authPostForm(
            event,
            `${API_BASE}/invitation/create`,
            auth.getUser().token
          )
        }
      >
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required></input>
        <label htmlFor="message">Optional Message</label>
        <input type="text" id="message" name="message"></input>
        <input type="submit" value="Contact Coach!"></input>
      </form>
    </div>
  );
};
export default AddTraineeInvitationForm;
