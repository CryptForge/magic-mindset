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
        ).then(props.refreshCall(true))
      }
    >
      <label htmlFor="traineeId">Trainee</label>
      <select id="traineeId" name="traineeId">
        {props.traineeList.map((trainee, index) => (
          <option value={trainee.id} key={index}>
            {trainee.username}
          </option>
        ))}
      </select>
      <label htmlFor="date">Date</label>
      <input type="datetime-local" name="date" id="date"></input>
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message"></textarea>
      <input type="submit" value="Make recommendation"></input>
    </form>
  );
};
export default RecommendationForm;
