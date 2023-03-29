import { useAuthContext } from "../../../AuthContext";
import { authFetch } from "../../../util";
import { API_BASE } from "../../../main";
import { toast } from "react-toastify";

const AddTraineeInvitationForm = (props) => {
  const auth = useAuthContext();

  return (
    <div>
      <form
        className="flex flex-column white-element"
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          formData.append("traineeId", auth.getUser().id);
          formData.append("evaluatorId", props.coachId);
          const request = Object.fromEntries(formData);
          event.currentTarget.reset();

          await authFetch(
            `${API_BASE}/evaluation`,
            auth.getUser().token,
            JSON.stringify(request),
            "POST"
          );
          toast.success("Send invitation to Coach");
        }}
      >
        <label htmlFor="date">Date</label>
        <input type="datetime-local" id="date" name="date"></input>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location"></input>
        <input type="submit" value="Contact Coach!"></input>
      </form>
    </div>
  );
};
export default AddTraineeInvitationForm;
