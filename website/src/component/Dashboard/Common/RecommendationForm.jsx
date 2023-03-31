import { authFetch } from "../../../util";
import { API_BASE } from "../../../main";
import { useAuthContext } from "../../../AuthContext";

const RecommendationForm = (props) => {
  const auth = useAuthContext();
  return (
    <form
      className="flex flex-column white-element text"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("date", new Date().getTime());
        formData.append("userId", auth.getUser().id);
        const request = Object.fromEntries(formData);
        event.currentTarget.reset();

        await authFetch(
          `${API_BASE}/recommendation/create`,
          auth.getUser().token,
          JSON.stringify(request),
          "POST"
        );
        props.refreshCall(true);
      }}
    >
      <label htmlFor="traineeId">Trainee</label>
      <select id="traineeId" name="traineeId">
        {props.traineeList.map((trainee, index) => (
          <option value={trainee.id} key={index}>
            {trainee.username}
          </option>
        ))}
      </select>
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message"></textarea>
      <input type="submit" value="Make recommendation"></input>
    </form>
  );
};
export default RecommendationForm;
