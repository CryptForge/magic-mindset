import { useAuthContext } from "../../../AuthContext";

const InvitationDenyPopup = (props) => {
  const auth = useAuthContext();

  return (
    <div className="popup-container">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          formData.append("id", props.invitation.id);
          const request = Object.fromEntries(formData);
          event.currentTarget.reset();

          await authFetch(
            `${API_BASE}/invitation/deny`,
            auth.getUser().token,
            JSON.stringify(request),
            "POST"
          );
        }}
      >
        <div>
          <label htmlFor="reason">Reason</label>
          <input name="reason" id="reason"></input>
        </div>
        <input type="submit" value="Deny" className="button button-red"></input>
      </form>
    </div>
  );
};

export default InvitationDenyPopup;
