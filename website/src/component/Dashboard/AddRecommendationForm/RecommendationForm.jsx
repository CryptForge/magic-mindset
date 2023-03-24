import { authPostForm } from "../../../util";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";

const RecommendationForm = (props) => {
  const auth = useAuthContext();
  return (
    <form
      className="flex flex-column white-element"
      onSubmit={(event) =>
        authPostForm(
          event,
          `${API_BASE}/recommendation/create`,
          auth.getUser().token
        )
      }
    >
      <label htmlFor="trainee">Trainee</label>
      <select id="trainee" name="trainee">
        {props.traineeArray.map((trainee, index) => (
          <option value={trainee.id}>{trainee.name}</option>
        ))}
      </select>
      <label htmlFor="date">Date</label>
      <input type="date" name="date" id="date"></input>
      <label htmlFor="message">Message</label>
      <textarea id="message"></textarea>
      <input type="submit" value="Make recommendation"></input>
    </form>
  );
};
export default RecommendationForm;
