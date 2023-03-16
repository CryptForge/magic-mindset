import "./AuthButton.css";

const LogoutButton = (props) => {
  return (
    <button className="auth-button" onClick={props.logOut}>
      Log Out
    </button>
  );
};

export default LogoutButton;